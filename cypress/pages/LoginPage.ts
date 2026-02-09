export class LoginPage {
  elements ={
    emailField:() => cy.get('input[id*="email"]'),
    passwordField:() => cy.get('input[id="password"]'),
    submitButton:() => cy.get('div[data-testid="loginPopup"]').find('button[type="submit"]'),
    hidePassworIcon:() => cy.get('div[data-testid="loginPopup"]').find('div[data-testid="reactHookButton"]'),
    errorMessage:() => cy.get('[data-testid="errorMessage"]'),
    alert:() => cy.get('[role="alert"]'),
    authClose:() => cy.get('[data-testid="authClose"]'),  
  }
  check_error_message(message:string){
    this.elements.alert().should('be.visible').and('have.text', message)
  }
  login(email:string,password:string){
    this.elements.emailField().type(email).should('have.value', email);
    this.elements.passwordField().type(password).should('have.value', password);
    this.elements.submitButton().click();
  }
}