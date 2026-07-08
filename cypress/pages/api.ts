import { validUser } from '../fixtures/login.data';
 
const BASE = `${Cypress.env('BASE_URL') || Cypress.config('baseUrl')}api`;
 
const api = {
    getToken() {
        return cy.request({
            method: 'POST',
            url: `${BASE}/auth/jwt/create/`,
            body: {
                email: validUser.email,
                password: validUser.password,
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
};
 
export { BASE };
export default api;