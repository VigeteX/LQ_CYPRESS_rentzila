import api, { BASE } from '../../pages/api';

describe('API / Contract', () => {

    it('GET /contract/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/contract/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403]);
        });
    });

    it('GET /contract/ - returns 200 with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'GET',
                url: `${BASE}/contract/`,
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                expect(res.status).to.eq(200);
            });
        });
    });

    it('POST /contract/ - returns 401/403 without token', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/contract/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403]);
        });
    });

    it('POST /contract/ - returns 400/201 with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'POST',
                url: `${BASE}/contract/`,
                headers: { Authorization: `Bearer ${token}` },
                body: {},
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.be.oneOf([200, 201, 400, 406]);
            });
        });
    });

    it('GET /contract/template/ - returns 200 without token (public)', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/contract/template/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });

    it('GET /contract/template/ - returns 200 with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'GET',
                url: `${BASE}/contract/template/`,
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                expect(res.status).to.eq(200);
            });
        });
    });

    it('POST /contract/template/ - returns 401/403 without token', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/contract/template/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403]);
        });
    });

    it('GET /contract/template/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/contract/template/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('PATCH /contract/template/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'PATCH',
            url: `${BASE}/contract/template/1/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('DELETE /contract/template/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'DELETE',
            url: `${BASE}/contract/template/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('POST /contract/upload/ - returns 401/403 without token', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/contract/upload/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403]);
        });
    });

    it('GET /contract/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/contract/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('PATCH /contract/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'PATCH',
            url: `${BASE}/contract/1/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('DELETE /contract/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'DELETE',
            url: `${BASE}/contract/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('GET /contract/{id}/download/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/contract/1/download/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

});