import loginPage from '../pages/LoginPage';
import header from '../pages/HeaderPage';
import units from '../pages/UnitsPage';
import products from '../pages/ProductsPage';
import { validUser } from '../fixtures/login.data';
import { routes } from '../constants/routes';
import 'cypress-real-events';
import { spaceInputs, specificSymbols2, nonExistingKeyword} from '../fixtures/search.data';
import { unitsPlaceholders, messages, categoryLabels, allowedCategories } from '../constants/uiTexts';

describe('Login flow', () => {   
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');

        header.elements.enterButton().click();
        loginPage.login(validUser.email, validUser.password)
        header.elements.avatarIcon().should('be.visible');
        units.clearFavouriteUnits()
    });

    it('C300 The "Обрані оголошення" page without "Обрані" units', () => {
        cy.visit(routes.OWNER_FAVORITE_UNITS);
        units.elements.favouriteUnitsButton().click()
        units.elements.noFavouriteUnitsLabel().should('be.visible')
        units.elements.emptyBlockButton().should('be.visible')
        units.elements.emptyBlockButton().click()
        cy.url().should('include', routes.PRODUCTS)
        header.elements.productsButton().should('have.attr', 'class').and('contain', 'Navbar_active');
    });
    
    it('C302 "Обрані" icon functionality', () => {
        header.elements.productsButton().should("be.visible")
        header.elements.productsButton().first().click()
        cy.url().should('include', routes.PRODUCTS)

        let unitHref;
        products.elements.units().first().within(() => {
            products.elements.unitLink().invoke('attr', 'href').then((href) => {
                unitHref = href; 
            });
            products.elements.favouriteButoon().click();
            products.elements.favouriteButoon().find('path').last().should('have.attr', 'fill');
        });

        header.elements.avatarIcon().click()
        header.elements.profileDropdown().should('be.visible');
        header.elements.unitsButton().realHover();
        header.elements.myUnitsButton().click()
        cy.url().should('include', routes.OWNER_UNITS_PAGE)
        
        cy.then(() => {
            units.elements.favouriteUnitsButton().click()
            cy.get(`a[href="${unitHref}"]`).should('be.visible').closest('div[data-testid="unitCard"]').should('exist').within(() => {
                units.elements.favouriteButoon().click()
            });
            cy.get(`a[href="${unitHref}"]`).should('not.exist');
        });

        units.elements.noFavouriteUnitsLabel().should('be.visible')
        units.elements.emptyBlockButton().should('be.visible')

        header.elements.productsButton().should("be.visible")
        header.elements.productsButton().first().click()
        cy.url().should('include', routes.PRODUCTS)

        cy.then(() => {
            cy.get(`a[href="${unitHref}"]`).closest('div[data-testid="cardWrapper"]').within(() => {
                products.elements.favouriteButoon().find('path').last().should('not.have.attr', 'fill');
            });
        });
    });

    it('C305 "Пошук по назві" search field functionality', () => {
        cy.visit(routes.PRODUCTS);
        products.addUnits(3)
        header.elements.avatarIcon().click();
        header.elements.profileDropdown().should('be.visible');
        header.elements.unitsButton().realHover();
        header.elements.myUnitsButton().click()
        units.elements.favouriteUnitsButton().click()
        
        units.elements.searchInput().click()
        cy.get('body').type('{enter}');
        units.elements.units().should('be.visible')


        spaceInputs.forEach(input => {
            units.elements.searchInput().first().clear()
            .should('have.attr', 'placeholder', unitsPlaceholders.unitTitle)
            .type(input)
            .should('have.value', input);
        });
        
        units.elements.emptyBlockButton().click()
        units.elements.units().should('be.visible')

        units.elements.searchInput().first().clear().type('16')
        units.elements.emptyUnitsTitle().contains(messages.noUnitsByName("16")).should('exist')

        specificSymbols2.forEach(input => {
            units.elements.searchInput().first().clear().type(input).should('have.value', input);
            units.elements.emptyUnitsTitle().contains(messages.noUnitsByName(input)).should('exist')
        });
        
        units.elements.searchInput().first().clear().type(nonExistingKeyword).should('have.value', nonExistingKeyword);
        units.elements.emptyUnitsTitle().contains(messages.noUnitsByName(nonExistingKeyword)).should('exist')
        units.elements.searchInput().first().clear()

        let savedName: string;;
        units.elements.units().first().find('div[class*="OwnerUnitCard_name"]').invoke('text').then((t) => {
            savedName = t.trim();
        });
        cy.then(() => {
            units.elements.searchInput().first().clear().type(savedName).should('have.value', savedName);
            cy.contains('div[class*="OwnerUnitCard_name"]', savedName).should('be.visible');
        });
    });

    it('C311 Check the pagination on the "Обрані оголошення" page', () => {
        header.elements.avatarIcon().click();
        header.elements.profileDropdown().should('be.visible');
        header.elements.unitsButton().realHover();
        header.elements.myUnitsButton().click()
        units.elements.favouriteUnitsButton().click()
        
        cy.visit(routes.PRODUCTS);
        products.addUnits(56) 
        cy.visit(routes.OWNER_FAVORITE_UNITS);

        const currentPage: string = 'is your current page'
        units.elements.previousPageButton().click()
        units.elements.pageNumber().contains('1').should('be.visible').should('have.attr', 'aria-label').and('include', currentPage);
        units.elements.previousPageButton().should('have.attr', 'aria-disabled').and('eq', 'true')

        units.elements.nextPageButton().click()
        units.elements.pageNumber().contains('2').should('be.visible').should('have.attr', 'aria-label').and('include', currentPage);

        units.elements.nextPageButton().click()
        units.elements.pageNumber().contains('3').should('be.visible').should('have.attr', 'aria-label').and('include', currentPage);
        
        units.elements.previousPageButton().click()
        units.elements.pageNumber().contains('2').should('be.visible').should('have.attr', 'aria-label').and('include', currentPage);
    
        units.elements.previousPageButton().click()
        units.elements.pageNumber().contains('1').should('be.visible').should('have.attr', 'aria-label').and('include', currentPage);

        units.clickNext(11);

        units.elements.pageNumber().contains('12').should('be.visible').should('have.attr', 'aria-label').and('include', currentPage);
    });

    it('C315 "Всі категорії" dropdown menu functionality', () => {
        cy.intercept('*', (req) => {
            console.log(req.method, req.url);
        });

        const categories = [
            { url: routes.BUDIVELNA_TEKHNIKA, selector: products.elements.constructionEquipmentCategory },
            { url: routes.KOMUNALNA_TEKHNIKA, selector: products.elements.municipalEquipmentCategory },
            { url: routes.SKLADSKA_TEKHNIKA, selector: products.elements.warehouseEquipmentCategory }
        ];

        cy.visit(routes.PRODUCTS);
        categories.forEach((cat) => {
            products.elements.resetFilters().click();
            products.elements.unitsCountLabel().then(($h1) => {
                const oldCount = $h1.text();
                cat.selector().click();
                cy.url().should('include', cat.url);
                
                products.elements.unitsCountLabel().should(($h1Next) => {
                    expect($h1Next.text()).to.not.equal(oldCount);
                });

                products.addUnits(2);
            });
        });

        header.elements.avatarIcon().should('be.visible');
        header.elements.avatarIcon().click();
        header.elements.profileDropdown().should('be.visible');
        header.elements.unitsButton().realHover();
        header.elements.myUnitsButton().click()
        units.elements.favouriteUnitsButton().click()

        units.elements.customSelectDropdawn().contains(categoryLabels.all).should('be.visible')

        let pagesCount;
        units.elements.units().then(($pages) => {
            pagesCount = $pages.length;
        });
        cy.then(() => {
            units.elements.customSelectDropdawn().contains(categoryLabels.all).click()
            units.elements.customSelectOption().contains(categoryLabels.construction).click()
            units.elements.units().should('have.length.lessThan', pagesCount)
        });
        units.elements.units().first().click()
        cy.url().should('include', routes.UNIT)

        cy.visit(routes.OWNER_FAVORITE_UNITS);
        cy.url().should('include', routes.OWNER_FAVORITE_UNITS)
        cy.then(() => {
            units.elements.customSelectDropdawn().contains(categoryLabels.all).click()
            units.elements.customSelectOption().contains(categoryLabels.municipal).click()
            units.elements.units().should('have.length.lessThan', pagesCount)
        });

        units.elements.units().first().click()
        cy.url().should('include', routes.UNIT)
        
        products.elements.secondCategorySpan().first().invoke('text').then(text => text.trim()).should('match', allowedCategories.municipal);

        cy.visit(routes.OWNER_FAVORITE_UNITS);
        cy.url().should('include', routes.OWNER_FAVORITE_UNITS)
        cy.then(() => {
            units.elements.customSelectDropdawn().contains(categoryLabels.all).click()
            units.elements.customSelectOption().contains(categoryLabels.warehouse).click()
            units.elements.units().should('have.length.lessThan', pagesCount)
        });
    
        units.elements.units().first().click()
        cy.url().should('include', routes.UNIT)

        products.elements.secondCategorySpan().first().invoke('text').then(text => text.trim()).should('match', allowedCategories.warehouse); 

        cy.visit(routes.OWNER_FAVORITE_UNITS);
        cy.url().should('include', routes.OWNER_FAVORITE_UNITS)
        cy.then(() => {
            units.elements.customSelectDropdawn().contains(categoryLabels.all).click()
            units.elements.customSelectOption().contains(categoryLabels.all).click()
            units.elements.units().should('have.length', pagesCount)
        });
    });
});