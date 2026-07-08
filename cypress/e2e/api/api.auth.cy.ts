import { validUser } from '../../fixtures/login.data';
 
const BASE_URL = Cypress.env('BASE_URL') || Cypress.config('baseUrl');
const API = `${BASE_URL}api`;
 
describe('API / Auth', () => {
    let accessToken: string;
    let refreshToken: string;
 
    it('POST /auth/jwt/create/ успешный логин возвращает токены', () => {
        cy.request({
            method: 'POST',
            url: `${API}/auth/jwt/create/`,
            body: {
                email: validUser.email,
                password: validUser.password,
            },
        }).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body).to.have.property('access').and.to.be.a('string');
            expect(res.body).to.have.property('refresh').and.to.be.a('string');
            accessToken = res.body.access;
            refreshToken = res.body.refresh;
        });
    });
 
    it('POST /auth/jwt/create/ неверный пароль возвращает 400', () => {
        cy.request({
            method: 'POST',
            url: `${API}/auth/jwt/create/`,
            body: {
                email: validUser.email,
                password: 'wrongpassword123',
            },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(400);
        });
    });
 
    it('POST /auth/jwt/create/ пустые поля возвращают 400', () => {
        cy.request({
            method: 'POST',
            url: `${API}/auth/jwt/create/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(400);
        });
    });
 
    it('POST /auth/jwt/refresh/ обновление токена', () => {
        cy.request({
            method: 'POST',
            url: `${API}/auth/jwt/create/`,
            body: {
                email: validUser.email,
                password: validUser.password,
            },
        }).then((loginRes) => {
            cy.request({
                method: 'POST',
                url: `${API}/auth/jwt/refresh/`,
                body: { refresh: loginRes.body.refresh },
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('access').and.to.be.a('string');
            });
        });
    });
 
    it('POST /auth/jwt/refresh/ невалидный refresh токен возвращает 406', () => {
        cy.request({
            method: 'POST',
            url: `${API}/auth/jwt/refresh/`,
            body: { refresh: 'invalidtoken' },
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(406);
        });
    });
 
    it('GET /auth/users/me/ получение профиля с валидным токеном', () => {
        cy.request({
            method: 'POST',
            url: `${API}/auth/jwt/create/`,
            body: {
                email: validUser.email,
                password: validUser.password,
            },
        }).then((loginRes) => {
            cy.request({
                method: 'GET',
                url: `${API}/auth/users/me/`,
                headers: { Authorization: `Bearer ${loginRes.body.access}` },
            }).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('email', validUser.email);
                expect(res.body).to.have.property('id').and.to.be.a('number');
            });
        });
    });
 
    it('GET /auth/users/me/ без токена возвращает 401', () => {
        cy.request({
            method: 'GET',
            url: `${API}/auth/users/me/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(401);
        });
    });
});
 
describe('API / Публичные эндпоинты', () => {
    it('GET /category/ список категорий', () => {
        cy.request({
            method: 'GET',
            url: `${API}/category/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('array').and.not.be.empty;
        });
    });
 
    it('GET /regions/ список регионов', () => {
        cy.request({
            method: 'GET',
            url: `${API}/regions/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('array').and.not.be.empty;
        });
    });
 
    it('GET /units/ список юнитов (техника)', () => {
        cy.request({
            method: 'GET',
            url: `${API}/units/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('results').and.to.be.an('array');
            expect(res.body).to.have.property('count').and.to.be.a('number');
        });
    });
 
    it('GET /tenders/ список тендеров', () => {
        cy.request({
            method: 'GET',
            url: `${API}/tenders/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('tenders').and.to.be.an('array');
        });
    });
 
    it('GET /manufacturers/ список производителей', () => {
        cy.request({
            method: 'GET',
            url: `${API}/manufacturers/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('array');
        });
    });
 
    it('GET /services/ список сервисов', () => {
        cy.request({
            method: 'GET',
            url: `${API}/services/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });
 
    it('GET /currencies/ список валют', () => {
        cy.request({
            method: 'GET',
            url: `${API}/currencies/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });
});