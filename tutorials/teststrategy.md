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
 
 it('returns null when all fields are valid', () => {
        expect(validateHouseForm(validForm)).toBeNull()
    })
    
    it('rejects when address is empty', () => {
        expect(validateHouseForm({ ...validForm, address: '' })).toBe('Udfyld alle felter')
    })
    
    it('rejects an address with only numbers', () => {
        expect(validateHouseForm({ ...validForm, address: '12345' })).toBe('Adressen må ikke kun indeholde tal')
    })
    
    it('rejects a postal code with letters', () => {
        expect(validateHouseForm({ ...validForm, postalCode: '22AB' })).toBe('Postnummer må kun indeholde tal')
    })
    
    it('rejects when city is missing', () => {
        expect(validateHouseForm({ ...validForm, city: '' })).toBe('Udfyld alle felter')
    })
    
    it('rejects when no image is selected', () => {
        expect(validateHouseForm({ ...validForm, image: null })).toBe('Udfyld alle felter')
    })

```