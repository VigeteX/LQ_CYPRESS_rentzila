import authModal from "../pageObjects/AuthModal";

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