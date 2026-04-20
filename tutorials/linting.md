# Linting

## Hvad er linting?
Linting er en metode til at analysere kode for fejl og dårlig praksis. Vi bruger ESLint og Oxlint til at sikre ensartet kodekvalitet i projektet.

## Værktøjer
| Værktøj | Formål |
|--------|--------|
| ESLint | Tjekker JavaScript og Vue kode |
| Oxlint | Hurtig linting med fokus på performance |


## Opsætning
Linting er konfigureret i `eslint.config.js` og `.oxlintrc.json`.

## Brug
Linting køres med følgende kommando:
```bash
npm run lint
```

Dette vil automatisk rette nogle fejl med `--fix`.

## Regler
Vi har defineret egne regler, fx:
- 4 spaces indentation
- ingen console.log i produktion
- brug af === frem for ==

## Formål
Formålet med linting er at:
- forbedre kodekvalitet
- undgå fejl
- sikre ensartet kode i teamet