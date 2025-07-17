Opis techniczny systemu rezerwacji hotelowych
1. Opis funkcjonalności aplikacji
System składa się z aplikacji frontendowej w React oraz backendu w ASP.NET Core z bazą danych SQLite. Funkcjonalność obejmuje:

Frontend (React 19 + Vite)
- Strona główna (/)                     – wybór daty zameldowania/wymeldowania, liczby gości oraz dostępnych pokoi
- Strona rezerwacji (/book)             – podsumowanie danych rezerwacji, obliczenie liczby nocy i ceny całkowitej, przycisk do zatwierdzenia rezerwacji
- Strona potwierdzenia (/confirmation)  – ekran z komunikatem sukcesu i przyciskiem powrotu na stronę główną

Backend (.NET 8, C#, SQLite)
- API REST na http://localhost:5112/api/reservations do przyjmowania danych rezerwacji.
- Konfiguracja CORS umożliwia dostęp z frontu lokalnego (http://localhost:5173)
- Baza danych SQLite – reservations.db, dostępna przez AppDbContext.

2. GH Actions

# Lokalizacja
Plik: .github/workflows/main.yml

# Struktura pipeline'u
Workflow nosi nazwę: "Build and Test Fullstack App", i jest uruchamiany przy:
- każdym pushu do gałęzi main,
- każdej pull request do main.

# Szczegóły zadań
Krok	                    Technologia	        Opis
actions/checkout@v4	        GitHub	            Pobiera kod źródłowy repozytorium
actions/setup-dotnet@v4	    .NET 8	            Konfiguracja środowiska dla backendu
dotnet restore && build	    .NET Backend	    Przywracanie pakietów i budowanie projektu backendowego w folderze Backend
dotnet test	                .NET Backend	    Próba uruchomienia testów jednostkowych (przechodzi nawet jeśli testów brak)
actions/setup-node@v4	    Node.js 20	        Konfiguracja środowiska frontendowego
npm ci	                    Frontend	        Instalacja zależności z package-lock.json
npm run build	            Frontend	        Budowanie aplikacji Vite
npm run test	            Frontend	        Próba uruchomienia testów frontendowych (obsługa przypadku bez testów)

# Mechanika awaryjna
- Oba kroki testowe (dotnet test i npm run test) są otoczone konstrukcją || echo "No tests yet" – zapobiega to przerwaniu pipeline’u, nawet jeśli testy są puste lub nieistniejące.

3. Konfiguracja środowiska deweloperskiego
# Frontend
Framework: React 19 z TypeScriptem

Build tool: Vite 7.0.4

CSS: Tailwind CSS 4.1.11 + postcss + autoprefixer

Routing: react-router-dom v7

Testowanie:

Vitest (unit & component tests)

@testing-library/react do testów komponentów

Firebase: skonfigurowany dostęp

Stylowanie: wbudowane style inline + Tailwind

Skrypty NPM:
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}


# Backend
- Platforma: .NET Core 8
- ORM: Entity Framework Core (Microsoft.EntityFrameworkCore)
- Baza danych: SQLite (reservations.db)

Struktura projektu:
- Program.cs – konfiguracja DbContext, CORS, rejestrowanie kontrolerów
- appsettings.json – logowanie, AllowedHosts na *

4. Wdrożenie i utrzymanie systemu

# Wdrożenie frontend
Tryb developerski: npm run dev na porcie 5173

Build produkcyjny: npm run build (Vite generuje zasoby w katalogu dist)

Hosting:

Możliwość użycia platform typu Vercel, Netlify lub hosta statycznego z reverse proxy do backendu

Utrzymanie:

Testy jednostkowe (vitest)

Kod zgodny z ESLint (eslint, typescript-eslint)

# Wdrożenie backend
Lokalne uruchomienie: dotnet run

Nasłuch: domyślnie na porcie 5112

API: POST /api/reservations

Utrzymanie:

Wymaga zapewnienia, że reservations.db istnieje i ma odpowiednie uprawnienia

Logi dostępne przez Microsoft.Extensions.Logging

5. Architektura aplikacji

# Architektura ogólna – przegląd warstw
System opiera się na klasycznym podejściu architektury klient–serwer, gdzie:

Frontend (React + Vite) pełni rolę aplikacji klienckiej renderowanej po stronie użytkownika (SPA).

Backend (ASP.NET Core + SQLite) udostępnia REST API do obsługi rezerwacji.

Baza danych (SQLite) przechowuje dane dotyczące rezerwacji pokoi.

┌────────────────┐       HTTP       ┌─────────────────────┐         EF Core        ┌──────────────┐
│     React      │ ───────────────→ │      .NET API       │ ─────────────────────→ │   SQLite DB  │
│  Frontend SPA  │   fetch(), JSON  │  (C# Controllers)   │                        │ Rezerwacje   │
└────────────────┘   routing, JSX   └─────────────────────┘                        └──────────────┘


# Szczegóły architektury frontend
Komponenty i routing
Frontend zorganizowany jest w trójstronicowy SPA z wykorzystaniem react-router-dom (v7):

Ścieżka/Komponent/Funkcja:
- /             HotelReservationPage	Wybór dat, liczby gości, wyświetlenie dostępnych pokoi i przejście do /book z przekazaniem danych przez location.state
- /book	        BookingPage	            Wyświetlenie danych z poprzedniej strony, obliczenie kosztu, wysłanie rezerwacji do backendu (POST)
- /confirmation	ConfirmationPage	    Ekran z informacją o potwierdzeniu i przyciskiem powrotu


Przepływ danych:
HotelReservationPage → BookingPage → Backend (POST /api/reservations) → ConfirmationPage

Zarządzanie stanem:
Lokalne stany React (useState)

Przejście między stronami opiera się na useNavigate + useLocation z react-router-dom.

# Szczegóły architektury backend
Komponenty backendowe:
- Program.cs    – punkt wejścia, konfiguracja usług, routing, CORS

- AppDbContext  – kontekst bazy danych oparty o Entity Framework Core

Kontrolery API – oczekiwany kontroler REST na POST /api/reservations (używany w BookingPage.tsx)

Warstwy backendu:

Warstwa/Opis
- API Controller        Odbiera POST z danymi rezerwacji, mapuje JSON do modelu, zapisuje przez EF Core
- Logika domenowa	    Brak osobnej warstwy – logika jest bezpośrednio w kontrolerze
- Dostęp do danych	    AppDbContext używa SQLite; model danych rezerwacji zakładany na podstawie pól przesyłanych z frontu
- Konfiguracja CORS	    Zezwolenie na dostęp wyłącznie z http://localhost:5173

Baza danych:
Użycie SQLite z nazwą pliku reservations.db

Tabela rezerwacji z polami:
roomId, roomName, checkIn, checkOut, guests, totalCost


6. Wymagania techniczne i zależności
Główne zależności (frontend):
- react, react-dom      – 19.1.0
- firebase              – 11.10.0
- react-router-dom      – 7.6.3
- vite, typescript, tailwindcss, eslint, vitest, @testing-library/react

Backend:
- Microsoft.EntityFrameworkCore
- Microsoft.AspNetCore.Cors
- SQLite