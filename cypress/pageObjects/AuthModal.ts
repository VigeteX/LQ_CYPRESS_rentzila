import {Page} from "./Page.page";

class AuthModal extends Page {
  elements = {
    modal: () => cy.get('div[data-testid="authorizationContainer"]'),
    emailInput: () => cy.get('input[name="login"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    submitButton: () => cy.contains("Увійти")
  };

  verifyVisible() {
    this.elements.modal().should("be.visible");
  }

  login(email: string, password: string) {
    this.type(this.elements.emailInput, email);
    this.type(this.elements.passwordInput, password);
    this.click(this.elements.submitButton);
  }
}

export default new AuthModal();
