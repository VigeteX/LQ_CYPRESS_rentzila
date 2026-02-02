import { LoginPage } from '../pages/LoginPage';
import { HeaderPage } from '../pages/HeaderPage';
import { validUser, validPhones, invalidEmails, invalidPasswords, invalidPhones, wrongPassword, errorMessages } from '../fixtures/login.data';

describe('Login flow', () => {
    const loginPage = new LoginPage();
    const header = new HeaderPage();
    
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');
        header.elements.enterButton().click();
    });

    it('C200 Authorization with empty field', () => {
        loginPage.elements.emailField().type(validUser.email).should('have.value', validUser.email);
        loginPage.elements.submitButton().click();
        loginPage.check_error_message(errorMessages.emptyField)

        loginPage.elements.emailField().clear()

        loginPage.elements.passwordField().type(validUser.password).should('have.value', validUser.password);
        loginPage.elements.submitButton().click();
        loginPage.check_error_message(errorMessages.emptyField)
    });
   
    it('C201 Authorization with valid email and password', () => {
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
    });

    describe('C202 Authorization with valid phone and password', () => {
        validPhones.forEach(phone => {
            it(`valid phone: ${phone}`, () => {
                loginPage.login(phone, validUser.password)

                header.elements.avatarIcon().click();
                header.elements.profileDropdown().should('be.visible');
                header.elements.logoutButton().click();
            });
        });
    });

    describe('C203 Authorization with invalid credentials', () => {
        invalidEmails.forEach(email  => {
            it(`invalid email: ${email}`, () => {
                loginPage.login(email, validUser.password)
                loginPage.check_error_message(errorMessages.invalidEmailOrPhone)
                loginPage.elements.authClose().click()
            });
        });

        invalidPasswords.forEach(password  => {
            it(`invalid password: ${password}`, () => {
                loginPage.login(validUser.email, password)
                loginPage.check_error_message(errorMessages.invalidPassword)
                loginPage.elements.authClose().click()
            });
        });
        it('wrong password with valid format', () => {
            loginPage.login(validUser.email,wrongPassword)
            loginPage.elements.errorMessage().should('be.visible').and('have.text', 'Невірний e-mail або пароль')
            loginPage.elements.authClose().click()
        });
    });
    
    describe('C207 Authorization with invalid phone', () => {
        invalidPhones.forEach(phone => {
            it(`invalid phone: ${phone}`, () => {
                loginPage.login(phone, validUser.password)
                loginPage.check_error_message(errorMessages.invalidEmailOrPhone)
                loginPage.elements.authClose().click()
            });
        });
    });
});