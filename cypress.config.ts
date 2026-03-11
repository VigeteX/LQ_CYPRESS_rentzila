import { defineConfig } from 'cypress'
import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import path from 'path'
import allureWriter from '@shelex/cypress-allure-plugin/writer'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    baseUrl: process.env.BASE_URL,
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts'
  }
});
