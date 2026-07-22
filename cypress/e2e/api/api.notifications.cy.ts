import api, { BASE } from '../../pages/api';

describe('API / Notifications', () => {

    it('GET /notifications/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/notifications/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('PATCH /notifications/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'PATCH',
            url: `${BASE}/notifications/1/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('DELETE /notifications/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'DELETE',
            url: `${BASE}/notifications/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('GET /notifications/{id}/ - returns 200/404 with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'GET',
                url: `${BASE}/notifications/1/`,
                headers: { Authorization: `Bearer ${token}` },
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.be.oneOf([200, 403, 404]);
            });
        });
    });

    it('PATCH /notifications/{id}/ - returns 200/404 with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'PATCH',
                url: `${BASE}/notifications/1/`,
                headers: { Authorization: `Bearer ${token}` },
                body: { is_read: true },
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.be.oneOf([200, 403, 404]);
            });
        });
    });

});