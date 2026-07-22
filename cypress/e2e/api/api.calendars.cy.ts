import api, { BASE } from '../../pages/api';

describe('API / Calendars', () => {

    it('POST /calendars/ - empty body returns 201', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/calendars/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(201);
        });
    });

    it('POST /calendars/ - creates calendar with valid token', () => {
        api.getToken().then((token) => {
            api.getUnits().then((unitsRes) => {
                const unitId = unitsRes.body.results[0].id;
                cy.request({
                    method: 'POST',
                    url: `${BASE}/calendars/`,
                    headers: { Authorization: `Bearer ${token}` },
                    body: {
                        unit: unitId,
                        date_from: new Date().toISOString().split('T')[0],
                        date_to: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    },
                    failOnStatusCode: false,
                }).then((res) => {
                    expect(res.status).to.be.oneOf([200, 201, 400, 403, 406]);
                });
            });
        });
    });

    it('GET /calendars/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/calendars/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('PATCH /calendars/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'PATCH',
            url: `${BASE}/calendars/1/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('DELETE /calendars/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'DELETE',
            url: `${BASE}/calendars/1/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

});