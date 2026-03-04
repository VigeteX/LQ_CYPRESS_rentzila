import authModal from "../pageObjects/AuthModal";
import '@4tw/cypress-drag-drop'
import "cypress-real-events";

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", () => {
  cy.fixture("users").then((users) => {
    authModal.verifyVisible();
    authModal.login(users.user.email, users.user.password);
    authModal.elements.modal().should("not.exist");
  });
});