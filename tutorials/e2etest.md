# E2E testing 

E2E testing bruges til at teste hele flows, for at sikre at brugerne kan interagere med hjemmesiden, efter hensigten.

I dette projekt har der været fokus på 3 sider; Login, HomeViewCustomer og Overview, da de tre sider bærer de fleste og største funktioner i projektet. Der er brugt Cypress til at lave disse test, som da færdige blev brugt i Github actions på push og PR.


## Login

Her testes login siden for at login virker som det skal med korrekt email og password

``` yml
// https://on.cypress.io/api

describe('login test', () => {

  beforeEach(() => {

    cy.visit('http://localhost:4173/')
  });


  it('should click button to get to login screen', () => {

    cy.get('.btn--secondary').click();

    cy.url().should('eq', 'http://localhost:4173/login' )

  });


  it('should login successfully as a dev with email and password, and get redirected to overview', () => {

    // klikker på en knap for at komme til login
    cy.get('.btn--secondary').click();

    // Henter login input felt for at indstaste email
    cy.get('.login__input > .login > :nth-child(1)').type(Cypress.env('TEST_DEV_EMAIL'))
    // Henter password input for at indtaste kode
    cy.get('.login__input > .login > :nth-child(2)').type(Cypress.env('TEST_PASSWORD'))


    cy.get('.btn').click()

    cy.url().should('eq','http://localhost:4173/overview' )

  });


  it('should login successfully as a customer with email and password, and get redirected to overview', () => {

    // klikker på en knap for at komme til login
    cy.get('.btn--secondary').click();

    // Henter login input felt for at indstaste email
    cy.get('.login__input > .login > :nth-child(1)').type(Cypress.env('TEST_CUSTOMER_EMAIL'))
    // Henter password input for at indtaste kode
    cy.get('.login__input > .login > :nth-child(2)').type(Cypress.env('TEST_PASSWORD'))


    cy.get('.btn').click()

    cy.url().should('eq','http://localhost:4173/home-customer' )

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
    cy.url().should('eq','http://localhost:4173/login' )

  });


  it('should not get logged in with wrong email', () => {

    // klikker på en knap for at komme til login
    cy.get('.btn--secondary').click();

    // Henter login input felt for at indstaste email
    cy.get('.login__input > .login > :nth-child(1)').type('forkertEmail@gmail.com')
    // Henter password input for at indtaste kode
    cy.get('.login__input > .login > :nth-child(2)').type('kode123')


    cy.get('.btn').click()

    cy.url().should('eq','http://localhost:4173/login' )

  });
})


```


## HomeViewCustomer

Tester diverse funktionaliteter

``` yml
describe('overview', () => {
  beforeEach(() => {
    cy.customerLogin();
    cy.visit('/home-customer');

    
  });

    it('should be on /home-customer', () => {

        // Tjekker url om den er på home customer
        cy.url().should('eq', 'http://localhost:4173/home-customer' )

        // Tjekker for om der er en header med "hjem"
        cy.get('.header').should('contain', 'Hjem')

    });


    it('should have an illustration of the house', () => {

    //Tjekker om billedet på siden er en af de fire billeder der kan være
        cy.get('.progress img').should("exist")
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
        cy.url().should("eq", "http://localhost:4173/cus-profile");

        //Tjekker at profil email matcher den profil der er logget ind
        cy.contains(Cypress.env('TEST_CUSTOMER_EMAIL')).should("exist");
    

    });


    it('should navigate to todolist and check for items in the list', () => {

        // klikker på todo liste knappen knappen
        cy.get("[href='/build-overview']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:4173/build-overview");

        //Tjekker om der er en liste af todos
        cy.get(".build-overview__title").should("have.length", 7)

  
  

  });



  it('should navigate all of the available links in navbar', () => {

        // klikker på knappen 
        cy.get("[href='/build-overview']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:4173/build-overview");

        // klikker på knappen 
        cy.get("[href='/cus-documents']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:4173/cus-documents");

        // klikker på knappen 
        cy.get("[href='/cus-profile']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:4173/cus-profile");
  
        // klikker på knappen 
        cy.get("[href='/home-customer']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:4173/home-customer");
  });

     it('should navigate to profile and click "mit hus"', () => {

        // klikker på profil knappen 
        cy.get("[href='/cus-profile']").click();

        //Tjekker om url er skiftet
        cy.url().should("eq", "http://localhost:4173/cus-profile");

        //klikker på Mit hus knappen
        cy.get("button.profile-menu__item").click()

        //Tjekker om modalen er poppet op
        cy.get(".house-modal__content").should("contain", (Cypress.env('TEST_CUSTOMER_EMAIL')))
        
  });
    
});
 ```


## Overview

Her testes funktionalitet af huse og todolister for byggeledere

``` yml

describe('overview', () => {
  beforeEach(() => {
    cy.devLogin();
    cy.visit('/overview');

    
   });

  it('should be on /overview', () => {

    cy.url().should('eq', 'http://localhost:4173/overview' )

  });

  it('should show a list of houses', () => {

    // Tjekker at listen er fyldt med rigtige antal
    cy.get('.housecard__img').should('have.length', 5);

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
    cy.get('.housecard__img').should('have.length', 5);



  });

  it('should go into a specific house when clicking on it', () => {

    // Klikker på housecard Clara
    cy.contains(".housecard__title", "clara").click()

    // Tjekker om url passer til det housecard
    cy.url().should("eq", "http://localhost:4173/houses/MGxfuimym3Nb59jRamU3")

  });

  it('back button should work inside a specific house', () => {

    // Klikker på housecard Clara
    cy.contains(".housecard__title", "clara").click()

    // Tjekker om url passer til det housecard
    cy.url().should("eq", "http://localhost:4173/houses/MGxfuimym3Nb59jRamU3")

    // Klikker på back knappen
    cy.get(".header__button").click()

    // Tjekker at vi er tilbage på overview
    cy.url().should("eq", "http://localhost:4173/overview")
  });

  

  it('should click on profile in the bottom navbar', () => {

    // klikker på profil knappen
    cy.get("[href='/dev-profile']").click();

    //Tjekker om url er skiftet
    cy.url().should("eq", "http://localhost:4173/dev-profile");

    //Tjekker at profil email matcher den profil der er logget ind
    cy.contains(Cypress.env('TEST_DEV_EMAIL')).should("exist");
  

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

```