import api, { BASE } from '../../pages/api';

describe('API / Coin Prices', () => {

    it('GET /coin-prices/ - returns 200 with list', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/coin-prices/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });

    it('GET /coin-prices/{name}/ - returns 200 or 404', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/coin-prices/gold/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([200, 404]);
        });
    });

});

describe('API / Coins History', () => {

    it('GET /coins-history/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/coins-history/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403]);
        });
    });

    it('GET /coins-history/ - returns 200 with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'GET',
                url: `${BASE}/coins-history/`,
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                expect(res.status).to.eq(200);
            });
        });
    });

    it('GET /coins-history/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/coins-history/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('GET /coins-history/{id}/ - returns 200/404 with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'GET',
                url: `${BASE}/coins-history/1/`,
                headers: { Authorization: `Bearer ${token}` },
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.be.oneOf([200, 404]);
            });
        });
    });

    it('DELETE /coins-history/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'DELETE',
            url: `${BASE}/coins-history/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

});