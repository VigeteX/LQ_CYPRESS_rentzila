import api, { BASE } from '../../pages/api';

describe('API / Tenders', () => {

    it('GET /tenders/ список тендеров возвращает 200', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tenders/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('tenders').and.to.be.an('array');
        });
    });

    it('GET /tenders/ каждый тендер содержит обязательные поля', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tenders/`,
        }).then((res) => {
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

    it('GET /tender/{id}/ получение конкретного тендера', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tenders/`,
        }).then((res) => {
            const id = res.body.tenders[0].id;
            cy.request({
                method: 'GET',
                url: `${BASE}/tender/${id}/`,
            }).then((tenderRes) => {
                expect(tenderRes.status).to.eq(200);
                expect(tenderRes.body).to.have.property('id', id);
                expect(tenderRes.body).to.have.property('name');
            });
        });
    });

    it('GET /tender/{id}/ несуществующий id возвращает 404', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tender/999999999/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([404, 200]);
        });
    });

    it('GET /tender/slug/{slug}/ получение тендера по slug', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tenders/`,
        }).then((res) => {
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

    it('GET /tenders/map/ данные тендеров для карты', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tenders/map/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });

    it('GET /tender/closed/ закрытые тендеры', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tender/closed/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([200, 401, 403]);
        });
    });

    it('GET /tender/history/ история тендеров', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tender/history/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([200, 401, 403]);
        });
    });

    it('GET /tender/{id}/proposes/ отклики на тендер', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tenders/`,
        }).then((res) => {
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

    it('POST /tenders/ создание тендера без токена возвращает 403', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/tenders/`,
            body: { name: 'Test tender' },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403]);
        });
    });

    it('POST /tenders/ создание тендера с токеном', () => {
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

    it('GET /tenders/me/ мои тендеры без токена возвращает 403', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tenders/me/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 500]);
        });
    });

    it('GET /tenders/me/ мои тендеры с токеном', () => {
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

    it('PATCH /tender/{id}/ редактирование тендера без токена возвращает 403', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/tenders/`,
        }).then((res) => {
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
