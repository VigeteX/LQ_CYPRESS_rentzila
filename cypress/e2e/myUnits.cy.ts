import loginPage from '../pages/LoginPage';
import header from '../pages/HeaderPage';
import units from '../pages/UnitsPage';
import { validUser } from '../fixtures/login.data';
import { routes } from '../constants/routes';
import 'cypress-real-events';
import { categoryLabels, allowedCategories, unitButtons, emptyUnitsTitles, emptyCategoryUnitsTitles } from '../constants/uiTexts';

describe('Login flow', () => {   
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');

        header.elements.enterButton().click();
        loginPage.login(validUser.email, validUser.password)
        header.elements.avatarIcon().should('be.visible');
        
        header.elements.avatarIcon().click();
        header.elements.profileDropdown().should('be.visible');
        header.elements.unitsButton().realHover();
        header.elements.myUnitsButton().click()
        
    });

    it('C321 The "Мої оголошення" page without any created units', () => {
        units.elements.noActiveUnitsLabel().should('be.visible');
        units.elements.emptyBlockButton().click()
        cy.url().should('include', routes.CREATE_UNIT)
    });

    it('C322 Verify that the tabs are clickable.', () => {

        Object.keys(unitButtons).forEach((cat) => {
            units.elements.muiButton().contains(unitButtons[cat]).click()
            cy.get('body').then($body => {
                const $units = $body.find(units.unitCardSelector);
                if ($units.length > 0) {expect($units.length).to.be.greaterThan(0);
                } else {units.elements.emptyUnitsTitle().contains(emptyUnitsTitles[cat]).should('be.visible');}
            });
        });
    });

    it('C323 Check filtering by category', () => {
        
        Object.keys(unitButtons).forEach((tab) => {

            units.elements.muiButton().contains(unitButtons[tab]).click()
            cy.get('body').then($body => {
                const $units = $body.find(units.unitCardSelector);
                if ($units.length > 0) {

                    let lastCategory = categoryLabels.all
                    Object.keys(emptyCategoryUnitsTitles).forEach((cat) => {
                        
                        units.elements.customSelectDropdawn().contains(lastCategory).click()
                        units.elements.customSelectOption().contains(categoryLabels[cat]).click()
                        cy.get('body').then($body => {
                            const $units = $body.find(units.unitCardSelector);
                            if ($units.length > 0) {
                                units.elements.unitCategory().first().invoke('text').then(text => text.trim()).should('match', allowedCategories[cat]);
                            } else {units.elements.emptyUnitsTitle().contains(emptyCategoryUnitsTitles[cat]).should('be.visible');}
                        });
                        lastCategory = categoryLabels[cat]
                    });
                    units.elements.customSelectDropdawn().contains(lastCategory).click()
                    units.elements.customSelectOption().contains(categoryLabels.all).click()

                } else {units.elements.emptyUnitsTitle().contains(emptyUnitsTitles[tab]).should('be.visible');}
            });
        });
    });
});