export class ProductsPage {
  
  elements ={
    units:() => cy.get('div[data-testid="cardWrapper"]'),
    unitsCountLabel:() => cy.get('h1').contains('Знайдено'),

    draglainiCheckbox:() => cy.get('div[data-testid="draglaini"]'),
    asfaltuvannyaCheckbox:() => cy.get('div[data-testid="asfaltuvannya"]'),
  }
}
export default new ProductsPage();