// https://on.cypress.io/api

describe('login test', () => {

  beforeEach(() => {

    cy.visit('http://localhost:5173/')
  });


  it('should click button to get to login screen', () => {

    cy.get('.btn--secondary').click();

    cy.url().should('eq', 'http://localhost:5173/login' )

  });


  it('should login successfully with email and password, and get redirected to overview', () => {

    // klikker på en knap for at komme til login
    cy.get('.btn--secondary').click();

    // Henter login input felt for at indstaste email
    cy.get('.login__input > .login > :nth-child(1)').type('olipet101@gmail.com')
    // Henter password input for at indtaste kode
    cy.get('.login__input > .login > :nth-child(2)').type('kode123')


    cy.get('.btn').click()

    cy.url().should('eq','http://localhost:5173/overview' )

  });

  it('should not get logged in with wrong password', () => {

    // klikker på en knap for at komme til login
    cy.get('.btn--secondary').click();

    // Henter login input felt for at indstaste email
    cy.get('.login__input > .login > :nth-child(1)').type('olipet101@gmail.com')
    // Henter password input for at indtaste kode
    cy.get('.login__input > .login > :nth-child(2)').type('forkertkode')


    cy.get('.btn').click()

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
