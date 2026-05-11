


describe('overview', () => {
  beforeEach(() => {
    cy.devLogin();
    cy.visit('/overview');

    
  });

  it('should be on /overview', () => {

    cy.url().should('eq', 'http://localhost:5173/overview' )

  });

  it('should show a list of houses', () => {

    // Tjekker at listen er fyldt med rigtige antal
    cy.get('.housecard__img').should('have.length', 8);

  });


  it('should use, and show the search function works', () => {

    // Skriver Clara i søgefeltet
    cy.get('.search').type('Clara')

    // Leder i listen og ser om den har sorteret og fundet det rigtige hus
    cy.get('.housecard__title').should('contain', 'clara')

  });
  

  it('should show the full unfiltered list when deleting text from search input', () => {

    // Skriver Clara i søgefeltet
    cy.get('.search').type('Clara')

    // Leder i listen og ser om den har sorteret og fundet det rigtige hus
    cy.get('.housecard__title').should('contain', 'clara')

    // Sletter tekst skrevet i input feltet
    cy.focused().clear();

    // Leder i listen og ser om hele listen vises igen
    cy.get('.housecard__img').should('have.length', 8);



  });

  it('should go into a specific house when clicking on it', () => {

    // Klikker på housecard Clara
    cy.contains(".housecard__title", "clara").click()

    // Tjekker om url passer til det housecard
    cy.url().should("eq", "http://localhost:5173/houses/MGxfuimym3Nb59jRamU3")

  });

  it('back button should work inside a specific house', () => {

    // Klikker på housecard Clara
    cy.contains(".housecard__title", "clara").click()

    // Tjekker om url passer til det housecard
    cy.url().should("eq", "http://localhost:5173/houses/MGxfuimym3Nb59jRamU3")

    // Klikker på back knappen
    cy.get(".header__button").click()

    // Tjekker at vi er tilbage på overview
    cy.url().should("eq", "http://localhost:5173/overview")
  });


  it('should scroll to the bottom and up again', () => {

    cy.wait(2000)
    // scroller til bunden af sidebaren
    cy.scrollTo("bottom", {duration:1000});


    // scroller til toppen af sidebaren
    cy.scrollTo("top", {duration:1000});

  });
  

  it('should click on profile in the bottom navbar', () => {

  // klikker på profil knappen
  cy.get("[href='/dev-profile']").click();

  //Tjekker om url er skiftet
  cy.url().should("eq", "http://localhost:5173/dev-profile");

  //Tjekker at profil email matcher den profil der er logget ind
  cy.contains(Cypress.env('TEST_DEV_EMAIL')).should("exist");
  

  });


  it('should navigate away from and back to profile and back', () => {

  // klikker på profil knappen
  cy.get("[href='/dev-profile']").click();

  //Tjekker om url er skiftet
  cy.url().should("eq", "http://localhost:5173/dev-profile");

  //Tjekker at profil email matcher den profil der er logget ind
  cy.get(".header__button").click()

  //Tjekker om url er skiftet tilbage
  cy.url().should("eq", "http://localhost:5173/overview");
  

  });
  


});