# Teststrategi

## Teststrategi i vores projekt
For at sikre applikationens stabilitet og funktionalitet, er der arbejdet med en teststrategi baseret på testpyramiden. Denne strategi tager udgangspunkt i, at størstedelen af testene er unit tests, mens færre og mere omfattende tests er end-to-end tests.
Teststrategien har fokus på både isoleret validering af forretningslogik og test af brugerflows i applikationen. Dette hjælper til at finde fejl tidligt i udviklingsprocessen og bidrager til refaktorering. 

<img src="./img/testpyramid.jpg" alt="Test pyramide">

--- 
## Unit tests
For at teste edge cases er der anvendt Vitest, med henblik på at teste isolerede funktioner uafhængigt af brugergrænsefladen.

--- 

## Create House – form validation

I forbindelse med oprettelse af et hus er der implementeret unit tests, som validerer formularens inputfelter.

Testene sikrer, at:
- gyldige input returnerer `null`
- manglende eller ugyldige felter returnerer fejlbeskeder

### Eksempel fra `validateHouseForm.test`

```js
it('returns null when all fields are valid', () => {
  expect(validateHouseForm(validForm)).toBeNull()
})