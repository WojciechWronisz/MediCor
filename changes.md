# Changes.md — MediCor

Dokumentacja zmian wprowadzonych w trakcie prac nad stroną poradni MediCor (Kętrzyn).  
Obejmuje decyzje produktowe, techniczne, pomysły oraz konteksty „dlaczego”.

---

## 1. Punkt wyjścia

### Wytyczne (`wskazowki.md` → później `README.md`)

Projekt startował jako strona medyczna / serwis rezerwacji z wymaganiami:

- cały UI po polsku,
- rezerwacja **Prywatna / NFZ** (PESEL + skierowanie dla NFZ),
- adres: **ul. Traugutta 7, 11-400 Kętrzyn**,
- mapa w sekcji kontaktu,
- design medyczny (jasne tło, niebieski / zieleń),
- później: PostgreSQL, endpointy API, sekcja „Twój Kardiolog”.

### Stack, który został

Mimo że pierwotne wytyczne wspominały HTML + Tailwind CDN + vanilla JS, w repozytorium był już **React + Vite + Express**.  
**Decyzja:** nie przepisywać od zera — rozwinąć istniejący stack.

---

## 2. Funkcje i UI zgodne z wytycznymi

### Rezerwacja wizyt (moduł pełny, potem wyłączony)

**Co zrobiono:**

- przełącznik **Prywatna / NFZ**,
- pola PESEL + numer skierowania (NFZ),
- wybór specjalizacji → lekarz → data → godziny,
- modal sukcesu z podsumowaniem,
- później: zapis do PostgreSQL przez `POST /api/appointments`,
- wolne sloty z `GET /api/doctors/:id/availability`.

**Dlaczego:** spełnienie mockupu z wytycznych; na start NFZ było „wizualne”, potem użytkownik poprosił o realny zapis do bazy.

**Pomysł / ewolucja:** najpierw tylko symulacja (bez API), potem pełny zapis + blokada zajętego terminu w bazie.

### Landing page (obecny stan produkcyjny)

**Co zrobiono:**

- formularz rezerwacji **zakomentowany** (łatwy powrót),
- usunięte linki „Zarezerwuj” z nav / hero / kart — zamiast tego **Kontakt**,
- strona jako wizytówka poradni.

**Dlaczego:** świadoma decyzja produktowa — „zróbmy z tego narazie tylko landing page”.

### Sekcja „Twój Kardiolog”

**Co zrobiono:**

- nagłówek: **Twój Kardiolog**,
- lekarz: **lek. spec. Krzysztof Wronisz**,
- specjalizacja: Internista 2. stopnia / Spec. Kardiologia,
- 30 lat doświadczenia,
- placeholder zdjęcia: **wyszarowana sylwetka** (bez realnego zdjęcia).

**Dlaczego:** wymaganie z zaktualizowanego README; zdjęcie „na później”.

### Usługi

**Co zrobiono:** 4 karty w **jednym rzędzie** na desktopie (responsywnie 2 / 1 kolumna).

**Dlaczego:** jawne wymaganie layoutu z README.

### Kontakt i dane placówki

| Pole | Wartość |
|------|---------|
| Adres | ul. Traugutta 7, 11-400 Kętrzyn |
| Telefon | **89 752 27 03** |
| E-mail | **wkrótce** |
| Pn | 13:00 – 18:00 |
| Wt–Czw | 8:00 – 13:00 |
| Pt–Nd | zamknięte |

Mapa Google (iframe) zostawiona.

**Nazewnictwo:** „przychodnia” → **„poradnia”** w tytułach, stopce, meta, README.

### Branding / logo

**Co zrobiono:**

- logo MediCor (serce + EKG + stetoskop) w nav, stopce, favicon,
- przycięcie białego paddingu z PNG (lepsza czytelność w lewym górnym rogu).

**Dlaczego:** dostarczony asset marki; emoji serca było tymczasowe.

---

## 3. Backend i baza danych

### PostgreSQL (`backend/schema.sql`)

Tabele:

- `doctors` — imię, nazwisko, specjalizacja, stopień, lata doświadczenia,
- `patients` — dane + opcjonalny PESEL (unikalny),
- `appointments` — FK lekarz/pacjent, typ (`NFZ` / `PRYWATNA`), status, skierowanie, unikalny slot `(doctor_id, appointment_date)`.

Seed: lek. Krzysztof Wronisz.

### API (Express + `pg`)

| Endpoint | Opis |
|----------|------|
| `GET /api/doctors` | lista lekarzy |
| `GET /api/doctors/:id/availability` | wolne godziny |
| `POST /api/appointments` | rezerwacja (+ walidacja PESEL dla NFZ) |
| `GET /api/appointments/:id` | szczegóły |
| `GET /api/services` | usługi |
| `GET /api/health` | status API + baza |

**Dlaczego:** architektura z README; landing może działać bez API, ale warstwa jest gotowa na przywrócenie rezerwacji.

### Podgląd danych

- Docker Desktop → kontener `medicor-db` → Exec → `psql -U medicor -d medicor`
- albo klient GUI na `localhost:5432` (user/hasło/baza: `medicor`)

---

## 4. Docker

**Co zrobiono:**

- `docker-compose.yml`: `db` (Postgres) + `backend` + `frontend` (nginx),
- frontend na **http://localhost:8080**,
- nginx proxy `/api` → backend,
- Dockerfiles + `.dockerignore`.

**Dlaczego:** wygodne lokalne uruchomienie całego stacku jednym `docker compose up --build -d`.

---

## 5. Vercel / produkcja (medicor.ketrzyn.pl)

### Problem „broken HTTPS” / niezabezpieczona strona

**Diagnoza:**

- certyfikat SSL Vercela był OK,
- front wołał względne `/api/services`, `/api/doctors`,
- na Vercelu **nie ma backendu** → 404 HTML,
- Chrome oznaczał to jako problematyczny active content / broken HTTPS.

**Rozwiązanie:**

- `VITE_API_URL` — API włączone tylko gdy zmienna jest ustawiona,
- na Vercelu **bez** `VITE_API_URL` → brak fetchy `/api/*`, dane statyczne (lekarz, usługi),
- `fetchJson` z obsługą błędów / nie-JSON,
- Docker nadal buduje z `VITE_API_URL=/api`.

**Uwaga:** w DevTools „requests.js” to zbundlowany chunk Vite, nie osobny plik źródłowy.

### Problem builda Vercel (`cd frontend` / `--prefix frontend`)

**Diagnoza:** monorepo (`frontend/` + `backend/`). W panelu Vercel **Root Directory = `frontend`**, a komendy próbowały wejść w `frontend` jeszcze raz →  
`cd: frontend: No such file or directory`.

**Rozwiązanie / konfiguracja:**

- Root Directory w Vercelu: **`frontend`**,
- `frontend/vercel.json`: `npm ci` → `npm run build` → `dist`,
- root `vercel.json`: bez `cd` / `--prefix` (tylko rewrites/headers albo minimum),
- wyczyścić Override Build/Install w ustawieniach projektu.

---

## 6. Animacje wejścia

**Co zrobiono:**

- `motion.css` — fade-up / fade-in / soft-scale, pulse EKG,
- `Reveal.tsx` — Intersection Observer (sekcje przy scrollu),
- hero + navbar przy starcie,
- `prefers-reduced-motion` — wyłączenie animacji przy ustawieniu systemowym.

**Dlaczego:** „pierdoły” UX — żywszy landing bez ciężkich bibliotek.

**Pułapka:** Docker `:8080` czasem serwował stary obraz bez animacji; trzeba `docker compose up --build`. Na Vercelu animacje pojawią się dopiero po udanym deployu z tym kodem.

---

## 7. Git / repozytoria (kontekst)

W trakcie prac pojawiły się różne ścieżki/klonów:

| Lokalnie | Remote (orientacyjnie) |
|----------|-------------------------|
| `webcligemini` (wczesny scratch) | — |
| `medicor - dev` | m.in. `s26999IT/medicor` |
| `medicor - prod` | `WojciechWronisz/MediCor` (Vercel) |

Push na GitHub bywał blokowany (brak auth / 403 / SSH). Commity lokalne były tworzone; push wymagał ręcznego logowania.

---

## 8. Pomysły, które padły / odłożone

| Pomysł | Status |
|--------|--------|
| Pełna rezerwacja online na produkcji | **odłożone** — zakomentowane na landingu |
| Prawdziwa integracja NFZ | **nie** — tylko UI + zapis lokalny (gdy API włączone) |
| Zdjęcie lekarza | **placeholder** sylwetki |
| E-mail kontaktowy | **„wkrótce”** |
| Tailwind CDN / czysty HTML | **odrzucone** na rzecz Reacta |
| Rewrite `vercel.json` proxy `/api` → zewnętrzny backend | możliwe później przy `VITE_API_URL=https://…` |
| Push automatyczny z agenta | często fail auth — robić lokalnie |

---

## 9. Jak uruchomić lokalnie (stan po zmianach)

```bash
# Docker (pełny stack)
docker compose up --build -d
# → http://localhost:8080

# Sam frontend (Vite)
cd frontend && npm run dev
# → http://localhost:5173
```

---

## 10. Skrót chronologiczny

1. Implementacja wytycznych (rezerwacja, kontakt, Kętrzyn, PL).  
2. README: Twój Kardiolog, 4 kolumny usług, Postgres + API.  
3. Logo + sylwetka zamiast zdjęcia.  
4. Zapis wizyt do bazy.  
5. Landing: wyłączenie rejestracji, nowe godziny/telefon/e-mail, „poradnia”.  
6. Docker Compose.  
7. Fix Vercel HTTPS (wyłączenie `/api` bez env).  
8. Fix Vercel build (Root Directory / `vercel.json`).  
9. Animacje wejścia (motion + Reveal).  
10. Ten plik — dokumentacja zmian.  
11. Popup szczegółów usług (#services) — pełne opisy pacjent-friendly.
12. Przygotowanie popupu lekarzy (#doctors) — ten sam UX co usługi; treści TODO.

---

## 11. Popup usług (#services) — lipiec 2026

### Wymaganie

Po kliknięciu **dowolnego miejsca** na którejkolwiek z 4 kart usług otwiera się popup z pełnym, przyjaznym opisem badania/wizyty (dostarczonym przez właściciela treści).

### Co zrobiono

- Karty usług mają **równą wysokość**; CTA wyrównane do dołu karty.
- Karty usług to teraz `<button class="service-card">` — cały obszar jest klikalny.
- Modal z treścią: sekcje „Czym jest…”, „Jak wygląda…”, przygotowanie / co zabrać.
- Zamknięcie: przycisk ×, „Zamknij”, klik w tło, klawisz Escape.
- Krótki opis na karcie zostaje; szczegółowa treść tylko w popupie.
- Lekkie poprawki językowe w treści (np. wywiad lekarski, „pompuje”, „poradni” zamiast „przychodni”) — bez zmiany sensu.

### Opisy w popupach

1. **Konsultacja Kardiologiczna** — rozmowa + badanie, kroki wizyty, co zabrać.  
2. **Echo Serca** — USG serca, przebieg 15–20 min, bez przygotowania.  
3. **Próba Wysiłkowa EKG** — EKG na wysiłku, bieżnia/rowerek, strój i ograniczenie kawy/posiłku.  
4. **Holter EKG i Ciśnieniowy** — monitoring 24 h, dzienniczek, zwrot sprzętu.

### Pliki

- `frontend/src/components/Services.tsx`
- `frontend/src/components/Services.css`

### Dlaczego

Karty na landingu były zbyt ogólne; pacjent potrzebuje zrozumiałego opisu „jak to wygląda” bez wchodzenia w żargon medyczny. Popup nie zaśmieca siatki 4 kolumn, a daje pełną treść na żądanie.

---

## 12. Popup lekarzy (#doctors) — przygotowanie (lipiec 2026)

### Wymaganie

Po kliknięciu karty lekarza ma otwierać się popup ze szczegółami — **ten sam UX** co popup usług (#services): klik całego obszaru karty, modal, zamknięcie × / „Zamknij” / tło / Escape.

### Co zrobiono (szkielet)

- Przeniesiono z `medicor - dev` komponenty `Doctors.tsx` + `Doctors.css` do produkcji (nadpisanie).
- Interakcja i layout popupu jak przy usługach.

### Treść — TODO

Placeholder / do uzupełnienia później:

- pełny opis lekarza (bio, doświadczenie, specjalizacje),
- ewentualne dodatkowe sekcje w modalu,
- finalna kopia po polsku pod landing.

### Pliki

- `frontend/src/components/Doctors.tsx`
- `frontend/src/components/Doctors.css`

### Dlaczego

Przygotowanie mechaniki przed dostarczeniem finalnych treści — spójny UX z sekcją usług, bez blokowania deployu landingu.

---

*Ostatnia aktualizacja: 31 lipca 2026 — popupy usług + przygotowanie popupu lekarzy.*
