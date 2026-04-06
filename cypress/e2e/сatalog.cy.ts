import header from '../pages/HeaderPage';
import search from '../pages/SearchPage';
import products from '../pages/ProductsPage';
import { searchTerms, specificSymbols, nonExistingKeyword, numericQuery} from '../fixtures/search.data';
import { routes } from '../constants/routes';
import { searchMessages } from '../constants/uiTexts';

describe('Verify ""Каталог"" (C559)', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');
    });
});