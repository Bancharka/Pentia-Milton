


describe('overview', () => {
  beforeEach(() => {
    cy.devLogin();
    cy.visit('/overview');

    
   });

  // it('should be on /overview', () => {

  //   cy.url().should('eq', 'http://localhost:5173/overview' )

  // });

  // it('should show a list of houses', () => {

  //   // Tjekker at listen er fyldt med rigtige antal
  //   cy.get('.housecard__img').should('have.length', 9);

  // });


  // it('should use, and show the search function works', () => {

  //   // Skriver Clara i søgefeltet
  //   cy.get('.search').type('Clara')

  //   // Leder i listen og ser om den har sorteret og fundet det rigtige hus
  //   cy.get('.housecard__title').should('contain', 'clara')

  // });
  

  // it('should show the full unfiltered list when deleting text from search input', () => {

  //   // Skriver Clara i søgefeltet
  //   cy.get('.search').type('Clara')

  //   // Leder i listen og ser om den har sorteret og fundet det rigtige hus
  //   cy.get('.housecard__title').should('contain', 'clara')

  //   // Sletter tekst skrevet i input feltet
  //   cy.focused().clear();

  //   // Leder i listen og ser om hele listen vises igen
  //   cy.get('.housecard__img').should('have.length', 9);



  // });

  // it('should go into a specific house when clicking on it', () => {

  //   // Klikker på housecard Clara
  //   cy.contains(".housecard__title", "clara").click()

  //   // Tjekker om url passer til det housecard
  //   cy.url().should("eq", "http://localhost:5173/houses/MGxfuimym3Nb59jRamU3")

  // });

  // it('back button should work inside a specific house', () => {

  //   // Klikker på housecard Clara
  //   cy.contains(".housecard__title", "clara").click()

  //   // Tjekker om url passer til det housecard
  //   cy.url().should("eq", "http://localhost:5173/houses/MGxfuimym3Nb59jRamU3")

  //   // Klikker på back knappen
  //   cy.get(".header__button").click()

  //   // Tjekker at vi er tilbage på overview
  //   cy.url().should("eq", "http://localhost:5173/overview")
  // });

  

  // it('should click on profile in the bottom navbar', () => {

  //   // klikker på profil knappen
  //   cy.get("[href='/dev-profile']").click();

  //   //Tjekker om url er skiftet
  //   cy.url().should("eq", "http://localhost:5173/dev-profile");

  //   //Tjekker at profil email matcher den profil der er logget ind
  //   cy.contains(Cypress.env('TEST_DEV_EMAIL')).should("exist");
  

  // });


  it('should navigate to a house and check todo items off the list succesfully', () => {

    // Klikker på housecard Clara
    cy.contains(".housecard__title", "testerdenher").click()

    cy.wait(2000)

    // Tjekker progressbarfill for at width er mindre end 52
    cy.get('.progress__bar').then((parent) => {
        const parentWidth = parent[0].getBoundingClientRect().width

        cy.get('.progress__bar__fill').then((el) => {
            const elWidth = el[0].getBoundingClientRect().width
            const percentage = (elWidth / parentWidth) * 100

            expect(percentage).to.be.lessThan(50)
        })
    })

    // Klikker på "gennemgå tjekliste knap"
    cy.get(".btn").click()

    cy.wait(2000)

    // Klikker på "Lukket hus" todo item
    cy.contains(".todo-card", "Lukket hus").click()

    cy.wait(2000)

    //Klikker på alle to do items
    cy.get(":nth-child(1) > .todo-card__text").click()
    cy.wait(500)
    cy.get(":nth-child(2) > .todo-card__text").click()
    cy.wait(500)
    cy.get(":nth-child(3) > .todo-card__text").click()
    cy.wait(500)
    cy.get(":nth-child(4) > .todo-card__text").click()
    cy.wait(500)
    cy.get(":nth-child(5) > .todo-card__text").click()

    //Venter 2 sekunder før den klikker tilbage så den når at pushe til server
    cy.wait(2000)

    //Går tilbage til todo oversigten
    cy.get(".header__button").click()

    cy.wait(1000)

    //Går tilbage til hus oversigten
    cy.get(".header__button").click()


    // Tjekker progressbarfill for at width er mere end 52
    cy.get('.progress__bar').then((parent) => {
        const parentWidth = parent[0].getBoundingClientRect().width

        cy.get('.progress__bar__fill').then((el) => {
            const elWidth = el[0].getBoundingClientRect().width
            const percentage = (elWidth / parentWidth) * 100

            expect(percentage).to.be.greaterThan(50)
        })
    })

  
  

  });


  it('should navigate to a house and check todo items off the list succesfully', () => {

    // Klikker på housecard Clara
    cy.contains(".housecard__title", "testerdenher").click()

    cy.wait(2000)

    // Tjekker progressbarfill for at width er mindre end 52
    cy.get('.progress__bar').then((parent) => {
        const parentWidth = parent[0].getBoundingClientRect().width

        cy.get('.progress__bar__fill').then((el) => {
            const elWidth = el[0].getBoundingClientRect().width
            const percentage = (elWidth / parentWidth) * 100

            expect(percentage).to.be.greaterThan(50)
        })
    })

    // Klikker på "gennemgå tjekliste knap"
    cy.get(".btn").click()

    cy.wait(2000)

    // Klikker på "Lukket hus" todo item
    cy.contains(".todo-card", "Lukket hus").click()

    cy.wait(2000)

    //Klikker på alle to do items
    cy.get(":nth-child(1) > .todo-card__text").click()
    cy.wait(500)
    cy.get(":nth-child(2) > .todo-card__text").click()
    cy.wait(500)
    cy.get(":nth-child(3) > .todo-card__text").click()
    cy.wait(500)
    cy.get(":nth-child(4) > .todo-card__text").click()
    cy.wait(500)
    cy.get(":nth-child(5) > .todo-card__text").click()

    //Venter 2 sekunder før den klikker tilbage så den når at pushe til server
    cy.wait(2000)

    //Går tilbage til todo oversigten
    cy.get(".header__button").click()

    cy.wait(1000)

    //Går tilbage til hus oversigten
    cy.get(".header__button").click()


    // Tjekker progressbarfill for at width er mere end 52
    cy.get('.progress__bar').then((parent) => {
        const parentWidth = parent[0].getBoundingClientRect().width

        cy.get('.progress__bar__fill').then((el) => {
            const elWidth = el[0].getBoundingClientRect().width
            const percentage = (elWidth / parentWidth) * 100

            expect(percentage).to.be.lessThan(50)
        })
    })

  
  

  });


  


});