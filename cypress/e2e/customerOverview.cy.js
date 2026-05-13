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


    it('should click on profile in the bottom navbar', () => {

        // klikker på profil knappen
        cy.get("[href='/cus-profile']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:5173/cus-profile");

        //Tjekker at profil email matcher den profil der er logget ind
        cy.contains(Cypress.env('TEST_CUSTOMER_EMAIL')).should("exist");
    

    });


    it('should navigate to todolist and check for items in the list', () => {

        // klikker på todo liste knappen knappen
        cy.get("[href='/build-overview']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:5173/build-overview");

        //Tjekker om der er en liste af todos
        cy.get(".build-overview__title").should("have.length", 7)

  
  

  });



  it('should navigate all of the available links in navbar', () => {

        // klikker på knappen 
        cy.get("[href='/build-overview']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:5173/build-overview");

        // klikker på knappen 
        cy.get("[href='/cus-documents']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:5173/cus-documents");

        // klikker på knappen 
        cy.get("[href='/cus-profile']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:5173/cus-profile");
  
        // klikker på knappen 
        cy.get("[href='/home-customer']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:5173/home-customer");
  });

     it('should navigate to profile and click "mit hus"', () => {

        // klikker på profil knappen 
        cy.get("[href='/cus-profile']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:5173/cus-profile");

        //klikker på Mit hus knappen
        cy.get("button.profile-menu__item").click()

        //Tjekker om modalen er poppet op
        cy.get(".house-modal__content").should("contain", (Cypress.env('TEST_CUSTOMER_EMAIL')))
        
  });
    



  });