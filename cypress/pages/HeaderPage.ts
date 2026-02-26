export class HeaderPage {
  
  elements ={
    enterButton:() => cy.get('div').contains("Вхід"),
    avatarIcon:() => cy.get('div[data-testid="avatarBlock"]'),
    profileDropdown:() => cy.get('div[data-testid="email"]').closest('div'),
    profileDropdownEmail:() => cy.get('div[data-testid="email"]'),
    logoutButton:() => cy.get('div[data-testid="logout"]'),

    servicesSection:() => cy.get('section[data-testid="services"]'),
    servicesSectionTitle:() => cy.get('section[data-testid="services"]').find('h2[data-testid="title"]'),
    servicesSectionCategoriesList:() => cy.get('section[data-testid="services"]').children('div').eq(0),
    servicesSectionProposesList:() => cy.get('section[data-testid="services"]').children('div').eq(1),
    
    equipmentSection:() => cy.get('section[data-testid="specialEquipment"]'),
    equipmentSectionTitle:() => cy.get('section[data-testid="specialEquipment"]').find('h2[data-testid="title"]'),
    equipmentSectionCategoriesList:() => cy.get('section[data-testid="specialEquipment"]').children('div').eq(0),
    equipmentSectionProposesList:() => cy.get('section[data-testid="specialEquipment"]').children('div').eq(1),

    logo:() => cy.get('div[data-testid="logo"]').first(),

    searchServiceLabel:() => cy.get('h1').contains("Сервіс пошуку"),

    searchForm:() => cy.get('div[data-testid="searchForm"]').first(),
    serchResultContainer:() => cy.get('div[data-testid="container"]').should('exist').parent().children('div').eq(2),
    
  }
}
export default new HeaderPage();