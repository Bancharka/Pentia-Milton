// https://on.cypress.io/api

describe('login test', () => {

  beforeEach(() => {

    cy.visit('http://localhost:5173/')
  });


  it('should click button to get to login screen', () => {

    cy.get('.btn--secondary').click();

    cy.url().should('eq', 'http://localhost:5173/login' )

  });


  it('should login successfully as a dev with email and password, and get redirected to overview', () => {

    // klikker på en knap for at komme til login
    cy.get('.btn--secondary').click();

    // Henter login input felt for at indstaste email
    cy.get('.login__input > .login > :nth-child(1)').type(Cypress.env('TEST_DEV_EMAIL'))
    // Henter password input for at indtaste kode
    cy.get('.login__input > .login > :nth-child(2)').type(Cypress.env('TEST_PASSWORD'))


    cy.get('.btn').click()

    cy.url().should('eq','http://localhost:5173/overview' )

  });


  it('should login successfully as a customer with email and password, and get redirected to overview', () => {

    // klikker på en knap for at komme til login
    cy.get('.btn--secondary').click();

    // Henter login input felt for at indstaste email
    cy.get('.login__input > .login > :nth-child(1)').type(Cypress.env('TEST_CUSTOMER_EMAIL'))
    // Henter password input for at indtaste kode
    cy.get('.login__input > .login > :nth-child(2)').type(Cypress.env('TEST_PASSWORD'))


    cy.get('.btn').click()

    cy.url().should('eq','http://localhost:5173/home-customer' )

  });

  it('should not get logged in with wrong password', () => {

    // klikker på en knap for at komme til login
    cy.get('.btn--secondary').click();

    // Henter login input felt for at indstaste email
    cy.get('.login__input > .login > :nth-child(1)').type(Cypress.env('TEST_DEV_EMAIL'))
    // Henter password input for at indtaste kode
    cy.get('.login__input > .login > :nth-child(2)').type('forkertkode')

    //Trykker på login knap
    cy.get('.btn').click()

    //Tjekker om url stadigt er den samme
    cy.url().should('eq','http://localhost:5173/login' )

  });


  it('should not get logged in with wrong email', () => {

    // klikker på en knap for at komme til login
    cy.get('.btn--secondary').click();

    // Henter login input felt for at indstaste email
    cy.get('.login__input > .login > :nth-child(1)').type('forkertEmail@gmail.com')
    // Henter password input for at indtaste kode
    cy.get('.login__input > .login > :nth-child(2)').type('kode123')


    cy.get('.btn').click()

    cy.url().should('eq','http://localhost:5173/login' )

  });
  
  
  
  
  
  
  
  




})
