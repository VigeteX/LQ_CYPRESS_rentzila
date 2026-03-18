import loginPage from '../pages/LoginPage';
import header from '../pages/HeaderPage';
import units from '../pages/UnitsPage';
import { validUser, validPhones, invalidEmails, invalidPasswords, invalidPhones, wrongPassword } from '../fixtures/login.data';
import { authErrorMessages } from '../constants/uiTexts';
import 'cypress-real-events';

describe('Login flow', () => {   
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');
    });



    it('Preconditions C201 Authorization with valid email and password', () => {
        header.elements.enterButton().click();

        loginPage.elements.emailField().type(validUser.email).should('have.value', validUser.email);
        loginPage.elements.passwordField().type(validUser.password).should('have.value', validUser.password);;

        loginPage.elements.hidePassworIcon().click();
        loginPage.elements.passwordField().should('have.attr', 'type', 'text');
        loginPage.elements.hidePassworIcon().click();
        loginPage.elements.passwordField().should('have.attr', 'type', 'password');

        loginPage.elements.submitButton().click();

        header.elements.avatarIcon().click();
        header.elements.profileDropdown().should('be.visible');
        header.elements.profileDropdownEmail().should('be.visible');
        header.elements.profileDropdownEmail().should('have.text', validUser.email);

        header.elements.unitsButton().realHover();
        header.elements.myUnitsButton().click()

        units.elements.activeUnitsButton().click()
        cy.get('body').type('{enter}');

    });
});
