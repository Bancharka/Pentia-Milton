import { describe, it, expect } from 'vitest'
import { validateHouseForm } from '@/utils/validateHouseForm'
const validForm = {
    address: 'Nørrebrogade 10',
    city: 'Copenhagen',
    postalCode: '2200',
    registration: 'ABC123',
    image: new File([''], 'house.jpg')
}
describe('validateHouseForm', () => {
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
})