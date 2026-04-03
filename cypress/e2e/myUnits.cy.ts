import loginPage from '../pages/LoginPage';
import header from '../pages/HeaderPage';
import units from '../pages/UnitsPage';
import { validUser } from '../fixtures/login.data';
import { routes } from '../constants/routes';
import 'cypress-real-events';
import { categoryLabels, allowedCategories, unitButtons, emptyUnitsTitles, emptyCategoryUnitsTitles, sortLabels, messages } from '../constants/uiTexts';
import { unitSearch } from '../fixtures/search.data';

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
        cy.wrap(Object.keys(unitButtons)).each((cat: keyof typeof unitButtons) => {
            units.elements.muiButton().contains(unitButtons[cat]).click();
            cy.get('body').then($body => {
                if ($body.find(units.unitCardSelector).length) {
                    cy.get(units.unitCardSelector).should('have.length.greaterThan', 0);
                } else {
                    units.elements.emptyUnitsTitle().contains(emptyUnitsTitles[cat]).should('be.visible');
                }
            });
        });
    });

    it('C323 Check filtering by category', () => {
        cy.wrap(Object.keys(unitButtons)).each((tab: keyof typeof unitButtons) => {
            units.elements.muiButton().contains(unitButtons[tab]).click();
            cy.get('body').then($body => {
                const $units = $body.find(units.unitCardSelector);
                if ($units.length > 0) {
                    let lastCategory = categoryLabels.all;
                    cy.wrap(Object.keys(emptyCategoryUnitsTitles)).each((cat: keyof typeof emptyCategoryUnitsTitles) => {
                        units.elements.customSelectDropdawn().contains(lastCategory).click();
                        units.elements.customSelectOption().contains(categoryLabels[cat]).click();
                        cy.get('body').then($body => {
                            const $units = $body.find(units.unitCardSelector);
                            if ($units.length > 0) {
                                units.elements.unitCategory().first().invoke('text').then(text => {
                                    expect(text.trim()).to.match(allowedCategories[cat]);
                                });
                            } else {
                                units.elements.emptyUnitsTitle().contains(emptyCategoryUnitsTitles[cat]).should('be.visible');
                            }
                        });
                        lastCategory = categoryLabels[cat];
                    }).then(() => {
                        units.elements.customSelectDropdawn().contains(lastCategory).click();
                        units.elements.customSelectOption().contains(categoryLabels.all).click();
                    });
                } else {units.elements.emptyUnitsTitle().contains(emptyUnitsTitles[tab]).should('be.visible');}
            });
        });
    });

    it('C324 Check sorting units', () => {
        units.elements.muiButton().contains(unitButtons.waiting).click();

        units.elements.customSelectDropdawn().contains(sortLabels.data).click();
        units.elements.customSelectOption().contains(sortLabels.name).click()
        units.elements.customSelectDropdawn().contains(sortLabels.name).should('be.visible')
        
        units.loadAllUnits()

        const names: string[] = [];
        units.elements.units().each(($card) => {
        cy.wrap($card).find('div[class*="OwnerUnitCard_name"]').invoke('text').then((text) => names.push(text.trim()));
        }).then(() => {
            const sorted = [...names].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
            expect(names).to.deep.equal(sorted);
        });

        units.elements.customSelectDropdawn().contains(sortLabels.name).click()
        units.elements.customSelectOption().contains(sortLabels.data).click()
        units.elements.customSelectDropdawn().contains(sortLabels.data).should('be.visible')
        
        const dates: string[] = [];
        units.elements.units().each(($card) => {
        cy.wrap($card).find('div[class*="OwnerUnitCard_dateWithDot"]').invoke('text').then((text) => dates.push(text.trim()));
        }).then(() => {
            const cleanDate = (raw: string) => raw.replace(/^[^\d]+/, '');
            const parseDate = (dateStr: string): number => {
                const cleaned = cleanDate(dateStr);
                const [day, month, year] = cleaned.split('.').map(Number);
                return new Date(year, month - 1, day).getTime();
            };
            const sortedDesc = [...dates].sort((a, b) => parseDate(b) - parseDate(a));
            expect(dates).to.deep.equal(sortedDesc);
        });
    });

    it('C325 "Заголовок оголошення" search field functionality.', () => {
        units.elements.muiButton().contains(unitButtons.waiting).click();
        units.elements.searchInput().type('{enter}');
        units.elements.units().should('have.length.greaterThan', 0);

        cy.wrap(Object.keys(unitButtons)).each((tab: keyof typeof unitButtons) => {
            units.elements.muiButton().contains(unitButtons[tab]).click();
            cy.get('body').then($body => {
                const $units = $body.find(units.unitCardSelector);
                if ($units.length > 0) {
                    cy.wrap(unitSearch).each((text: string) => {
                        cy.wrap(text.split('')).each((letter: string) => {
                            units.elements.searchInput().type(letter).invoke('val').then((currentValue: any) => {
                                const typedSoFar = (currentValue as string).toLowerCase();
                                cy.get('body').then($body => {
                                    const $units = $body.find(units.unitCardSelector);
                                    if ($units.length > 0) {
                                        units.elements.units().each(($card) => {
                                            cy.wrap($card).find('div[class*="OwnerUnitCard_name"]').invoke('text').then((elementText) => {
                                                const lowText = elementText.toLowerCase();
                                                expect(lowText).to.contain(typedSoFar);
                                            });
                                        })
                                    } else {units.elements.emptyUnitsTitle().contains(messages.noUnitsByName(currentValue)).should('exist')}
                                });
                            });
                        });
                        cy.wrap(text.split('')).each(() => {
                            units.elements.searchInput().type('{backspace}').invoke('val').then((currentValue: any) => {
                                const typedSoFar = (currentValue as string).toLowerCase();
                                cy.get('body').then($body => {
                                    const $units = $body.find(units.unitCardSelector);
                                    if ($units.length > 0) {
                                        units.elements.units().each(($card) => {
                                            cy.wrap($card).find('div[class*="OwnerUnitCard_name"]').invoke('text').then((elementText) => {
                                                const lowText = elementText.toLowerCase();
                                                expect(lowText).to.contain(typedSoFar);
                                            });
                                        })
                                    } else {units.elements.emptyUnitsTitle().contains(messages.noUnitsByName(currentValue)).should('exist')}
                                });
                            });
                        });
                        units.elements.units().should('have.length.greaterThan', 0);
                        units.elements.searchInput().should('have.value', '');
                    });
                } else {units.elements.emptyUnitsTitle().contains(emptyUnitsTitles[tab]).should('be.visible');}
            });
        });
    });
});