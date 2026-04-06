import createUnitPage from "../pageObjects/CreateUnitPage.page";
import {faker} from "@faker-js/faker";
import servicesTextConstants from "../constants/servicesTab.constants.json"
import createUnitFormFieldsText from "../constants/createUnitFormFields.constants.json";

describe('Services tab functionality', () => {
    beforeEach(() => {
        const testPhotoPath: string = "cypress/testData/validPhotos/photo_1.jpg"

        createUnitPage.open();
        cy.login();
        createUnitPage.verifyOnPage();
        createUnitPage.fillRequiredFields()
        createUnitPage.elements.nextButton().click();
        createUnitPage.uploadPhoto(testPhotoPath);
        createUnitPage.elements.techPhotosMainPhotoTitle().should("be.visible")
        createUnitPage.elements.nextButton().click();
    })
    it('C409: Verify input section and choosing of existing service', () => {
        createUnitPage.elements.servicesInputTitle()
            .should('be.visible')
            .and('have.text', servicesTextConstants.servicesInputTitle);
        createUnitPage.elements.servicesInputTileRequiredSign().should('be.visible')
        createUnitPage.elements.servicesInputClueLine()
            .should('be.visible')
            .and('have.text', servicesTextConstants.servicesInputClueLine);
        createUnitPage.elements.servicesInputLoopSign().should('be.visible')
        createUnitPage.elements.servicesInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', servicesTextConstants.servicesInputPlaceholder);

        const unacceptableSymbols: string = "<>;{};^"

        createUnitPage.elements.servicesInput().type(unacceptableSymbols);
        createUnitPage.elements.servicesInput().should('have.value', '');

        const testLongString: string = faker.string.alphanumeric(101);

        createUnitPage.elements.servicesInput()
            .clear()
            .type(testLongString);
        createUnitPage.elements.servicesInput()
            .invoke("val")
            .should('have.length', 100);

        const searchWord: string = 'Буріння'
        createUnitPage.elements.servicesInput()
            .clear()
            .type(searchWord[0]);

        createUnitPage.elements.servicesInputSearchResultsDropdown().should('be.visible')

        createUnitPage.elements.servicesInput()
            .clear()
            .type(searchWord);

        createUnitPage.elements.servicesInputSearchResultsDropdown().should('be.visible')
        createUnitPage.elements.servicesInputSearchResultsArray().then(($firstArr) => {
            const firstArrTexts = Cypress._.map($firstArr, 'innerText').map(text => text.trim());

            createUnitPage.elements.servicesInput()
                .clear()
                .type(searchWord.toUpperCase());

            createUnitPage.elements.servicesInputSearchResultsArray().then(($secondArr) => {
                const secondArrTexts = Cypress._.map($secondArr, 'innerText').map(text => text.trim());
                expect(secondArrTexts).to.deep.equal(firstArrTexts);
            });
        });

         createUnitPage.elements.servicesInputSearchResultsArray().then(results => {
             const randomIndex: number = faker.number.int(results.length - 1);

             cy.wrap(results).eq(randomIndex).click();
             cy.wrap(results[randomIndex])
                 .find('path')
                 .should('have.attr', 'd', servicesTextConstants.servicePickedMarkAttribute);

             cy.wrap(results[randomIndex])
                 .invoke('text')
                 .then((pickedServiceName) => {

                     const trimmedName:string = pickedServiceName.trim();

                     createUnitPage.elements.servicesToChooseTitle()
                         .should('be.visible')
                         .and('have.text', servicesTextConstants.pickedServicesTitle);

                     createUnitPage.elements.servicesPickedArray()
                         .should('be.visible')
                         .and('contain.text', trimmedName);
                 });
         });
    });
    it('C410: Verify creating new service', () => {
        const testServiceName = faker.lorem.words(2);

        createUnitPage.elements.servicesInput().type(testServiceName);
        createUnitPage.elements.servicesNotFoundMsg()
            .should('be.visible')
            .and('contain.text', servicesTextConstants.serviceNotFoundMsg.replace("{serviceName}", testServiceName));

        createUnitPage.elements.servicesCreateNew()
            .find('svg')
            .should('be.visible')
        createUnitPage.elements.servicesCreateNew()
            .should('be.visible')
            .and('contain.text', servicesTextConstants.createNewServiceBtnTitle)
            .click();

        createUnitPage.elements.servicesPickedArray().should('be.visible').and('have.text', testServiceName);
    });
    it('C411: Verify choosing multiple services', () => {
        const searchSymbol: string = 'Г'
        createUnitPage.elements.servicesInput()
            .clear()
            .type(searchSymbol);

        createUnitPage.elements.servicesInputSearchResultsDropdown().should('be.visible');

        createUnitPage.elements.servicesInputSearchResultsArray().then(results => {
            const arrLength = results.length;
            const randomAmount = Cypress._.random(1, arrLength);

            const shuffledResults = Cypress._.shuffle(results.toArray());
            const randomChoices = shuffledResults.slice(0, randomAmount);
            const randomChoicesTextArray = [];

            cy.wrap(randomChoices).each(($el, index, $list) => {
                cy.wrap($el)
                    .invoke('text')
                    .then((pickedServiceName) => {
                        randomChoicesTextArray.push(pickedServiceName.trim());
                    })
                    .then(() => {
                        cy.wrap($el)
                            .click()
                            .find('path')
                            .should('have.attr', 'd', servicesTextConstants.servicePickedMarkAttribute);
                    });
            });

            createUnitPage.elements.servicesPickedArray().then(($pickedServicesArr) => {
                const secondArrTexts = Cypress._.map($pickedServicesArr, 'innerText').map(text => text.trim());
                expect(secondArrTexts).to.deep.equal(randomChoicesTextArray);
            });
        });
    });
    it('C412: Verify removing variants from choosed list', () => {
        const searchSymbol: string = 'Г'
        createUnitPage.elements.servicesInput()
            .clear()
            .type(searchSymbol);

        createUnitPage.elements.servicesInputSearchResultsDropdown().should('be.visible');

        createUnitPage.elements.servicesInputSearchResultsArray().then(results => {
            const arrLength = results.length;
            const randomAmount = Cypress._.random(1, arrLength);

            const shuffledResults = Cypress._.shuffle(results.toArray());
            const randomChoices = shuffledResults.slice(0, randomAmount);
            const randomChoicesTextArray = [];

            cy.wrap(randomChoices).each(($el, index, $list) => {
                cy.wrap($el)
                    .invoke('text')
                    .then((pickedServiceName) => {
                        randomChoicesTextArray.push(pickedServiceName.trim());
                    })
                    .then(() => {
                        cy.wrap($el)
                            .click()
                            .find('path')
                            .should('have.attr', 'd', servicesTextConstants.servicePickedMarkAttribute);
                    });
            });

            createUnitPage.elements.servicesPickedArray().then(($pickedServicesArr) => {
                const secondArrTexts = Cypress._.map($pickedServicesArr, 'innerText').map(text => text.trim());
                expect(secondArrTexts).to.deep.equal(randomChoicesTextArray);
            });
        });

        createUnitPage.elements.servicesPickedArray().each(($pickedService, index, $list) => {
            const lastElement = $list.length - 1;

            cy.wrap($pickedService)
                .should('be.visible')
                .find('[data-testid="remove-servicesUnitFlow"]')
                .click()
                .should('not.exist');

            if (index === lastElement) {
                createUnitPage.elements.servicesPickedTitle().should('not.exist');
            } else {
                createUnitPage.elements.servicesPickedTitle().should('be.visible');
            }
        });
    });
    it('C413: Verify "Назад" button', () => {
        createUnitPage.elements.cancelButton()
            .should('be.visible')
            .and('have.text', createUnitFormFieldsText.gobackButtonTitle)
            .click();

        createUnitPage.elements.tabs().each(($tab, index) => {
            cy.wrap($tab).should('have.text', createUnitFormFieldsText.tabs[index]);
            if(index === 1){
                cy.wrap($tab).should('have.attr', 'aria-selected', 'true');
            }
            else {
                cy.wrap($tab).should('have.attr', 'aria-selected', 'false');
            }
        });
    });
    it('С414: Verify "Далі" button', () => {
        createUnitPage.elements.nextButton()
            .should('be.visible')
            .and('have.text', createUnitFormFieldsText.nextButtonTitle)
            .click();

        createUnitPage.elements.tabs().each(($tab, index) => {
            cy.wrap($tab).should('have.text', createUnitFormFieldsText.tabs[index]);
            if(index === 2){
                cy.wrap($tab).should('have.attr', 'aria-selected', 'true');
            }
            else {
                cy.wrap($tab).should('have.attr', 'aria-selected', 'false');
            }
        });

        createUnitPage.elements.servicesInputClueLine()
            .should('have.attr', 'class')
            .and('include', 'ServicesUnitFlow_error')

        createUnitPage.pickRandomService("Г");

        createUnitPage.elements.nextButton().click();

        createUnitPage.elements.tabs().each(($tab, index) => {
            cy.wrap($tab).should('have.text', createUnitFormFieldsText.tabs[index]);
            if(index === 3){
                cy.wrap($tab).should('have.attr', 'aria-selected', 'true');
            }
            else {
                cy.wrap($tab).should('have.attr', 'aria-selected', 'false');
            }
        });
    });
});