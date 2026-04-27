# Linting

## Hvad er linting?
Linting er en automatisk analyse af kode, der finder fejl, dårlige mønstre og inkonsistent stil. Det hjælper med at holde koden ensartet og reducere bugs.

I dette projekt bruger vi:
- **ESLint** til regler og kodestil  
- **Oxlint** til hurtig performance-orienteret linting  

---

## Værktøjer og plugins

Ud over ESLint bruger vi flere plugins, som tilføjer regelsæt:

| Værktøj / plugin | Formål |
|------------------|--------|
| ESLint (`@eslint/js`) | Grundlæggende JavaScript-regler |
| Vue plugin (`eslint-plugin-vue`) | Regler for Vue-komponenter |
| Cypress plugin | Regler til e2e tests |
| Vitest plugin | Regler til unit tests |
| Oxlint plugin | Hurtig linting baseret på `.oxlintrc.json` |

---

## Opsætning

Linting er konfigureret i:
- `eslint.config.js`
- `.oxlintrc.json`

Konfigurationen:
- ignorerer build-mapper (`dist`, `dist-ssr`, `coverage`)
- bruger browser-globals (fx `window`, `document`)
- anvender anbefalede regelsæt fra ESLint, Vue, Cypress og Vitest
- tilføjer egne projektspecifikke regler

---

## Regler

### Standardregler (fra ESLint, Vue, Oxlint m.fl.)

Disse regler kommer automatisk fra de inkluderede configs:

- **`@eslint/js:recommended`**
  - fanger syntaksfejl
  - forhindrer bugs (fx undefined variabler)

- **Vue (`flat/essential`)**
  - sikrer korrekt brug af Vue syntax
  - forhindrer fejl i templates

- **Cypress & Vitest**
  - sikrer korrekt teststruktur
  - undgår fejl i testkode

- **Oxlint**
  - supplerer med hurtige checks
  - fokuserer især på performance og simple fejl

---

### Projektspecifikke regler

Disse er defineret direkte i jeres config:

- **Indentation**
  ```js
  indent: ['error', 4]
  vue/html-indent: ['error', 4]
  ```
  4 spaces i både JavaScript og Vue templates  

- **Strict equality**  
  ```js
  `eqeqeq: 'error'`  
  ```
  kræver `===` i stedet for `==`

- **Quotes**  
  ```js
  `quotes: ['error', 'single']`  
  ```
  altid `'` i stedet for `"`

- **Semikoloner**  
  ```js
  `semi: ['error', 'never']` 
  ``` 
  semikoloner må ikke bruges

- **Console logs**  
  ```js
  `no-console: 'warn'`  
  ```
  giver advarsel (ikke build-breaking fejl)

- **Ubrugte variabler**  
  ```js
  `no-unused-vars: 'warn'`  
  ```
  giver advarsel hvis noget ikke bruges

---

## Brug

Linting køres med:

`npm run lint`

---

## Automatisk rettelse vs. manuelle fejl

Når linting køres med `--fix`, sker der to ting:

### Automatisk rettelse

Disse bliver typisk rettet automatisk:

- indentation (4 spaces)
- quotes (`"` til `'`)
- fjernelse af semikoloner
- whitespace og generel formatting
- visse Vue template-formateringer

### Kræver manuel rettelse

Disse skal du selv rette:

- brug af `console.log`
- ubrugte variabler
- brug af `==` i stedet for `===`
- logiske fejl
- potentielle bugs fra ESLint/Oxlint

Linting vil her vise:

- **error** skal rettes  
- **warning** bør rettes  

---

## Formål

Linting hjælper med at:

- forbedre kodekvalitet
- opdage fejl tidligt
- sikre ensartet kodestil
- gøre koden nemmere at læse og vedligeholde
- reducere diskussioner om stil i teamet