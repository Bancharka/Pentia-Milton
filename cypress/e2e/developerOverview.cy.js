


describe('overview', () => {
  beforeEach(() => {
    cy.login();
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




});