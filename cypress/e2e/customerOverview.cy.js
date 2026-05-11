describe('overview', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/home-customer');
    
  });

    it('should be on /home-customer', () => {

        cy.url().should('eq', 'http://localhost:5173/home-customer' )

        cy.get('.header').should('contain', 'Hjem')

    });





  });