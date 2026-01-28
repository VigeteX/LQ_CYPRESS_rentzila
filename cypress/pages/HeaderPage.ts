export class HeaderPage {
  
  elements ={
    // enterButton:() => cy.get('div[class="NavbarAuthBlock_buttonEnter__c9siH"]'),
    enterButton:() => cy.contains("Вхід"),
    avatarIcon:() => cy.get('div[data-testid="avatarBlock"]'),
    profileDropdown:() => cy.get('div[data-testid="email"]').closest('div'),
    profileDropdownEmail:() => cy.get('div[data-testid="email"]'),
    logoutButton:() => cy.get('div[data-testid="logout"]'),
  }
}