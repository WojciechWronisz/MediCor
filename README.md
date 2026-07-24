# MediCor — Poradnia Kardiologiczna

Strona medyczna z rezerwacją wizyt (Prywatna / NFZ), sekcją „Twój Kardiolog” oraz lokalizacją w Kętrzynie.

## Stack

- **Frontend:** React + TypeScript + Vite (nginx w produkcji)
- **Backend:** Node.js + Express
- **Baza:** PostgreSQL (`backend/schema.sql`)
- **Uruchomienie:** Docker Compose

## Szybki start (Docker)

```bash
docker compose up --build -d
```

Aplikacja: [http://localhost:8080](http://localhost:8080)

API health: [http://localhost:8080/api/health](http://localhost:8080/api/health)

Zatrzymanie:

```bash
docker compose down
```

Reset bazy (usuwa dane Postgres):

```bash
docker compose down -v
docker compose up --build -d
```

## Funkcje UI

- Rezerwacja wizyty: przełącznik **Prywatna / NFZ**, PESEL i skierowanie (NFZ), specjalizacja, data, godzina, modal sukcesu (symulacja bez wymogu zapisu)
- **Nasze Usługi** — 4 karty w jednym rzędzie na desktopie
- **Twój Kardiolog** — lek. spec. Krzysztof Wronisz
- Kontakt: ul. Traugutta 7, 11-400 Kętrzyn + mapa

## API (backend)

| Metoda | Endpoint | Opis |
|--------|----------|------|
| GET | `/api/doctors` | Lista lekarzy |
| GET | `/api/doctors/:id/availability` | Wolne terminy (`?date=YYYY-MM-DD`) |
| POST | `/api/appointments` | Nowa wizyta (walidacja PESEL dla NFZ, blokada zajętego terminu) |
| GET | `/api/appointments/:id` | Szczegóły wizyty |
| GET | `/api/services` | Lista usług |
| GET | `/api/health` | Status API i bazy |

## Schemat bazy

Plik: `backend/schema.sql` — tabele `doctors`, `patients`, `appointments` (+ ENUM typów i statusów).

## Rozwój lokalny (bez Dockera)

```bash
# baza (Docker tylko Postgres)
docker compose up -d db

# backend
cd backend && npm install && npm run build && DATABASE_URL=postgresql://medicor:medicor@localhost:5432/medicor PORT=5001 npm start

# frontend
cd frontend && npm install && npm run dev
```

Frontend deweloperski: [http://localhost:5173](http://localhost:5173) (proxy `/api` → `:5001`).
