import header from '../pages/HeaderPage';
import cabinet from '../pages/CabinetPage';
import loginPage from '../pages/LoginPage';
import { validUser, account } from '../fixtures/login.data';
import { titles, titles2, valoues, invalidInn, innExpect, invalidEDRPOU, EDRPOUExpect, cabinetOwnerTyps, cabinetLegalOwnerTyps } from '../fixtures/cabinet.data';
import { routes } from '../constants/routes';
import { cabinetPlaceholders, commonPlaceholders, errorMessages } from '../constants/uiTexts';
import 'cypress-real-events';

describe('Login flow', () => {   
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');

        header.elements.enterButton().click();
        loginPage.login(validUser.email, validUser.password)
        header.elements.avatarIcon().should('be.visible');
        cy.visit(routes.OWNER_CABINET);
        header.elements.preloader().should('not.exist');
        cabinet.elements.customInput().eq(0).clear().type(account.inn)
        cabinet.elements.nextButton().click()
    });

    it('C492 Verify contact card block, with filled personal info account', () => {
        
        cabinet.elements.ownerTypeLabel().should('contain', cabinetPlaceholders.type)
        cabinet.elements.customSelect().should('contain', account.ownerType);
        
        cabinet.elements.phoneLabel().should('contain', commonPlaceholders.phone2)
        cabinet.elements.phoneInput().should('have.value', cabinetPlaceholders.phone)
        
        cabinet.elements.viberLabel().should('contain', commonPlaceholders.viber)
        cabinet.elements.viberInput().should('have.attr', 'placeholder', cabinetPlaceholders.viber)
        
        cabinet.elements.verificationText().should('contain', cabinetPlaceholders.verification)

        cy.wrap(titles).each((text:string, i: number) => {
            cabinet.elements.customInputTitle().eq(i).should('contain', text)
            cabinet.elements.customInput().eq(i).should('have.value', valoues[i]);
        });

        cy.wrap(invalidInn).each((text: string, i: number) => {
            cabinet.elements.customInput().eq(0).clear().type(text).should('have.value', innExpect[i])
            cabinet.elements.nextButton().click()
            if (i == 0){cabinet.elements.error().should('contain', errorMessages.atLeastTen)}
        });

        cy.wrap(cabinetOwnerTyps).each((text: string) => {
            cabinet.elements.customSelect().eq(0).click()
            cabinet.elements.customSelectOption().contains(text).click()
            cabinet.elements.customSelect().eq(0).should('contain', text);
        });

        cy.wrap(titles2).each((text:string, i: number) => {
            cabinet.elements.customInputTitle().eq(i).should('contain', text)
        });

        cy.wrap(cabinetLegalOwnerTyps).each((text: string) => {
            cabinet.elements.customSelect().eq(1).click()
            cabinet.elements.customSelectOption().contains(text).click()
            cabinet.elements.customSelect().eq(1).should('contain', text);
        });
        
        cabinet.elements.nextButton().click()
        cabinet.elements.error().eq(0).should('contain', errorMessages.required)
        cabinet.elements.error().eq(1).should('contain', errorMessages.required)

        cy.wrap(invalidEDRPOU).each((text: string, i: number) => {
            cabinet.elements.customInput().eq(0).clear().type(text).should('have.value', EDRPOUExpect[i])
            if (i != 0){cabinet.elements.error().should('contain', errorMessages.required)}
        });
        cabinet.elements.customInput().eq(0).clear().type(account.inn)
        cabinet.elements.error().eq(1).should('not.exist')
    });
    afterEach(() => {
        cabinet.elements.customSelect().eq(0).click()
        cabinet.elements.customSelectOption().contains(account.ownerType).click()
        cabinet.elements.customInput().eq(0).clear().type(account.inn)
        cabinet.elements.nextButton().click()
    });

});