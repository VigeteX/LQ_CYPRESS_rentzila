export class SearchPage {
  
  elements ={
    searchForm:() => cy.get('div[data-testid="searchForm"]').first(),
    searchInput:() => cy.get('input[data-testid="searchInput"]').first(),

    searchDropdown:() => cy.get('div[data-testid="searchDropdown"]'),

    dropdownHistoryLabel:() => cy.get('h6').contains('Історія пошуку'),
    dropdownServicesLabel:() => cy.get('h6').contains('Послуги'),
    dropdownCategoriesLabel:() => cy.get('h6').contains('Категорії'),
    
    dropdownHistory:() => cy.get('h6').contains('Історія пошуку').next('div'),
    dropdownServices:() => cy.get('h6').contains('Послуги').next('div'),
    dropdownCategories:() => cy.get('h6').contains('Категорії').next('div'),
    
    dropdownSearchResults:() => cy.get('div[data-testid="rightsideUnits"]'),
    
    searchClearButton:() => cy.get('div[data-testid="searchClear"]').first(),
  }
}