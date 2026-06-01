# Как заработать на разнице - короткий план

Босс: *«Я плачу за лида 3,5$. Настроишь воронку грамотно и лид будет дешевле - разницу забираешь себе»*.

**Суть:** $3,5 ≈ **14 PLN за лид**. Всё, что лид стоит тебе **дешевле 14 PLN**, - твоя маржа.
Цель: держать **CPL ≤ 11 PLN** (≈3 PLN маржи на каждом лиде после потерь на атрибуцию).

**Что нужно сделать (3 шага):**
1. Доделать 2 технические настройки (15 минут) - раздел 1.
2. Договориться с боссом письменно (3 пункта) - раздел 2.
3. Запустить кампанию по копипасту - раздел 3. Дальше - ритм из раздела 4.

---

## 0. Что уже готово (не трогай)

- Воронка: формы, всплывашка на выход, плавающая WhatsApp-кнопка, мобильная панель, fallback на WhatsApp если форма падает.
- Аналитика: события `lead_form_start` / `lead_form_submit` / `contact_click` летят в GTM и Google Ads.
- Серверный аудит лидов (Cloudflare KV) - клиент не может его обойти или подделать.
- Дашборд счёта лидов - одна правда для тебя и босса.
- Воркер задеплоен: `https://legalline-form-proxy.legalline.workers.dev`, `REPORT_TOKEN` и `VITE_FORM_PROXY_URL` установлены.

---

## 1. Доделать сетап (15 минут) - 2 вещи

### 1.1 Telegram-секреты воркера
Без них форма падает на WhatsApp-fallback (хуже конверсия → дороже лид). Подставь реальные значения (те же, что в GitHub Secrets `VITE_TELEGRAM_BOT_TOKEN` / `VITE_TELEGRAM_CHAT_ID`):

```bash
echo "<bot_token>" | npx wrangler secret put TELEGRAM_BOT_TOKEN
echo "<chat_id>"   | npx wrangler secret put TELEGRAM_CHAT_ID
```

Проверка (должно прийти сообщение в Telegram, ответ `{"ok":true,...}`):
```bash
curl -s -X POST "https://legalline-form-proxy.legalline.workers.dev/" \
  -H "Content-Type: application/json" -H "Origin: https://legalline.pl" \
  -d '{"name":"TEST","phone":"+48123456789"}'
```

### 1.2 Google Ads conversion label
Сейчас в GitHub Secret `VITE_GOOGLE_ADS_CONVERSION_ID` стоит `AW-802543735` (только ID аккаунта, без метки). **Без `/LABEL` Google Ads молча выбрасывает конверсии** - Smart Bidding не учится.

1. ads.google.com → **Инструменты → Конверсии → + Новое действие → Веб-сайт**.
2. Цель **Лид**, имя `LegalLine - Lead Form Submit`, ценность **750 PLN**, окно 30 дней, способ **Google Tag Manager**.
3. Скопируй полный ID вида `AW-802543735/abcDEFghi123` и сохрани секрет:
   ```bash
   gh secret set VITE_GOOGLE_ADS_CONVERSION_ID --body "AW-802543735/<LABEL>"
   ```
4. Любой коммит в `my-vite-website` → CI пересоберёт сайт с правильной меткой.

> Опционально: `VITE_GOOGLE_ADS_CONTACT_CONVERSION_ID` (по той же схеме) включит конверсии и на клики по телефону/мессенджерам - можно докрутить позже.

---

## 2. Договорись с боссом письменно (хоть в чате)

Не запускай рекламу, пока не согласованы 3 пункта:

1. **Что = лид.** Рекомендация: **успешная отправка формы** (имя + телефон, доставлено в Telegram). Не клики. Дедуп: один телефон за 24 ч = 1 лид. Аргумент - серверный аудит, обе стороны видят одно число.
2. **Кто платит за рекламу.** Если **ты** - вся разница твоя (и весь риск). Если **босс** - тебе платят только за работу, на разнице не заработаешь. Уточни это первым.
3. **Кап в месяц.** Сколько лидов босс готов принять. Превысил - ставь паузу.

Дай боссу ссылку на дашборд (токен лежит в `.report-token.local`, в репо его не коммить):
```bash
echo "https://legalline-form-proxy.legalline.workers.dev/dashboard?token=$(cat .report-token.local)"
```

---

## 3. Запусти кампанию (копипаст)

### Настройки
- Тип: **Поиск (Search)**. Цель: **Лиды**.
- Сети: **только поиск Google**. Display и Search Partners - ВЫКЛ.
- Язык: **польский** (язык сайта).
- Гео: **Pomorskie + Mazowieckie** (Гданьск + Варшава); можно добавить Kraków, Wrocław, Poznań.
- Стратегия (первые 3 недели): **Максимум конверсий**, без лимита CPA.
- Бюджет: **60-80 PLN/день**.

### 3 группы объявлений + ключи (вставлять как есть)

**`karta-pobytu`** (высокий интент, макс. ставка):
```
[karta pobytu gdansk]
[karta pobytu warszawa]
"karta pobytu czasowego"
"karta pobytu stałego"
"karta pobytu cena"
"karta pobytu dla cudzoziemca"
+karta +pobytu +pomoc
+karta +pobytu +prawnik
```

**`legalizacja`** (средний интент):
```
"legalizacja pobytu"
"legalizacja pracy cudzoziemca"
"zezwolenie na pobyt czasowy"
"zezwolenie na pracę"
"pobyt rezydenta długoterminowego"
```

**`pomoc-prawna`** (низкий интент, мин. ставка):
```
"prawnik dla cudzoziemca"
"pomoc prawna karta pobytu"
"adwokat cudzoziemcy"
"prawnik imigracyjny"
```

### Минус-слова (на уровне кампании - ОБЯЗАТЕЛЬНО)
Убивают мусорный трафик, который раздувает CPL:
```
darmowy darmowa darmowe free
forum wzór wzor sample template wikipedia pdf download
praca oferty "oferta pracy" work.ua pracuj.pl
ambasada konsulat mfa sejm
youtube film filmik
```

### Объявления (по 2 RSA на группу; заголовок ≤30 знаков, описание ≤90)
Закрепить на позиции 1 (с ключом):
- `Karta pobytu - pomoc prawna`
- `Karta pobytu już od 750 zł`
- `Karta pobytu w Gdańsku`

Незакреплённые (ещё 6-8):
`Bezpłatna konsultacja` · `Złóż wniosek bez błędów` · `Doświadczeni prawnicy` · `Reprezentacja w urzędzie` · `1500+ zamkniętych spraw` · `Pomoc w 5 językach` · `Oddzwonimy w 30 minut`

Описания:
- `Załatwimy kartę pobytu szybko i bez stresu. Sprawdzimy dokumenty, wypełnimy wniosek, reprezentujemy.`
- `Pierwsza konsultacja gratis. Zostaw numer - oddzwonimy w 30 minut. Tysiące zadowolonych klientów.`

### Расширения (Assets) - якоря проверены против сайта
- **Sitelinks:**
  - Bezpłatna konsultacja → `https://legalline.pl/#leedform`
  - Cennik usług → `https://legalline.pl/#pricelist`
  - Opinie i mapa → `https://legalline.pl/#map`
  - FAQ → `https://legalline.pl/#faq`
- **Call extension:** `+48 883 734 171`
- **Callouts:** `Bezpłatna konsultacja` · `Gwarancja zwrotu` · `1500+ spraw` · `5 języków`
- **Structured snippets** (Usługi): `Karta pobytu`, `Legalizacja`, `Obywatelstwo`, `Pomoc prawna`

---

## 4. Рабочий ритм

**Ежедневно (2 мин):** глянуть CPL в Ads + сверить число с дашбордом `/dashboard?token=…`. Если CPL > 15 PLN три дня подряд → пауза, идти в «если CPL высокий».

**Еженедельно (15 мин - самое важное):** отчёт **Search Terms** (Keywords → Search Terms). Всё нерелевантное → в минус-слова; что хорошо конвертит → добавить точным соответствием. Первый месяц это +5-15 минусов в неделю.

**Если CPL высокий (> 14 PLN), по порядку:**
1. Добавить минус-слов (в 75% случаев проблема тут).
2. Отключить broad-match, оставить phrase/exact.
3. Переписать объявления (упор на цену + гарантию).
4. Сузить гео до Gdańsk + Warszawa.
5. Отключить ночь и выходные, если плохо конвертят.

**Через 3-4 недели (30+ конверсий):** переключить стратегию на **Target CPA = 11 PLN**. Если объём сильно падает - 12 PLN, **никогда выше 13**.

**Сверка с боссом:** в конце периода оба открывают дашборд, сверяют `total_unique`. Спор - выгрузить CSV:
```bash
TOKEN=$(cat .report-token.local); W=https://legalline-form-proxy.legalline.workers.dev
curl -sH "Authorization: Bearer $TOKEN" "$W/export?from=2026-06-01&to=2026-06-30&dedup=true" -o leads.csv
```

---

## 5. Экономика

| Сценарий | CPL | Маржа на лид (при выплате 14 PLN) |
|---|---|---|
| Идеал | 7-10 PLN | 4-7 PLN |
| Норма (1-й месяц) | 11-14 PLN | 0-3 PLN |
| Плохо | > 18 PLN | минус → **СТОП и чинить** |

Воронка (всплывашка, мобильная панель, WhatsApp-fallback) уже поднимает конверсию на 15-30% - это и есть разница между 14 PLN (в ноль) и 10 PLN (в плюс).

**Останавливай кампанию если:** 2 недели CPL > 16 и оптимизация не помогает; бюджет < 50 PLN/день (Smart Bidding не учится); конверсии не пишутся (проверь label из 1.2); босс меняет условия в одностороннем порядке.

---

## 6. Шпаргалка - где смотреть

| Что | Где |
|---|---|
| Запуск/стоп рекламы, CPL | https://ads.google.com |
| Считаются ли конверсии | Ads → Conversions → Status (через ~24 ч после первого лида) |
| Реальное число лидов | `https://legalline-form-proxy.legalline.workers.dev/dashboard?token=…` |
| Сырая выгрузка | `GET /report?from=…&to=…` и `/export?…` |
| Тест формы как юзер | https://legalline.pl/#leedform |
| Ошибки воркера в реальном времени | `npx wrangler tail` |

Подробный технический разбор биллинга - в `lead-billing.md`. Расширенный список ключей и тонкости кампании - в `google-ads-campaign.md`.
