# CI/CD Pipeline

Projektets CI/CD pipeline er implementeret via Github Actions. Der er 3 separate workflows.
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

### Dokumentations Workflow — Continuous Deployment

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

### Samlet Pipeline Struktur

| Workflow         | Trigger            | Funktion                    |
|------------------|--------------------|-----------------------------|
| Lint             | Push + pull request | Statisk kodeanalyse         |
| Firebase Preview | Pull request       | Build + preview deployment  |
| Docs             | Push til main      | Dokumentation deployment    |
