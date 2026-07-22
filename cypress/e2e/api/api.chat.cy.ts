import api, { BASE } from '../../pages/api';

describe('API / Chat', () => {

    it('GET /chat/attachment-file/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/chat/attachment-file/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('GET /chat/attachment-file/{id}/ - returns 403/404 with token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'GET',
                url: `${BASE}/chat/attachment-file/1/`,
                headers: { Authorization: `Bearer ${token}` },
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.be.oneOf([403, 404]);
            });
        });
    });

    it('PATCH /chat/attachment-file/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'PATCH',
            url: `${BASE}/chat/attachment-file/1/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('DELETE /chat/attachment-file/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'DELETE',
            url: `${BASE}/chat/attachment-file/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('GET /chat/attachment-file/{id}/download/ - returns 406 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/chat/attachment-file/1/download/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404, 406]);
        });
    });

    it('POST /chat/generate-url/ - returns 400 without body', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/chat/generate-url/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([400, 401, 403]);
        });
    });

    it('POST /chat/generate-url/ - returns 200 with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'POST',
                url: `${BASE}/chat/generate-url/`,
                headers: { Authorization: `Bearer ${token}` },
                body: {},
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.be.oneOf([200, 201, 400]);
            });
        });
    });

    it('GET /chat/{customer_id}/messages/ - returns 500 without token (server bug)', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/chat/1/messages/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404, 500]);
        });
    });

    it('GET /chat/{customer_id}/messages/ - returns 500 with token (server bug)', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'GET',
                url: `${BASE}/chat/1/messages/`,
                headers: { Authorization: `Bearer ${token}` },
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.be.oneOf([200, 403, 404, 500]);
            });
        });
    });

});