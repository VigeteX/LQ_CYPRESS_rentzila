import { defineConfig } from 'cypress'
import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import path from 'path'
import allureWriter from '@shelex/cypress-allure-plugin/writer'

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // Allure
            allureWriter(on, config)

            //Task
            on('task', {
                getFilesFromFolder(folderPath: string) {
                    const files = fs.readdirSync(folderPath)

                    return files.map((file) =>
                        path.join(folderPath, file)
                    )
                },
            })

            return config
        },

        baseUrl: process.env.BASE_URL,
        specPattern: 'cypress/e2e/**/*.cy.ts',
        supportFile: 'cypress/support/e2e.ts',
        viewportWidth: 1280,
        viewportHeight: 800,
    }
})