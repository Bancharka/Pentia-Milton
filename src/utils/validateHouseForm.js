export function validateHouseForm({ address, city, postalCode, registration, image }) {
    if (!address || !city || !postalCode || !registration || !image) {
        return 'Udfyld alle felter'
    }
    if (/^\d+$/.test(address)) {
        return 'Adressen må ikke kun indeholde tal'
    }
    if (!/^\d+$/.test(postalCode)) {
        return 'Postnummer må kun indeholde tal'
    }
    return null
}