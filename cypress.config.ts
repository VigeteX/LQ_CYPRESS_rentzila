import { defineConfig } from 'cypress';
import 'dotenv/config';

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts'
  }
});
