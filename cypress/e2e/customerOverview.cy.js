describe('overview', () => {
  beforeEach(() => {
    cy.customerLogin();
    cy.visit('/home-customer');

    
  });

    it('should be on /home-customer', () => {

        // Tjekker url om den er på home customer
        cy.url().should('eq', 'http://localhost:5173/home-customer' )

        // Tjekker for om der er en header med "hjem"
        cy.get('.header').should('contain', 'Hjem')

    });


    it('should have an illustration of the house', () => {

    //Tjekker om billedet på siden er en af de fire billeder der kan være
    cy.get('.house-card img').invoke('attr', 'src').then((src) => {
        expect(src).to.be.oneOf([
            '/src/img/House-walls.png',
            '/src/img/House-foundation.png',
            '/src/img/House-walls-roof.png',
            '/src/img/House-done.png'
        ])
    })
})


    it('should navigate to todo list', () => {

        // Tjekker url om den er på home customer
        cy.get("[href='/build-overview']").click();

        // Tjekker for om der er en header med "hjem"
        cy.get('.header').should('contain', 'Bygge oversigt')

    });



  });