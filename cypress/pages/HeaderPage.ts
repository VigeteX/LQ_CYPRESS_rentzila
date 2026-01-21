export class HeaderPage {
  
  elements ={
    enterButton:() => cy.get('div[class="NavbarAuthBlock_buttonEnter__c9siH"]'),
    avatarIcon:() => cy.get('div[data-testid="avatarBlock"]'),
    profileDropdown:() => cy.get('div[data-testid="email"]').closest('div'),
    profileDropdownEmail:() => cy.get('div[data-testid="email"]'),
    logoutButton:() => cy.get('div[data-testid="logout"]'),
    
  }
}