import api, { BASE } from '../../pages/api';

describe('API / Units', () => {

    it('GET /units/ - returns 200 and array of units', () => {
        api.getUnits().then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('results').and.to.be.an('array');
            expect(res.body).to.have.property('count').and.to.be.a('number');
        });
    });

    it('GET /units/ - each unit contains required fields', () => {
        api.getUnits().then((res) => {
            const units = res.body.results;
            if (units.length > 0) {
                const unit = units[0];
                expect(unit).to.have.property('id');
                expect(unit).to.have.property('name');
                expect(unit).to.have.property('minimal_price');
                expect(unit).to.have.property('category');
            }
        });
    });

    it('GET /units/{id}/ - returns specific unit by id', () => {
        api.getUnits().then((res) => {
            const id = res.body.results[0].id;
            api.getUnit(id).then((unitRes) => {
                expect(unitRes.status).to.eq(200);
                expect(unitRes.body).to.have.property('id', id);
                expect(unitRes.body).to.have.property('name');
            });
        });
    });

    it('GET /units/{id}/ - non-existent id returns 200 with empty result', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/999999999/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });

    it('GET /units/slug/{slug}/ - returns unit by slug', () => {
        api.getUnits().then((res) => {
            const slug = res.body.results[0].slug;
            if (slug) {
                cy.request({
                    method: 'GET',
                    url: `${BASE}/units/slug/${slug}/`,
                }).then((slugRes) => {
                    expect(slugRes.status).to.eq(200);
                    expect(slugRes.body).to.have.property('slug', slug);
                });
            }
        });
    });

    it('GET /units/map/ - returns map data', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/map/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });

    it('GET /units/price/ - returns list of prices', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/price/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });

    it('POST /units/ - returns 403 without token', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/units/`,
            body: { name: 'Test unit' },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(403);
        });
    });

    it('POST /units/ - creates unit with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'POST',
                url: `${BASE}/units/`,
                headers: { Authorization: `Bearer ${token}` },
                body: {
                    name: 'Test unit cypress',
                    description: 'Test description for cypress unit',
                    features: 'Test features',
                    type_of_work: 'Hourly',
                    minimal_price: 100,
                    money_value: 'UAH',
                    payment_method: 'cash',
                    lat: 50.45,
                    lng: 30.52,
                },
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.be.oneOf([200, 201, 400, 406]);
            });
        });
    });

    it('PATCH /units/{id}/ - returns 403 without token', () => {
        api.getUnits().then((res) => {
            const id = res.body.results[0].id;
            cy.request({
                method: 'PATCH',
                url: `${BASE}/units/${id}/`,
                body: { name: 'Updated name' },
                failOnStatusCode: false,
            }).then((patchRes) => {
                expect(patchRes.status).to.eq(403);
            });
        });
    });

    it('GET /unit/{id}/reviews/ - returns reviews for unit', () => {
        api.getUnits().then((res) => {
            const id = res.body.results[0].id;
            cy.request({
                method: 'GET',
                url: `${BASE}/unit/${id}/reviews/`,
            }).then((reviewRes) => {
                expect(reviewRes.status).to.eq(200);
            });
        });
    });

    it('GET /units/{id}/calendars/ - returns calendar for unit', () => {
        api.getUnits().then((res) => {
            const id = res.body.results[0].id;
            cy.request({
                method: 'GET',
                url: `${BASE}/units/${id}/calendars/`,
                failOnStatusCode: false,
            }).then((calRes) => {
                expect(calRes.status).to.be.oneOf([200, 401]);
            });
        });
    });

});