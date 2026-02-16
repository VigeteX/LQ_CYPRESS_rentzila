import { HeaderPage } from '../pages/HeaderPage';
import { SearchPage } from '../pages/SearchPage';
import { ProductsPage } from '../pages/ProductsPage';
import {  searchTerms,  specificSymbols,  nonExistingKeyword,  numericQuery,  messages} from '../fixtures/search.data';

describe('Search functionality (C530)', () => {
    const header = new HeaderPage();
    const search = new SearchPage();
    const products = new ProductsPage();

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');
    });

    it('Should display dropdown and navigate to products on Enter with empty input', () => {
        header.elements.searchForm().click();

        search.elements.dropdownHistoryLabel().should('be.visible');
        search.elements.dropdownServicesLabel().should('be.visible');
        search.elements.dropdownCategoriesLabel().should('be.visible');

        cy.get('body').type('{enter}');
        cy.location('pathname').should('eq', '/products/');
        search.elements.searchInput().should('have.value', '');

        products.elements.unitsCountLabel()
            .should('be.visible')
            .invoke('text')
            .then(text => {
                const count = parseInt(text.replace(/\D/g, ''));
                products.elements.units().should('have.length', count);
            });
    });


    describe('Search Tests', () => {
        searchTerms.forEach(term => {
            it(`Should search and navigate correctly for: ${term}`, () => {

                search.elements.searchInput().type(term).type('{enter}');
                cy.location('pathname').should('eq', '/products/');

                products.elements.units().each($el => {

                    cy.wrap($el)
                        .find('[data-testid="unitName"]')
                        .invoke('text')
                        .then(name => {
                            if (name.toLowerCase().includes(term.toLowerCase())) {
                                expect(name).to.match(new RegExp(term, 'i'));
                            }
                        });
                });

                products.elements.units().first().click();
                cy.location('pathname').should('include', '/unit/');

                header.elements.logo().click();
                cy.location('pathname').should('eq', '/');
                header.elements.searchForm().click();

                search.elements.dropdownHistory()
                    .children('div[data-testid="resultItem"]')
                    .contains(term)
                    .should('be.visible');
            });
        });
    });


    it('Handles whitespace input correctly', () => {

        search.elements.searchInput().type('         ');
        search.elements.dropdownHistory()
            .children()
            .should('have.length.at.least', 1);

        search.elements.dropdownServices()
            .should('not.exist');

        search.elements.dropdownCategories()
            .should('not.exist');

        cy.get('body').type('{enter}');
        cy.location('pathname').should('eq', '/products/');

        products.elements.unitsCountLabel()
            .should('contain.text', messages.zeroResults);
    });


    it('Search with numeric query displays correct results', () => {
        const query = numericQuery;
        search.elements.searchInput().type(query).type('{enter}');
        cy.location('pathname').should('eq', '/products/');

        products.elements.units().then($units => {
            const count = $units.length;

            if (count > 0) {
                products.elements.unitsCountLabel()
                    .should('be.visible')
                    .and('contain', `Знайдено ${count}`)
                    .and('contain', query);

                products.elements.units().first().click();
                cy.location('pathname').should('include', '/unit/');
            } else {
                products.elements.units().should('not.exist');
                products.elements.unitsCountLabel()
                    .should('contain.text', messages.zeroResults)
                    .and('contain', query);
            }
        });
    });


    describe('Specific symbols search', () => {
        specificSymbols.forEach(symbol => {
            it(`Handles specific symbol: ${symbol}`, () => {

                search.elements.searchInput().clear().type(symbol);

                search.elements.dropdownSearchResults().then($results => {
                    if ($results.find('div[data-testid="resultItem"]').length > 0) {
                        cy.wrap($results).should('be.visible').and('contain', symbol);
                    } else {
                        cy.wrap($results).find('div[data-testid="resultItem"]').should('not.exist');
                    }
                });

                search.elements.searchInput().type('{enter}');
                cy.location('pathname').should('eq', '/products/');
            });
        });
    });


    it('Search with non-existing keyword', () => {
        const query = nonExistingKeyword;
        search.elements.searchInput().clear().type(query).type('{enter}');

        cy.location('pathname').should('eq', '/products/');
        products.elements.unitsCountLabel().should('contain.text', messages.zeroResults).and('contain', query);
        products.elements.units().should('not.exist');
    });


    it('Navigate via services dropdown (Асфальтування)', () => {

        search.elements.searchInput().clear().type('Асфальтування');
        search.elements.dropdownServices().should('be.visible').contains('Асфальтування').click();
        products.elements.asfaltuvannyaCheckbox().should('exist');
        cy.location('pathname').should('include', '/products/');
    });


    it('Navigate via categories dropdown (Драглайни)', () => {

        search.elements.searchInput().clear().type('Драглайн');
        search.elements.dropdownCategories().should('be.visible').contains('драглайни').click();
        products.elements.draglainiCheckbox().should('exist');
        cy.location('pathname').should('include', '/products/');
    });


    it('Clear search input', () => {
        search.elements.searchInput().clear().type('test');
        search.elements.searchClearButton().click();
        search.elements.dropdownSearchResults().should('not.exist');
        search.elements.searchInput().should('have.value', '');
    });

});