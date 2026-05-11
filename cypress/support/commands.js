import { initializeApp, getApps } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const app = getApps().length === 0 ? initializeApp({
  apiKey: Cypress.env('FIREBASE_API_KEY'),
  authDomain: Cypress.env('FIREBASE_AUTH_DOMAIN'),
  projectId: Cypress.env('FIREBASE_PROJECT_ID'),
  appId: Cypress.env('FIREBASE_APP_ID'),
}) : getApps()[0]

const auth = getAuth(app)

Cypress.Commands.add('customerLogin', () => {
  cy.wrap(
    signInWithEmailAndPassword(auth, Cypress.env('TEST_CUSTOMER_EMAIL'), Cypress.env('TEST_PASSWORD'))
  )
})

Cypress.Commands.add('devLogin', () => {
  cy.wrap(
    signInWithEmailAndPassword(auth, Cypress.env('TEST_DEV_EMAIL'), Cypress.env('TEST_PASSWORD'))
  )
})