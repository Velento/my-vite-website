# Polityka bezpieczeństwa

## Zgłaszanie podatności

Jeśli znalazłeś lukę bezpieczeństwa w tym projekcie lub na stronie
legalline.pl, zgłoś ją prywatnie. **Nie otwieraj publicznego zgłoszenia
(issue)** opisującego podatność.

- E-mail: **legalline.pl@gmail.com** (w temacie dopisz `[SECURITY]`)
- Możesz też skorzystać z prywatnego zgłaszania luk w zakładce **Security**
  tego repozytorium na GitHubie.

Opisz krok po kroku, jak odtworzyć problem. Postaramy się odpowiedzieć
w ciągu 5 dni roboczych.

## Zakres

Projekt składa się z dwóch części:

- statyczna strona (React + Vite) hostowana na GitHub Pages,
- proxy formularza działające jako Cloudflare Worker (katalog `worker/`).

Wszystkie sekrety (token bota Telegram, identyfikator czatu, token raportów)
przechowywane są wyłącznie po stronie serwera, w GitHub Secrets oraz
Cloudflare Worker secrets. Repozytorium nie zawiera żadnych danych
uwierzytelniających.

## Obsługiwane wersje

Poprawki bezpieczeństwa trafiają wyłącznie do bieżącej wersji wdrożonej na
produkcji (gałąź `my-vite-website`).
