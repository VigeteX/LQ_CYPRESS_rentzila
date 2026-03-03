import { spawn } from 'node:child_process';
import { routes } from '../constants/routes';
export class UnitsPage {
  
  elements ={
    logo:() => cy.get('div[data-testid="logo"]').first(),

    activeUnitsButton:() => cy.get('button').contains('Активні'),
    favouriteUnitsButton:() => cy.get('div[data-testid="variant"]').contains('Обрані оголошення'),
    noFavouriteUnitsLabel:() => cy.get('div[data-testid="title"]').contains('У Вас поки немає обраних оголошень'),
    emptyUnitsTitle:() => cy.get('div[data-testid="title"]'),
    emptyBlockButton:() => cy.get('button[data-testid="emptyBlockButton"]'),
    favouriteButoon:() => cy.get('div[data-testid="favourite"]'),
    searchInput:() => cy.get('input[data-testid="input"]'),
    units:() => cy.get('div[data-testid="unitCard"]'),

    previousPageButton:() => cy.get('a[aria-label="Previous page"]'),
    nextPageButton:() => cy.get('a[aria-label="Next page"]'),
    pageNumber:() => cy.get('a[aria-current="page"]'),

    clearFavouriteUnitsButton:() => cy.get('button[class*="OwnerFavouriteUnitsPage_removeList"]'),
    
    customSelectDropdawn:() => cy.get('div[data-testid="div_CustomSelect"]'),
    customSelectOption:() => cy.get('span[data-testid="span-customSelect"]'),
  }
  
  clearFavouriteUnits(){
    cy.intercept('GET', '**/auth/users/*/favourite-units/').as('getFavs');
    cy.visit(routes.OWNER_FAVORITE_UNITS);
    cy.wait('@getFavs', { timeout: 10000 });
    const selector = 'button[class*="OwnerFavouriteUnitsPage_removeList"]';

    cy.get('body').then(($body) => {
        if ($body.find(selector).length > 0) {
            this.elements.clearFavouriteUnitsButton().click();
            cy.get('button[class*="ItemButtons_darkBlueBtn"]').contains('Так').click();
            this.elements.clearFavouriteUnitsButton().should('not.exist');
        }
    });
  }
}

export default new UnitsPage();