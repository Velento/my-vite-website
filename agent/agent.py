#!/usr/bin/env python3
"""
Legal Line AI Agent
===================
Автоматически генерирует, тестирует и исправляет код для проекта.

Использование:
  python agent.py "Создай компонент FAQ с аккордеоном"
  python agent.py "Добавь секцию отзывов" --sandbox
  python agent.py "Исправь баг в форме заявки" --file src/features/lead-form/useLeadForm.js
"""

import os
import sys
import json
import subprocess
import argparse
from pathlib import Path

import anthropic
from dotenv import load_dotenv

load_dotenv()

# ── Конфигурация ──────────────────────────────────────────────────────────────
PROJECT_ROOT = Path(__file__).parent.parent
MAX_FIX_ATTEMPTS = 3
MODEL = "claude-opus-4-6"

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

# ── System prompt ─────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """
Ты — senior React разработчик, работающий над сайтом legal_line.
Проект: React 18 + Vite, JSX, CSS файлы, i18next (5 языков), Vitest.

СТЕК:
- React 18 (JSX, hooks)
- Vite 5 (сборщик)
- i18next (переводы — 5 языков: ru, ua, pl, en, by)
- Vitest + React Testing Library (тесты)

АРХИТЕКТУРНЫЕ ПРАВИЛА (из CLAUDE.md):
1. Секреты ТОЛЬКО через import.meta.env.VITE_* — никаких хардкодов
2. API вызовы ТОЛЬКО в src/services/ — не в компонентах
3. Логика в custom hooks (use*.js) — компоненты только UI
4. Тесты обязательны (*.test.jsx рядом с файлом)
5. Все тексты через t() из react-i18next
6. aria-атрибуты для интерактивных элементов
7. Запрещено: eval(), new Function(), console.log(), var, ==

СТРУКТУРА ОТВЕТА:
Отвечай ТОЛЬКО валидным JSON. Никакого текста вне JSON.

{
  "files": {
    "src/features/example/Example.jsx": "// полный код файла",
    "src/features/example/useExample.js": "// полный код хука",
    "src/features/example/Example.test.jsx": "// полные тесты"
  },
  "i18n_keys": {
    "ru": { "example.title": "Заголовок" },
    "en": { "example.title": "Title" },
    "pl": { "example.title": "Tytuł" },
    "ua": { "example.title": "Заголовок" },
    "by": { "example.title": "Загаловак" }
  },
  "explanation": "Что было сделано и почему"
}
""".strip()

# ── Утилиты ───────────────────────────────────────────────────────────────────

def read_file(path: str) -> str:
    full = PROJECT_ROOT / path
    return full.read_text(encoding="utf-8") if full.exists() else ""


def write_file(path: str, content: str) -> None:
    full = PROJECT_ROOT / path
    full.parent.mkdir(parents=True, exist_ok=True)
    full.write_text(content, encoding="utf-8")
    print(f"  ✅ {path}")


def parse_json_response(raw: str) -> dict:
    """Извлекает JSON из ответа Claude (на случай markdown обёртки)."""
    raw = raw.strip()
    if "```json" in raw:
        raw = raw.split("```json")[1].split("```")[0].strip()
    elif "```" in raw:
        raw = raw.split("```")[1].split("```")[0].strip()
    return json.loads(raw)


def get_project_context() -> str:
    """Собирает контекст существующего кода для передачи в Claude."""
    context_files = [
        "CLAUDE.md",
        "package.json",
        "src/services/telegram.js",
        "src/features/lead-form/useLeadForm.js",
    ]
    parts = []
    for path in context_files:
        content = read_file(path)
        if content:
            parts.append(f"=== {path} ===\n{content}")
    return "\n\n".join(parts)

# ── Команды ───────────────────────────────────────────────────────────────────

def run_tests(use_sandbox: bool = False) -> tuple[bool, str]:
    """Запускает тесты. При use_sandbox=True — через Podman."""
    if use_sandbox:
        return _run_in_podman(["npm", "test"])

    result = subprocess.run(
        ["npm", "run", "test"],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True,
        timeout=120,
    )
    return result.returncode == 0, result.stdout + result.stderr


def run_lint() -> tuple[bool, str]:
    result = subprocess.run(
        ["npm", "run", "lint"],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True,
        timeout=60,
    )
    return result.returncode == 0, result.stdout + result.stderr


def run_build() -> tuple[bool, str]:
    result = subprocess.run(
        ["npm", "run", "build"],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True,
        timeout=180,
        env={**os.environ, "VITE_TELEGRAM_BOT_TOKEN": "ci-token", "VITE_TELEGRAM_CHAT_ID": "0"},
    )
    return result.returncode == 0, result.stdout + result.stderr


def _run_in_podman(cmd: list[str]) -> tuple[bool, str]:
    """Запускает команду в изолированном Podman контейнере."""
    podman_cmd = [
        "podman", "run", "--rm",
        "--network", "none",       # Нет доступа к сети
        "--read-only",             # Файловая система только для чтения
        "--cap-drop", "ALL",       # Нет Linux capabilities
        "--memory", "512m",
        "--pids-limit", "50",
        "-v", f"{PROJECT_ROOT}:/app:ro",  # Только чтение проекта
        "-w", "/app",
        "node:20-alpine",
        "sh", "-c", " ".join(cmd),
    ]
    result = subprocess.run(
        podman_cmd, capture_output=True, text=True, timeout=120
    )
    return result.returncode == 0, result.stdout + result.stderr

# ── AI функции ────────────────────────────────────────────────────────────────

def generate_feature(task: str) -> dict:
    """Генерирует новую фичу по описанию задачи."""
    context = get_project_context()

    response = client.messages.create(
        model=MODEL,
        max_tokens=8096,
        system=SYSTEM_PROMPT,
        messages=[{
            "role": "user",
            "content": f"КОНТЕКСТ ПРОЕКТА:\n{context}\n\nЗАДАЧА:\n{task}",
        }],
    )
    return parse_json_response(response.content[0].text)


def fix_code(files: dict[str, str], errors: str, attempt: int) -> dict:
    """Исправляет код на основе вывода ошибок."""
    files_ctx = "\n\n".join(f"=== {p} ===\n{c}" for p, c in files.items())

    response = client.messages.create(
        model=MODEL,
        max_tokens=8096,
        system=SYSTEM_PROMPT,
        messages=[{
            "role": "user",
            "content": (
                f"ПОПЫТКА #{attempt}. Код не прошёл проверку. Исправь ошибки.\n\n"
                f"ТЕКУЩИЙ КОД:\n{files_ctx}\n\n"
                f"ОШИБКИ:\n{errors}\n\n"
                "Верни исправленный JSON в том же формате."
            ),
        }],
    )
    return parse_json_response(response.content[0].text)

# ── Self-healing loop ─────────────────────────────────────────────────────────

def run_agent(task: str, use_sandbox: bool = False) -> bool:
    """
    Главный цикл:
    1. Генерирует код
    2. Запускает lint → тесты → build
    3. При ошибках — передаёт их Claude и просит исправить
    4. Повторяет до MAX_FIX_ATTEMPTS раз
    """
    print(f"\n🤖 Задача: {task}")
    print("─" * 60)

    # Шаг 1: Генерация
    print("\n📝 Генерирую код...")
    result = generate_feature(task)

    generated = result.get("files", {})
    print(f"   Файлов создано: {len(generated)}")
    print(f"   {result.get('explanation', '')}")

    for path, content in generated.items():
        write_file(path, content)

    # Шаг 2: Self-healing loop
    for attempt in range(1, MAX_FIX_ATTEMPTS + 1):
        print(f"\n🔍 Попытка {attempt}/{MAX_FIX_ATTEMPTS}")
        all_errors = ""

        # Lint
        lint_ok, lint_out = run_lint()
        if not lint_ok:
            print(f"  ❌ Lint:\n{lint_out[:400]}")
            all_errors += f"[LINT]\n{lint_out}\n"

        # Тесты
        test_ok, test_out = run_tests(use_sandbox=use_sandbox)
        if not test_ok:
            print(f"  ❌ Tests:\n{test_out[:400]}")
            all_errors += f"[TESTS]\n{test_out}\n"

        if all_errors:
            if attempt < MAX_FIX_ATTEMPTS:
                print(f"\n🔧 Прошу Claude исправить...")
                fix_result = fix_code(generated, all_errors, attempt)
                generated = fix_result.get("files", generated)
                for path, content in generated.items():
                    write_file(path, content)
            continue

        # Всё OK!
        print(f"\n✅ Готово! Все проверки прошли (попытка {attempt})")
        return True

    print(f"\n❌ Не удалось исправить за {MAX_FIX_ATTEMPTS} попыток.")
    print("   Требуется ручное вмешательство.")
    return False


# ── Entrypoint ────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Legal Line AI Agent — генерирует и тестирует код"
    )
    parser.add_argument("task", help="Описание задачи на русском языке")
    parser.add_argument(
        "--sandbox",
        action="store_true",
        help="Запускать тесты в изолированном Podman контейнере",
    )
    args = parser.parse_args()

    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("❌ Ошибка: переменная ANTHROPIC_API_KEY не задана")
        print("   Создай файл agent/.env и добавь: ANTHROPIC_API_KEY=sk-ant-...")
        sys.exit(1)

    success = run_agent(args.task, use_sandbox=args.sandbox)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
