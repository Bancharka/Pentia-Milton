# CI/CD Pipeline

Projektets CI/CD pipeline er implementeret via Github Actions. Der er 4 separate workflows.
Pipeline strukturen er konfigureret til at køre automatisk ved push og pull afhængigt af workflowets formål.

---

## Lint Workflow — Continuous Integration

Linting workflowet eksekveres ved både push til main og pull request.

Workflowet er defineret i `.github/workflows/lint.yml`

```yml
name: Lint

on:
  push:
    branches: [main]
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest
    env:
      FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
```

Disse steps sørger for at klone repo og eksekvere ESlint regler.

Dette workflow fungerer som statisk kodeanalyse, og sørger for at syntaksfejl identificeres og rettes før merge til main-branch.

Workflowet er en del af continuous integration-processen, da det sikrer at koden løbende valideres mod et fælles sæt regler, ved hjælp af automatiseret linting via ESLint. Dette bidrager til en ensartet kodestandard på tværs af teamet.

---

## Firebase Workflow — Continuous Integration

Dette workflow er konfigureret til pull-requests og anvendes til preview deployment via Firebase Hosting.

Workflowet er defineret i `.github/workflows/firebase-hosting-pull-request.yml`

```yml
name: Deploy to Firebase Hosting on PR
on: pull_request
permissions:
  checks: write
  contents: read
  pull-requests: write
jobs:
  build_and_preview:
    if: ${{ github.event.pull_request.head.repo.full_name == github.repository }}
    runs-on: ubuntu-latest
    env:
      FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_PENTIA_MILTON }}
          projectId: pentia-milton
```

Her ses den tekniske pipeline, der sikrer at kun interne pull requests fra samme repository kan trigge deployment, efterfulgt af `npm run build`, der deployer en preview version til Firebase Hosting, der muliggør test af features i et isoleret miljø, før merge til production branch.

---

## Dokumentations Workflow — Continuous Deployment

Dokumentations deployment er konfigureret i `.github/workflows/docs.yml` og eksekveres ved push til main.

```yml
name: Publish Docs

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci

      - run: npm run docs

      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs

```

Dette workflow deployer den genererede dokumentation til Github Pages, hvilket sikrer automatisk opdatering af dokumentationen ved ændringer i kodebasen.

---
## Testing workflow - Continuos Integration

Testing workflowet eksekveres ved både push til main og pull requests mod main.

Workflowet er defineret i `.github/workflows/tests.yml`

```yml 
name: Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:run

  e2e-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Cypress
        run: npx cypress install

      - name: Build app
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
          VITE_CYPRESS_LOGIN_EMAIL: ${{ secrets.VITE_CYPRESS_LOGIN_EMAIL }}
          VITE_CYPRESS_LOGIN_PASSWORD: ${{ secrets.VITE_CYPRESS_LOGIN_PASSWORD }}

      - name: Run Cypress tests
        run: npm run test:e2e
        env:
          CYPRESS_BASE_URL: http://localhost:4173
          CYPRESS_TEST_CUSTOMER_EMAIL: ${{ secrets.TEST_CUSTOMER_EMAIL }}
          CYPRESS_TEST_DEV_EMAIL: ${{ secrets.TEST_DEV_EMAIL }}
          CYPRESS_TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}
          CYPRESS_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}

      - name: Upload screenshots on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: cypress-screenshots
          path: cypress/screenshots
```
Workflowet består af 2 jobs, unit testing og end to end testing
      

---

### Samlet Pipeline Struktur

| Workflow         | Trigger            | Funktion                    |
|------------------|--------------------|-----------------------------|
| Lint             | Push + pull request | Statisk kodeanalyse         |
| Firebase Preview | Pull request       | Build + preview deployment  |
| Docs             | Push til main      | Dokumentation deployment    |
| Test             | Push + pull request | Unit og E2E testing         |