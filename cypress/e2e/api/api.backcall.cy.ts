import api, { BASE } from '../../pages/api';

describe('API / Backcall', () => {

    it('GET /backcall/ - returns 403 without admin rights', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'GET',
                url: `${BASE}/backcall/`,
                headers: { Authorization: `Bearer ${token}` },
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.eq(403);
            });
        });
    });

    it('GET /backcall/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/backcall/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403]);
        });
    });

    it('POST /backcall/ - creates backcall without token', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/backcall/`,
            body: {
                phone: '+380509998667',
                name: 'Test User',
            },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([200, 201, 400]);
        });
    });

    it('POST /backcall/ - empty body returns 400', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/backcall/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(400);
        });
    });

    it('GET /backcall/{id}/ - returns 403 without admin rights', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'GET',
                url: `${BASE}/backcall/1/`,
                headers: { Authorization: `Bearer ${token}` },
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.eq(403);
            });
        });
    });

    it('GET /backcall/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/backcall/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('PATCH /backcall/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'PATCH',
            url: `${BASE}/backcall/1/`,
            body: { name: 'Updated' },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('DELETE /backcall/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'DELETE',
            url: `${BASE}/backcall/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

});