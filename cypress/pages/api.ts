import { validUser } from '../fixtures/login.data';
 
const BASE = `${Cypress.env('BASE_URL') || Cypress.config('baseUrl')}api`;
 
const api = {
    getToken() {
        return cy.request({
            method: 'POST',
            url: `${BASE}/auth/jwt/create/`,
            body: {
                email: Cypress.env('TEST_EMAIL'),
                password: Cypress.env('TEST_PASSWORD'),
            },
        }).its('body.access');
    },
 
    getMe(token: string) {
        return cy.request({
            method: 'GET',
            url: `${BASE}/auth/users/me/`,
            headers: { Authorization: `Bearer ${token}` },
        });
    },
 
    getUnits() {
        return cy.request({
            method: 'GET',
            url: `${BASE}/units/`,
        });
    },
 
    getUnit(id: number) {
        return cy.request({
            method: 'GET',
            url: `${BASE}/units/${id}/`,
        });
    },
 
    getTenders() {
        return cy.request({
            method: 'GET',
            url: `${BASE}/tenders/`,
        });
    },
 
    getTender(id: number) {
        return cy.request({
            method: 'GET',
            url: `${BASE}/tender/${id}/`,
        });
    },
};
 
export { BASE };
export default api;