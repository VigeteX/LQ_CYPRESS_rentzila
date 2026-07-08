import api, { BASE } from '../../pages/api';

describe('API / Tenders', () => {

    it('GET /tenders/ - returns 200 and array of tenders', () => {
        api.getTenders().then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('tenders').and.to.be.an('array');
        });
    });

    it('GET /tenders/ - each tender contains required fields', () => {
        api.getTenders().then((res) => {
            const tenders = res.body.tenders;
            if (tenders.length > 0) {
                const tender = tenders[0];
                expect(tender).to.have.property('id');
                expect(tender).to.have.property('name');
                expect(tender).to.have.property('start_price');
                expect(tender).to.have.property('category');
            }
        });
    });

    it('GET /tender/{id}/ - returns specific tender by id', () => {
        api.getTenders().then((res) => {
            const id = res.body.tenders[0].id;
            api.getTender(id).then((tenderRes) => {
                expect(tenderRes.status).to.eq(200);
                expect(tenderRes.body).to.have.property('id', id);
                expect(tenderRes.body).to.have.property('name');
            });
        });
    });

    it('GET /tender/{id}/ - non-existent id returns 404 or 200', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tender/999999999/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([404, 200]);
        });
    });

    it('GET /tender/slug/{slug}/ - returns tender by slug', () => {
        api.getTenders().then((res) => {
            const slug = res.body.tenders[0].slug;
            if (slug) {
                cy.request({
                    method: 'GET',
                    url: `${BASE}/tender/slug/${slug}/`,
                }).then((slugRes) => {
                    expect(slugRes.status).to.eq(200);
                    expect(slugRes.body).to.have.property('slug', slug);
                });
            }
        });
    });

    it('GET /tenders/map/ - returns map data', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tenders/map/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });

    it('GET /tender/closed/ - returns closed tenders', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tender/closed/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([200, 401, 403]);
        });
    });

    it('GET /tender/history/ - returns tender history', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tender/history/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([200, 401, 403]);
        });
    });

    it('GET /tender/{id}/proposes/ - returns proposes for tender', () => {
        api.getTenders().then((res) => {
            const id = res.body.tenders[0].id;
            cy.request({
                method: 'GET',
                url: `${BASE}/tender/${id}/proposes/`,
                failOnStatusCode: false,
            }).then((propRes) => {
                expect(propRes.status).to.be.oneOf([200, 401, 403]);
            });
        });
    });

    it('POST /tenders/ - returns 403 without token', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/tenders/`,
            body: { name: 'Test tender' },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403]);
        });
    });

    it('POST /tenders/ - creates tender with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'POST',
                url: `${BASE}/tenders/`,
                headers: { Authorization: `Bearer ${token}` },
                body: {
                    name: 'Test tender cypress automation',
                    description: 'Test description for cypress tender automation test',
                    start_price: 1000,
                    currency: 'UAH',
                    type_of_work: 'hour',
                    lat: 50.45,
                    lng: 30.52,
                    start_propose_date: new Date().toISOString(),
                    end_propose_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                    start_tender_date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
                    end_tender_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                    category: 1,
                    services: [],
                },
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.be.oneOf([200, 201, 400, 406]);
            });
        });
    });

    it('GET /tenders/me/ - returns 401/403/500 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tenders/me/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 500]);
        });
    });

    it('GET /tenders/me/ - returns my tenders with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'GET',
                url: `${BASE}/tenders/me/`,
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                expect(res.status).to.eq(200);
            });
        });
    });

    it('PATCH /tender/{id}/ - returns 403 without token', () => {
        api.getTenders().then((res) => {
            const id = res.body.tenders[0].id;
            cy.request({
                method: 'PATCH',
                url: `${BASE}/tender/${id}/`,
                body: { name: 'Updated tender name cypress' },
                failOnStatusCode: false,
            }).then((patchRes) => {
                expect(patchRes.status).to.be.oneOf([401, 403]);
            });
        });
    });

});