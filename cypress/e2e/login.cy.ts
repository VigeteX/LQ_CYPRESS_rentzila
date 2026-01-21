import { LoginPage } from '../pages/LoginPage';
import { HeaderPage } from '../pages/HeaderPage';
import { validUser, validPhones, invalidEmails, invalidPasswords, invalidPhones, wrongPassword } from '../fixtures/login.data';

describe('Login flow', () => {
    const loginPage = new LoginPage();
    const header = new HeaderPage();
    
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');
    });

    it('C200', () => {
        header.elements.enterButton().click();

        loginPage.elements.emailField().type(validUser.email).should('have.value', validUser.email);
        loginPage.elements.submitButton().click();
        loginPage.check_error_message('Поле не може бути порожнім')

        loginPage.elements.emailField().clear()

        loginPage.elements.passwordField().type(validUser.password).should('have.value', validUser.password);
        loginPage.elements.submitButton().click();
        loginPage.check_error_message('Поле не може бути порожнім')
    });
   
    it('C201 Authorization with valid email and password', () => {
        header.elements.enterButton().click();

        loginPage.elements.emailField().type(validUser.email).should('have.value', validUser.email);
        loginPage.elements.passwordField().type(validUser.password).should('have.value', validUser.password);;

        loginPage.elements.hidepassworIcon().click();
        loginPage.elements.passwordField().should('have.attr', 'type', 'text');
        loginPage.elements.hidepassworIcon().click();
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
                header.elements.enterButton().click();
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
                header.elements.enterButton().click();
                loginPage.login(email, validUser.password)
                loginPage.check_error_message('Неправильний формат email або номера телефону')
                loginPage.elements.authClose().click()
            });
        });

        invalidPasswords.forEach(password  => {
            it(`invalid password: ${password}`, () => {
                header.elements.enterButton().click();
                loginPage.login(validUser.email, password)
                loginPage.check_error_message('Пароль повинен містити як мінімум 1 цифру, 1 велику літеру і 1 малу літеру, також не повинен містити кирилицю та пробіли')
                loginPage.elements.authClose().click()
            });
        });
        it('wrong password with valid format', () => {
            header.elements.enterButton().click();
            loginPage.login(validUser.email,wrongPassword)
            loginPage.elements.errorMessage().should('be.visible').and('have.text', 'Невірний e-mail або пароль')
            loginPage.elements.authClose().click()
        });
    });
    
    describe('C207 Authorization with invalid phone', () => {
        invalidPhones.forEach(phone => {
            it(`invalid phone: ${phone}`, () => {
                header.elements.enterButton().click();
                loginPage.login(phone, validUser.password)
                loginPage.check_error_message('Неправильний формат email або номера телефону')
                loginPage.elements.authClose().click()
            });
        });
    });
});