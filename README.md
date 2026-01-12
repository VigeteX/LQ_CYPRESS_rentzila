Cypress UI Tests for Rentzila Website
Summary of Repository

This repository contains automated UI tests for various pages of the Rrentzila website.
Tests are written using Cypress and TypeScript, following the Page Object Model (POM) structure.
Each test corresponds to a manual test case defined in the specification document.

---
Requirements
Before running the tests, make sure you have installed the following:
    Node.js v20+ (LTS recommended)
    npm v9+
    Cypress v15+

---

## Steps to Install
1. Clone this repository:
git clone https://github.com/VigeteX/LQ_CYPRESS_rentzila.git
cd Telnyx-Cypress-UI-Tests
2. Open the project folder in VS Code.
3. Install dependencies:
    npm install

## Steps to Launch Tests
1. Run all tests:
    npm test

├── cypress/
│   ├── e2e/
│   │   └── example.cy.ts
│   ├── pages/
│   ├── support/
│   │   ├── commands.ts
│   │   └── e2e.ts
│   └── fixtures/
│       └── example.json
├── cypress.config.ts
├── package.json
├── tsconfig.json
└── README.md
