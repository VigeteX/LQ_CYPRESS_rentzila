import createUnitPage from "../pageObjects/CreateUnitPage.page";
import {faker} from "@faker-js/faker";
import createUnitFormFieldsText from "../constants/createUnitFormFields.constants.json";
import errorMessages from "../constants/errorMessages.constants.json"
import testAddresses from "../constants/mapAdrdresses.constants.json"
import cancelApproveMessages from "../constants/cancelAprroveText.constants.json"
import servicesTextConstants from "../constants/servicesTab.constants.json"

describe('Services tab functionality', () => {
    beforeEach(() => {
        const testPhotoPath: string = "cypress/testData/validPhotos/photo_1.jpg"
        createUnitPage.open();
        cy.login();
        createUnitPage.verifyOnPage();
        createUnitPage.fillRequiredFields()
        createUnitPage.elements.nextButton().click();
        createUnitPage.uploadPhoto(testPhotoPath);
        createUnitPage.elements.nextButton().click();
    })
    it('C409: Verify input section and choosing of existing service',  () => {
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
            .and('have.attr', 'placeholder', 'Наприклад: Рихлення грунту, буріння')

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

        createUnitPage.elements.servicesInput()
            .clear()
            .type('Б');

        createUnitPage.elements.servicesInputSearchResultsDropdown().should('be.visible')

        createUnitPage.elements.servicesInput()
            .clear()
            .type('Буріння');

        createUnitPage.elements.servicesInputSearchResultsDropdown().should('be.visible')
        const firstArr = createUnitPage.elements.servicesInputSearchResultsArray();

        createUnitPage.elements.servicesInput()
            .clear()
            .type('БУРІННЯ');

        createUnitPage.elements.servicesInputSearchResultsDropdown().should('be.visible')
        //createUnitPage.elements.servicesInputSearchResultsArray().should('equal', firstArr);

        createUnitPage.elements.servicesInputSearchResultsDropdown().then(results => {
            const randomIndex = faker.number.int(results.length);

            cy.wrap(results).eq(randomIndex).click();
            cy.wrap(results[randomIndex]).find('path').should('have.attr', 'd', 'M1 5.54545L5.54545 10.0909L13.1212 1');

        })
    });
});