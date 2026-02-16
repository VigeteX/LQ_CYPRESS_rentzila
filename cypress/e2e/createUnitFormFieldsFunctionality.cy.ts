import createUnitPage from "../pageObjects/CreateUnitPage.page";
import {faker} from "@faker-js/faker";
import { generateText } from '../utils/textGenerator';
import createUnitFormFieldsText from "../constants/createUnitFormFields.constants.json";
import colors from "../constants/colors.constants.json"
import errorMessages from "../constants/errorMessages.constants.json"

describe('Create Unit Form Fields validation', () => {
    beforeEach(() => {
        createUnitPage.open();
        cy.login();
        createUnitPage.verifyOnPage();
    })
    it('C299: Verify model name input field',  () => {
        createUnitPage.elements.modelNameTitle()
            .should("be.visible")
            .and('contain.text', createUnitFormFieldsText.modelNameTitle);
        createUnitPage.elements.modelNameInput()
            .should("be.visible")
            .and('have.attr', 'placeholder', createUnitFormFieldsText.modelNameBackgroundText);

        const invalidModelNames: string[] = [
            "11234567890123456",
            "1234567890 12345",
            "123456789012345  "
        ]

        for (const modelName of invalidModelNames) {
            createUnitPage.elements.modelNameInput().clear().type(modelName);
            createUnitPage.elements.modelNameInput().should('have.css', 'border-color', colors.errorBorderColor)
            createUnitPage.elements.modelNameInvalidInputMsg()
                .should("be.visible")
                .and('contain.text', errorMessages.modelNameInvalidInputMsg);
        }

        createUnitPage.elements.modelNameInput().clear().type(" <>{};^");
        createUnitPage.elements.modelNameInput().should('have.value', '');

        createUnitPage.elements.modelNameInput().clear().type(faker.string.alphanumeric( {length: {min:0, max:15}} ));
        createUnitPage.elements.modelNameInvalidInputMsg().should("not.exist");
    });
    it('C317: Verify tech characteristics input field',  () => {
        createUnitPage.elements.techCharsTitle()
            .should("be.visible")
            .and('contain.text', createUnitFormFieldsText.techCharacteristicsTitle);
        createUnitPage.elements.techCharsTextArea()
            .should("be.visible")
            .and('have.value', '');

        createUnitPage.elements.techCharsTextArea().type("<>{};^");
        createUnitPage.elements.techCharsTextArea().should('have.value', '')

        createUnitPage.elements.techCharsTextArea().type(generateText(9001), {delay: 0});
        createUnitPage.elements.techCharsTextArea()
            .invoke("text")
            .should('have.length', 9000);
    });
    it('C318: Verify description section',  () => {
        createUnitPage.elements.descTitle()
            .should('be.visible')
            .and('contain.text', createUnitFormFieldsText.detailedDescriptionTitle);
        createUnitPage.elements.descTextArea()
            .should("be.visible")
            .and('have.value', '');

        createUnitPage.elements.descTextArea().type("<>{};^");
        createUnitPage.elements.descTextArea().should('have.value', '');

        createUnitPage.elements.descTextArea().type(generateText(9001), {delay: 0});
        createUnitPage.elements.descTextArea()
            .invoke("text")
            .should('have.length', 9000);
    });
    it('C319: Verify vehicle location division',  () => {
        createUnitPage.elements.vehicleLocationTitle()
            .should('be.visible')
            .and("contain.text", createUnitFormFieldsText.vehicleLocationTitle);
        createUnitPage.elements.vehicleLocationRequiredFieldSign().should('be.visible');
        createUnitPage.elements.vehicleLocationMapLbl()
            .should('be.visible')
            .and('have.text', createUnitFormFieldsText.vehicleLocationLabelTitle);

        createUnitPage.elements.nextButton().click();

        createUnitPage.elements.vehicleLocationMapLbl().should('have.css', 'border-color', colors.errorBorderColor);
        createUnitPage.elements.vehicleLocationEmptyMsg().should('be.visible').and('contain.text', errorMessages.vehicleLocationInvalidFieldMsg);

        createUnitPage.elements.vehicleLocationOnMapBtn().click();

        createUnitPage.elements.mapPopupWrapper().should('be.visible');
        createUnitPage.elements.mapPopupTitle()
            .should('be.visible')
            .and('contain.text', createUnitFormFieldsText.mapPopupTitle);
        createUnitPage.elements.mapPopupCloseCross().should('be.visible');
        createUnitPage.elements.mapPopupCityInput().should('be.visible');
        createUnitPage.elements.mapPopupAddress()
            .should('be.visible')
            .and('contain.text', createUnitFormFieldsText.mapPopupDefaultAddress);

        createUnitPage.elements.mapPopupCloseCross().click();

        createUnitPage.elements.vehicleLocationMapLbl().should('have.text', createUnitFormFieldsText.vehicleLocationLabelTitle);

        createUnitPage.elements.vehicleLocationOnMapBtn().click();

        createUnitPage.elements.mapPopupMap().click(200, 150);
        createUnitPage.elements.mapPopupAddress().should('have.text','Київ, Мрії вулиця  Україна, Київська область');

        createUnitPage.elements.mapPopupCloseCross().click();
        createUnitPage.elements.vehicleLocationMapLbl().should('have.text', createUnitFormFieldsText.vehicleLocationLabelTitle);
    })
    it('C326: Verify ""Скасувати"" button', () => {
        createUnitPage.elements.cancelButton()
            .should('be.visible')
            .and('have.text', createUnitFormFieldsText.cancelButtonTitle);

        cy.on('window:confirm', (text) => {
            expect(text).to.equal(
                'Ви впевнені, що хочете перейти на іншу сторінку? Внесені дані не збережуться!'
            );
            return true;
        });
        createUnitPage.elements.cancelButton().click();

        cy.url({ timeout: 10000 }).should('eq', process.env.BASE_URL + '/');

    });
});