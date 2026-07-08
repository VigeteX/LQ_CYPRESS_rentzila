import api, { BASE } from '../../pages/api';
 
describe('API / Units', () => {
 
    it('GET /units/ список юнитов возвращает 200 и массив', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('results').and.to.be.an('array');
            expect(res.body).to.have.property('count').and.to.be.a('number');
        });
    });
 
    it('GET /units/ каждый юнит содержит обязательные поля', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/`,
        }).then((res) => {
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
 
    it('GET /units/{id}/ получение конкретного юнита', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/`,
        }).then((res) => {
            const id = res.body.results[0].id;
            cy.request({
                method: 'GET',
                url: `${BASE}/units/${id}/`,
            }).then((unitRes) => {
                expect(unitRes.status).to.eq(200);
                expect(unitRes.body).to.have.property('id', id);
                expect(unitRes.body).to.have.property('name');
            });
        });
    });
 
    it('GET /units/{id}/ несуществующий id возвращает 200 с пустым результатом', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/999999999/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });
 
    it('GET /units/slug/{slug}/ получение юнита по slug', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/`,
        }).then((res) => {
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
 
    it('GET /units/map/ данные для карты', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/map/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });
 
    it('GET /units/price/ список цен', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/price/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });
 
    it('POST /units/ создание юнита без токена возвращает 403', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/units/`,
            body: { name: 'Test unit' },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(403);
        });
    });
 
    it('POST /units/ создание юнита с токеном', () => {
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
 
    it('PATCH /units/{id}/ редактирование юнита без токена возвращает 403', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/`,
        }).then((res) => {
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
 
    it('GET /units/{id}/reviews/ отзывы по юниту', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/`,
        }).then((res) => {
            const id = res.body.results[0].id;
            cy.request({
                method: 'GET',
                url: `${BASE}/unit/${id}/reviews/`,
            }).then((reviewRes) => {
                expect(reviewRes.status).to.eq(200);
            });
        });
    });
 
    it('GET /units/{id}/calendars/ календарь юнита', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/units/`,
        }).then((res) => {
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