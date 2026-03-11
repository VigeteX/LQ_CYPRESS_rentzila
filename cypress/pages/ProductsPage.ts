import { routes } from '../constants/routes';
export class ProductsPage {
  
  elements ={
    units:() => cy.get('div[data-testid="cardWrapper"]'),
    unitsCountLabel:() => cy.get('h1[class*="MapPagination_count"]'),

    draglainiCheckbox:() => cy.get('div[data-testid="draglaini"]'),
    asfaltuvannyaCheckbox:() => cy.get('div[data-testid="asfaltuvannya"]'),

    favouriteButoon:() => cy.get('div[data-testid="favourite"]'),
    unitLink:() => cy.get('a[data-testid="link"]'),
    
    resetFilters:() => cy.get('div[data-testid="resetFilters"]'),
    constructionEquipmentCategory:() => cy.get('div[data-testid="list__budivelna-tekhnika"]'),
    municipalEquipmentCategory:() => cy.get('div[data-testid="list__komunalna-tekhnika"]'),
    warehouseEquipmentCategory:() => cy.get('div[data-testid="list__skladska-tekhnika"]'),

    constructionEquipment:() => cy.get('div[data-testid="budivelna-tekhnika"]'),
    municipalEquipment:() => cy.get('div[data-testid="komunalna-tekhnika"]'),
    warehouseEquipment:() => cy.get('div[data-testid="skladska-tekhnika"]'),

    secondCategorySpan:() => cy.get('span[data-testid="secondCategorySpan"]'),
    
  }
  addUnits(amount: number){
    this.elements.units().should('have.length.greaterThan', 0).then(() => {
      this.addUnitsRecursive(amount, 0);
    });
  }
  private addUnitsRecursive(amount: number, index: number): void {
    if (index >= amount) return;

    this.elements.units().eq(index).within(() => {
      this.elements.favouriteButoon().find('path').last().then(($path) => {
        if (!$path.attr('fill')) {
          this.elements.favouriteButoon().click();
          this.elements.favouriteButoon().find('path').last().should('have.attr', 'fill');
        }
      });
    }).then(() => {
      this.addUnitsRecursive(amount, index + 1);
    });
  }
}
export default new ProductsPage();