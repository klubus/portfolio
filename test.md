# Migracja El Tigre na submodule — podsumowanie sesji

Data: 2026-05-17

## Cel

Zastąpić luźno wrzucony folder `public/projects/el-tigre/` (5.4 MB untracked plików)
mechanizmem opartym o git submodules, tak żeby:

- Repo portfolio nie nosiło zduplikowanego kodu projektu, który już ma własne repo
- Zachować pełną kontrolę (zero zewnętrznych usług typu GitHub Pages / Actions / Vercel-specific)
- Dało się dodawać kolejne projekty według tego samego, prostego wzorca

## Architektura, którą wdrożyliśmy

```
portfolio/
├── projects/              # submoduły, jeden folder per projekt — NIE serwowane
│   └── el-tigre/          # → https://github.com/klubus/project-el-tigre
│       ├── src/           # źródła (Sass, JS, HTML), nie idą do produkcji
│       ├── dist/          # build artifact projektu — TO trafia do iframe
│       └── ...
├── public/
│   └── projects/          # GENEROWANE przez scripts/copy-projects.js — gitignored
│       └── el-tigre/      # = zawartość projects/el-tigre/dist/
└── scripts/
    └── copy-projects.js   # uruchamiany w prebuild i prestart
```

Skrypt `copy-projects.js`:

- Iteruje po `projects/*/`
- Jeśli `projects/X/dist/` istnieje → kopiuje jego zawartość do `public/projects/X/`
- Jeśli nie ma `dist/` → kopiuje cały folder z wyjątkiem typowych śmieci
  (`.git`, `node_modules`, `src`, `README.md`, `package.json` itp.)
- Czyści `public/projects/` przed każdym uruchomieniem (idempotentnie)
- Ostrzega gdy folder submodułu jest pusty (zapomniane `--init`)

Hooki w `package.json`:

- `prestart` → uruchamia skrypt przed `npm start`
- `prebuild` → uruchamia skrypt przed `npm run build`

Dzięki temu iframe `/projects/el-tigre/index.html` działa zarówno w dev, jak i w
buildzie produkcyjnym.

## Co zostało zrobione krok po kroku

### W repo `project-el-tigre`

1. Zacommitowano niezapisaną zmianę w `src/js/app.js` — fetch statycznego
   `./db/app.json` zamiast `settings.db.url + settings.db.products` (potrzebne,
   żeby El Tigre działał jako statyczna strona bez `json-server`)
2. Usunięto wpis `dist` z `.gitignore` (linia 83)
3. Skopiowano zawartość ówczesnego `portfolio/public/projects/el-tigre/` do
   nowo utworzonego `dist/` w repo el-tigre i zacommitowano
4. Wypchnięto oba commity na `origin/main`:
   - `6f79dc8 use static db/app.json instead of json-server fetch`
   - `5eb0de7 ship built dist/ on main for portfolio embedding`

### W repo `portfolio`

1. Usunięto stary, untracked folder `public/projects/el-tigre/` (5.4 MB)
2. Dodano submodule: `git submodule add https://github.com/klubus/project-el-tigre.git projects/el-tigre`
3. Utworzono `scripts/copy-projects.js`
4. Dodano hooki `prestart` i `prebuild` do `package.json`
5. Dodano `/public/projects` do `.gitignore` (to teraz artefakt buildu)
6. Zweryfikowano `npm run build` — `build/projects/el-tigre/index.html` istnieje
   i ma poprawną zawartość (5.4 MB)

## Workflow — dodawanie kolejnego projektu

Założenie: nowy projekt ma własne repo na GitHubie, a jego build wyląduje w
folderze `dist/` w roocie (tak jak el-tigre).

```bash
# 1. W repo NOWEGO projektu, jednorazowo:
#    - Upewnij się, że "dist" NIE jest w .gitignore
#    - npm run build (czy cokolwiek produkuje dist/)
#    - git add dist/ && git commit && git push

# 2. W portfolio:
git submodule add https://github.com/klubus/<nowy-projekt>.git projects/<nowy-projekt>

# 3. W src/data/projects.js dodaj wpis z:
#    embedUrl: '/projects/<nowy-projekt>/index.html'

# 4. Test:
npm start            # iframe powinien się wyświetlać
npm run build        # build/projects/<nowy-projekt>/ powinno istnieć

# 5. Commit zmian w portfolio (nowy submodule + zmieniony projects.js)
```

Skrypt `copy-projects.js` nie wymaga zmian — automatycznie podchwyci każdy
nowy folder w `projects/`.

## Workflow — aktualizacja istniejącego projektu

Skoro projekty są w zasadzie zamrożone, ten workflow będzie używany rzadko,
ale dla porządku:

```bash
# W repo projektu (np. project-el-tigre):
cd ../project-el-tigre
# zmiany w src/
npm run build
git add dist/ src/  # albo cokolwiek się zmieniło
git commit -m "..."
git push origin main

# W portfolio:
cd ../portfolio/portfolio
git submodule update --remote projects/el-tigre
git add projects/el-tigre
git commit -m "bump el-tigre"
git push
```

## Klonowanie portfolio na nowej maszynie

```bash
git clone --recursive https://github.com/klubus/portfolio.git
# lub po zwykłym klonie:
git submodule update --init --recursive
```

Bez `--recursive` folder `projects/el-tigre/` będzie pusty, skrypt
`copy-projects.js` to wykryje i ostrzeże, ale iframe nie będzie miał
zawartości.

## Uwagi / caveats

- **`public/projects/` jest teraz gitignored** — nigdy nie commituj tam ręcznie
  plików. Wszystko, co tam ląduje, generuje `copy-projects.js`. Bezpośrednie
  edycje będą zniszczone przy następnym `npm start` / `npm run build`.

- **Submodule na main, nie na konkretny tag** — `git submodule update --remote`
  zawsze pobierze najnowszy commit z main. Jeśli kiedyś chciałbyś zamrozić
  konkretną wersję, dodaj tag w repo projektu i ręcznie checkoutuj go w
  submodule (`cd projects/el-tigre && git checkout v1.0`).

- **Konwencja "dist/"** — jeśli przyszły projekt buduje się do innego folderu
  (np. `out/`, `build/`), albo zmień jego konfigurację buildu, albo rozszerz
  `copy-projects.js` o czytanie nazwy folderu np. z pliku `.portfolio-output`.
  Dziś nie ma takiej potrzeby.

- **El Tigre — modyfikacja vs oryginał** — w trakcie sesji odkryłem, że
  `src/js/app.js` miało niezacommitowaną zmianę adaptującą stronę pod
  statyczny hosting (bez json-server). Zostało to scommittowane i wypchnięte
  jako osobny commit. Jeśli kiedyś będziesz odpalał El Tigre lokalnie z
  `json-server` (npm run watch), pamiętaj o tej zmianie.

- **CRA i `public/`** — CRA kopiuje całą zawartość `public/` do `build/`.
  Dlatego trzymamy submoduły poza `public/` (w `projects/`), żeby CRA nie
  próbowało skopiować `node_modules` i całego źródła submodułów. Skrypt
  decyduje świadomie, co przerzucić.

- **Warnings w buildzie** — ESLint pokazuje warningi w `Banner.js` i
  `Footer.js` (unused vars i missing useEffect deps). To istniejące zaszłości,
  niezwiązane z tą migracją.

## Otwarte / niezacommitowane zmiany w portfolio

Te zmiany NIE są częścią dzisiejszej migracji, ale były już w workspace
zanim zaczęliśmy. Decyzję o ich commicie zostawiam Tobie:

- `M src/App.css` — style `.project-page-fullscreen`
- `M src/App.js` — usunięcie `<Footer />` z `ProjectLayout`
- `M src/components/ProjectPage/ProjectPage.js` — render iframe na całą stronę
  gdy `project.embedUrl` jest ustawione
- `M src/data/projects.js` — wpis o el-tigre z `embedUrl`
- `?? src/assets/img/el-tigre-thumb.png` — miniaturka karty projektu

Zmiany wprowadzone TYLKO przez dzisiejszą migrację (do zacommitowania jako
osobny commit "add el-tigre as submodule + copy-projects pipeline"):

- `.gitignore` (dodano `/public/projects`)
- `.gitmodules` (nowy plik)
- `package.json` (dodano `prestart` + `prebuild`)
- `projects/el-tigre` (gitlink — wskaźnik na commit submodułu)
- `scripts/copy-projects.js` (nowy plik)

## Sanity check po stronie usera

Zanim uznasz to za zakończone, zrób:

1. `npm start` → otwórz portfolio w przeglądarce → kliknij na kartę El Tigre →
   iframe powinien się załadować z działającą stroną (karuzela, fonty,
   produkty z `db/app.json`)
2. `npm run build` → `npx serve -s build` → ten sam test na buildzie
   produkcyjnym
3. Sprawdź konsolę przeglądarki w iframe — żadnych 404 ani CSP błędów
