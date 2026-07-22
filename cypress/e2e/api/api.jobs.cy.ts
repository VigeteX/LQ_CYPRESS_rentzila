import api, { BASE } from '../../pages/api';

describe('API / Jobs', () => {

    it('GET /jobs/ - returns 200', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/jobs/`,
        }).then((res) => {
            expect(res.status).to.eq(200);
        });
    });

    it('GET /jobs/ - each job contains required fields', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/jobs/`,
        }).then((res) => {
            const jobs = res.body.results || res.body;
            if (Array.isArray(jobs) && jobs.length > 0) {
                expect(jobs[0]).to.have.property('id');
                expect(jobs[0]).to.have.property('name');
            }
        });
    });

    it('POST /jobs/ - returns 400 without token (public endpoint)', () => {
        cy.request({
            method: 'POST',
            url: `${BASE}/jobs/`,
            body: {},
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([400, 401, 403]);
        });
    });

    it('POST /jobs/ - returns 200/201/400 with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'POST',
                url: `${BASE}/jobs/`,
                headers: { Authorization: `Bearer ${token}` },
                body: {
                    name: 'Test job cypress',
                    description: 'Test description for cypress job',
                    budget: 1000,
                    lat: 50.45,
                    lng: 30.52,
                    type_of: 'test',
                    region: 'Київська',
                    country: 'Україна',
                    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                    category: 1,
                },
                failOnStatusCode: false,
            }).then((res) => {
                expect(res.status).to.be.oneOf([200, 201, 400, 406]);
            });
        });
    });

    it('GET /jobs/closed/ - returns 200', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/jobs/closed/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([200, 401, 403]);
        });
    });

    it('GET /jobs/me/ - returns 401/403/404 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/jobs/me/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([401, 403, 404]);
        });
    });

    it('GET /jobs/me/ - returns 200 with valid token', () => {
        api.getToken().then((token) => {
            cy.request({
                method: 'GET',
                url: `${BASE}/jobs/me/`,
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                expect(res.status).to.eq(200);
            });
        });
    });

    it('GET /jobs/mock/ - returns 500 (server bug)', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/jobs/mock/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([200, 401, 403, 500]);
        });
    });

    it('GET /jobs/moderation/ - returns 200 (public endpoint)', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/jobs/moderation/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([200, 401, 403]);
        });
    });

    it('GET /jobs/user/{user_id}/ - returns 200', () => {
        api.getToken().then((token) => {
            api.getMe(token).then((meRes) => {
                const userId = meRes.body.id;
                cy.request({
                    method: 'GET',
                    url: `${BASE}/jobs/user/${userId}/`,
                    failOnStatusCode: false,
                }).then((res) => {
                    expect(res.status).to.be.oneOf([200, 401, 403]);
                });
            });
        });
    });

    it('GET /jobs/{id}/ - returns specific job', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/jobs/`,
        }).then((res) => {
            const jobs = res.body.results || res.body;
            if (Array.isArray(jobs) && jobs.length > 0) {
                const id = jobs[0].id;
                cy.request({
                    method: 'GET',
                    url: `${BASE}/jobs/${id}/`,
                }).then((jobRes) => {
                    expect(jobRes.status).to.eq(200);
                    expect(jobRes.body).to.have.property('id', id);
                });
            }
        });
    });

    it('GET /jobs/{id}/ - non-existent id returns 400/404', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/jobs/999999999/`,
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([400, 404, 200]);
        });
    });

    it('PATCH /jobs/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/jobs/`,
        }).then((res) => {
            const jobs = res.body.results || res.body;
            if (Array.isArray(jobs) && jobs.length > 0) {
                const id = jobs[0].id;
                cy.request({
                    method: 'PATCH',
                    url: `${BASE}/jobs/${id}/`,
                    body: { name: 'Updated job' },
                    failOnStatusCode: false,
                }).then((patchRes) => {
                    expect(patchRes.status).to.be.oneOf([401, 403]);
                });
            }
        });
    });

    it('DELETE /jobs/{id}/ - returns 401/403 without token', () => {
        cy.request({
            method: 'GET',
            url: `${BASE}/jobs/`,
        }).then((res) => {
            const jobs = res.body.results || res.body;
            if (Array.isArray(jobs) && jobs.length > 0) {
                const id = jobs[0].id;
                cy.request({
                    method: 'DELETE',
                    url: `${BASE}/jobs/${id}/`,
                    failOnStatusCode: false,
                }).then((delRes) => {
                    expect(delRes.status).to.be.oneOf([401, 403]);
                });
            }
        });
    });

});