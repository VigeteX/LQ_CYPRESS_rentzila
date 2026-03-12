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

    // it('Deactivate active unit and verify in admin panel', () => {

    //     // Берём первый активный юнит
    //     cy.get('[data-testid="activeUnitCard"]').first().as('activeUnit');

    //     // Сохраняем ID (если есть)
    //     cy.get('@activeUnit')
    //         .invoke('attr', 'data-id')
    //         .as('unitId');

    //     // STEP 1 — нажать "Деактувувати"
    //     cy.get('@activeUnit')
    //         .contains('Деактувувати')
    //         .should('be.visible')
    //         .and('be.enabled')
    //         .click();

    //     cy.contains('Підтвердження').should('be.visible');

    //     // STEP 2 — закрыть крестиком
    //     cy.get('[data-testid="modalClose"]').click();
    //     cy.contains('Активні').should('be.visible');

    //     // STEP 3 — повторить и нажать "Скасувати"
    //     cy.get('@activeUnit').contains('Деактувувати').click();
    //     cy.contains('Скасувати').click();
    //     cy.contains('Активні').should('be.visible');

    //     // STEP 4 — подтвердить
    //     cy.get('@activeUnit').contains('Деактувувати').click();
    //     cy.contains('Так').click();

    //     cy.contains('успішно деактивовано').should('be.visible');

    //     // STEP 5 — закрыть сообщение
    //     cy.get('[data-testid="toastClose"]').click();

    //     // STEP 6 — юнита нет в "Активні"
    //     cy.get('@unitId').then((id) => {
    //         if (id) {
    //             cy.get('[data-testid="activeUnitCard"]')
    //                 .should('not.have.attr', 'data-id', id);
    //         } else {
    //             cy.contains('У Вас поки немає активних оголошень')
    //                 .should('be.visible');
    //         }
    //     });

    //     // STEP 7 — проверить во вкладке "Деактивовані"
    //     cy.contains('Деактивовані').click();

    //     cy.get('@unitId').then((id) => {
    //         if (id) {
    //             cy.get('[data-testid="deactivatedUnitCard"]')
    //                 .should('have.attr', 'data-id', id);
    //         }
    //     });

    //     // STEP 8 — logout
    //     cy.openUserDropdown();
    //     cy.contains('Вихід').click();

    //     cy.url().should('eq', 'https://letkabackend.click/');
    // });

    // it('Verify in admin panel', () => {

    //     cy.loginByEmail(Cypress.env('ADMIN_EMAIL'), Cypress.env('ADMIN_PASSWORD'));

    //     cy.get('[data-testid="adminGear"]').click();
    //     cy.contains('Оголошення').click();
    //     cy.contains('Деактивoвані').click();

    //     cy.get('@unitId').then((id) => {
    //         if (id) {
    //             cy.get('input[type="search"]').type(id);
    //             cy.contains(id).should('be.visible');
    //         }
    //     });

    // });

});