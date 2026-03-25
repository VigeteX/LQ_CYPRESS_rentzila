import { spawn } from 'node:child_process';
import { routes } from '../constants/routes';
class UnitsPage {
  readonly unitCardSelector = 'div[data-testid="unitCard"]';

  elements ={
    logo:() => cy.get('div[data-testid="logo"]').first(),

    activeUnitsButton:() => cy.get('button').contains('Активні'),
    favouriteUnitsButton:() => cy.get('div[data-testid="variant"]').contains('Обрані оголошення'),
    noFavouriteUnitsLabel:() => cy.get('div[data-testid="title"]').contains('У Вас поки немає обраних оголошень'),
    noActiveUnitsLabel:() => cy.get('div[data-testid="title"]').contains('У Вас поки немає активних оголошень'),
    emptyUnitsTitle:() => cy.get('div[data-testid="title"]'),
    
    emptyBlockButton:() => cy.get('button[data-testid="emptyBlockButton"]'),
    favouriteButoon:() => cy.get('div[data-testid="favourite"]'),
    searchInput:() => cy.get('input[data-testid="input"]'),
    units:() => cy.get('div[data-testid="unitCard"]'),

    previousPageButton:() => cy.get('a[aria-label="Previous page"]'),
    nextPageButton:() => cy.get('a[aria-label="Next page"]'),
    pageNumber:() => cy.get('a[aria-current="page"]'),

    clearFavouriteUnitsButton:() => cy.get('button[class*="OwnerFavouriteUnitsPage_removeList"]'),
    popup:() => cy.get('div[class*="PopupLayout_content"]'),
    darkBlueBtn:() => cy.get('button[class*="ItemButtons_darkBlueBtn"]').contains('Так'),
    lightRedBtn:() => cy.get('button[class*="ItemButtons_lightRedBtn"]').contains('Скасувати'),
    popupCrossIcon:() => cy.get('div[class*="PopupLayout_content"]').find('svg[data-testid="crossIcon"]'),
   
    customSelectDropdawn:() => cy.get('div[data-testid="div_CustomSelect"]'),
    customSelectOption:() => cy.get('span[data-testid="span-customSelect"]'),

    showMoreButton:() => cy.get('button[data-testid="showMore"]'),
    
    muiButton:() => cy.get('button[class*="MuiButtonBase-root"]'),
    unitCategory:() => cy.get('div[class*="OwnerUnitCard_category"]'),
  }
  
  clearFavouriteUnits(){
    cy.intercept('GET', '**/auth/users/*/favourite-units/').as('getFavs');
    cy.visit(routes.OWNER_FAVORITE_UNITS);
    cy.wait('@getFavs', { timeout: 10000 });
    const selector = 'button[class*="OwnerFavouriteUnitsPage_removeList"]';

    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        this.elements.clearFavouriteUnitsButton().click();
        this.elements.darkBlueBtn().click();
        this.elements.clearFavouriteUnitsButton().should('not.exist');
        this.elements.units().should('not.exist');
      }
    });
  }
  clickNext(times: number){
    if (times === 0) return;
    this.elements.nextPageButton().should('be.visible').click().then(() => {
      this.clickNext(times - 1);
    });
  };

  loadAllUnits(unitSelector: string = 'div[class*="OwnerUnitCard"]') {
    cy.get('body').then($body => {
      const $button = $body.find('button[data-testid="showMore"]');
      if ($button.length === 0) return;

      cy.get(unitSelector).its('length').then(prevCount => {
        cy.get('button[data-testid="showMore"]').click();

        cy.get(unitSelector, { timeout: 10000 }).should($cards => {
          expect($cards.length).to.be.greaterThan(prevCount);
        }).then(() => {
          this.loadAllUnits(unitSelector);
        });
      });
    });
  }
}


export default new UnitsPage();