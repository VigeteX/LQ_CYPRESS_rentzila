import createUnitPage from "../pageObjects/CreateUnitPage.page";
import createUnitFormFieldsText from "../constants/createUnitFormFields.constants.json";
import {faker} from "@faker-js/faker";

describe('Prices tab functionality', () => {
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

        createUnitPage.pickRandomService("Г");
        createUnitPage.elements.nextButton().click();

    })
    it('C417', () => {
        createUnitPage.elements.pricesPaymentMethodTitle()
            .should('be.visible')
            .and('have.text', 'Спосіб оплати *');
        createUnitPage.elements.pricesPaymentMethodInput()
            .should('be.visible')
            .and('have.text', createUnitFormFieldsText.paymentMethods[0])
            .click();
        createUnitPage.elements.pricesPaymentMethodDropdown().should('be.visible');

        createUnitPage.elements.pricesPaymentMethodDropdownResultsArray().then($elements => {
            const texts: string[] = [...$elements].map(el => el.innerText);

            expect(texts).to.deep.eq(createUnitFormFieldsText.paymentMethods);

        });

        createUnitPage.elements.pricesPaymentMethodDropdownResultsArray().then($elements => {
            const texts = [...$elements].map(el => el.innerText.trim());
            createUnitPage.elements.pricesPaymentMethodInput().click() // closing the dropdown before starting the loop

            texts.forEach(text => {
                createUnitPage.elements.pricesPaymentMethodInput().click();
                cy.contains(text).click();

                createUnitPage.elements.pricesPaymentMethodInputText().should('have.text', text);
            });
        });
    });
    it('C418: Verify "Вартість мінімального замовлення" section ', () => {
        createUnitPage.elements.pricesMinimumPaymentTitle()
            .should('be.visible')
            .and('have.text', createUnitFormFieldsText.minimumPaymentTitle);
        createUnitPage.elements.pricesMinimumPaymentInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', createUnitFormFieldsText.minimumPaymentInputPlaceholderText);

        createUnitPage.elements.pricesMinimumPaymentInput()
            .type('1234567890')
            .invoke('val')
            .should('have.length', 9)

        const values: string[] = [
            '123 456',
            '123456 ',
            ' ',
            faker.lorem.word(),
            '!@#$%.,'
            ]

        values.forEach(value => {
            createUnitPage.elements.pricesMinimumPaymentInput()
                .clear()
                .type(value);
            createUnitPage.elements.pricesMinimumPaymentInput().invoke('val')
                .should('eq', value.replace(/\D/g, ''))
        });

        createUnitPage.elements.pricesMinimumPaymentCurrencyInput()
            .should('be.visible')
            .and('have.value', createUnitFormFieldsText.defaultCurrency)
    });
});