import api, { BASE } from '../../pages/api';

describe('API / Auth', () => {

    it('POST /auth/jwt/create/ - valid credentials return tokens', () => {
        api.getToken().then((token) => {
            expect(token).to.be.a('string');
        });
    });

    it('POST /auth/jwt/create/ - wrong password returns 400', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/auth/jwt/create/`,
            body: {
                email: Cypress.env('TEST_EMAIL'),
                password: 'wrongpassword123',
            },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(400);
        });
    });

    it('POST /auth/jwt/create/ - empty body returns 400', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/auth/jwt/create/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(400);
        });
    });

    it('POST /auth/jwt/refresh/ - valid refresh token returns new access token', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/auth/jwt/create/`,
            body: {
                email: Cypress.env('TEST_EMAIL'),
                password: Cypress.env('TEST_PASSWORD'),
            },
        }).then((loginRes) => {
            cy.request({
                method: 'POST',
                url: `${BASE}/auth/jwt/refresh/`,
                body: { refresh: loginRes.body.refresh },
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('access').and.to.be.a('string');
            });
        });
    });

    it('POST /auth/jwt/refresh/ - invalid refresh token returns 406', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/auth/jwt/refresh/`,
            body: { refresh: 'invalidtoken' },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(406);
        });
    });

    it('GET /auth/users/me/ - returns profile with valid token', () => {
        api.getToken().then((token) => {
            api.getMe(token).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('email', Cypress.env('TEST_EMAIL'));
                expect(res.body).to.have.property('id').and.to.be.a('number');
            });
        });
    });

    it('GET /auth/users/me/ - returns 401 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/auth/users/me/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(401);
        });
    });
});

describe('API / Public endpoints', () => {

    it('GET /category/ - returns list of categories', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/category/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('array').and.not.be.empty;
        });
    });

    it('GET /regions/ - returns list of regions', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/regions/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('array').and.not.be.empty;
        });
    });

    it('GET /units/ - returns list of units', () => {
        api.getUnits().then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('results').and.to.be.an('array');
            expect(res.body).to.have.property('count').and.to.be.a('number');
        });
    });

    it('GET /tenders/ - returns list of tenders', () => {
        api.getTenders().then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('tenders').and.to.be.an('array');
        });
    });

    it('GET /manufacturers/ - returns list of manufacturers', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/manufacturers/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('array');
        });
    });

    it('GET /services/ - returns 200', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/services/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });

    it('GET /currencies/ - returns 200', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/currencies/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });
});