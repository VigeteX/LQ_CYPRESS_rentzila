class ProductsPage {
  
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
    preloader:()=> cy.get('div[data-testid="preloader"]'),
    loading:()=> cy.get('div[class*="MapPagination_loading"]'),
    unitsContainer:()=> cy.get('div[class*="MapPagination_units_container"]'),
  }
  
  addUnits(amount: number) {
    cy.reload();
    this.elements.preloader().should('not.exist');
    this.elements.units().should('have.length.greaterThan', 0);
    const processUnit = (index: number) => {
      if (index >= amount) return;
      this.elements.units().then($list => {
        if ($list.length <= index) {
          this.elements.unitsContainer().scrollTo('bottom');
          this.elements.units().should('have.length.greaterThan', $list.length);
          return processUnit(index);
        }
        cy.wrap($list[index]).within(() => {
          const clickUntilFilled = () => {
            this.elements.favouriteButoon().then($btn => {
              cy.wrap($btn).click({ force: true });
              cy.wrap($btn).find('path').last().then($path => {
                const fill = $path.attr('fill');
                if (!fill || fill === 'none') {
                  clickUntilFilled();
                }
              });
            });
          };
          this.elements.favouriteButoon().find('path').last().then($path => {
            const fill = $path.attr('fill');
            if (!fill || fill === 'none') {
              clickUntilFilled();
            }
          });
        }).then(() => {
          processUnit(index + 1);
        });
      });
    };
    processUnit(0);
  }
}
export default new ProductsPage();