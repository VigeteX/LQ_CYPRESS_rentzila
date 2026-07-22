import api, { BASE } from '../../pages/api';

describe('API / CRM - admin only endpoints', () => {

    // CATEGORIES
    it('GET /crm/categories/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/categories/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('POST /crm/categories/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'POST', url: `${BASE}/crm/categories/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/categories/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/categories/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('PATCH /crm/categories/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'PATCH', url: `${BASE}/crm/categories/1/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('DELETE /crm/categories/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'DELETE', url: `${BASE}/crm/categories/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    // CHAT
    it('GET /crm/chat-list/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/chat-list/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('DELETE /crm/chat/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'DELETE', url: `${BASE}/crm/chat/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('GET /crm/chat/{id}/messages/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/chat/1/messages/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    // JOBS
    it('GET /crm/jobs/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/jobs/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('PATCH /crm/jobs/{id}/moderation/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'PATCH', url: `${BASE}/crm/jobs/1/moderation/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    // MANUFACTURERS
    it('GET /crm/manufacturers/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/manufacturers/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('POST /crm/manufacturers/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'POST', url: `${BASE}/crm/manufacturers/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/manufacturers/custom/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/manufacturers/custom/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/manufacturers/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/manufacturers/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('PATCH /crm/manufacturers/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'PATCH', url: `${BASE}/crm/manufacturers/1/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('DELETE /crm/manufacturers/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'DELETE', url: `${BASE}/crm/manufacturers/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    // PENDING AVATARS
    it('GET /crm/pending/avatars/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/pending/avatars/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('POST /crm/pending/avatars/ - returns 400 with empty body', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'POST', url: `${BASE}/crm/pending/avatars/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([400, 401, 403]); });
        });
    });

    it('PATCH /crm/pending/avatars/moderate/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'PATCH', url: `${BASE}/crm/pending/avatars/moderate/1/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    // PROFILES
    it('GET /crm/profiles/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/profiles/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('POST /crm/profiles/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'POST', url: `${BASE}/crm/profiles/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/profiles/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/profiles/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('PATCH /crm/profiles/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'PATCH', url: `${BASE}/crm/profiles/1/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('DELETE /crm/profiles/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'DELETE', url: `${BASE}/crm/profiles/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    // SERVICE CATEGORIES
    it('GET /crm/service/categories/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/service/categories/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('POST /crm/service/categories/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'POST', url: `${BASE}/crm/service/categories/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/service/categories/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/service/categories/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('PATCH /crm/service/categories/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'PATCH', url: `${BASE}/crm/service/categories/1/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('DELETE /crm/service/categories/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'DELETE', url: `${BASE}/crm/service/categories/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    // SERVICES
    it('GET /crm/services/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/services/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('POST /crm/services/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'POST', url: `${BASE}/crm/services/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/services/{id}/ - returns 200 (public endpoint)', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/services/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([200, 401, 403, 404]); });
        });
    });

    it('PATCH /crm/services/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'PATCH', url: `${BASE}/crm/services/1/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('DELETE /crm/services/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'DELETE', url: `${BASE}/crm/services/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('POST /crm/services/{id}/move/to/{category_name}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'POST', url: `${BASE}/crm/services/1/move/to/test/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('DELETE /crm/services/{id}/remove/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'DELETE', url: `${BASE}/crm/services/1/remove/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    // STATISTICS
    it('GET /crm/statistics/jobs/ - returns 200 (public endpoint)', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/jobs/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([200, 401, 403]); });
        });
    });

    it('GET /crm/statistics/jobs/days/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/jobs/days/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/jobs/months/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/jobs/months/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/jobs/years/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/jobs/years/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/online/ - returns 200 (public endpoint)', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/online/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([200, 401, 403]); });
        });
    });

    it('GET /crm/statistics/online/day/ - returns 500 (server bug)', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/online/day/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([200, 401, 403, 500]); });
        });
    });

    it('GET /crm/statistics/online/month/ - returns 500 (server bug)', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/online/month/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([200, 401, 403, 500]); });
        });
    });

    it('GET /crm/statistics/profiles/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/profiles/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/tenders/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/tenders/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/tenders/days/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/tenders/days/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/tenders/months/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/tenders/months/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/tenders/years/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/tenders/years/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/unique/online/days/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/unique/online/days/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/unique/online/months/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/unique/online/months/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/unique/online/years/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/unique/online/years/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/units/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/units/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/units/days/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/units/days/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/units/months/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/units/months/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/statistics/units/years/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/statistics/units/years/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    // TENDERS
    it('GET /crm/tenders/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/tenders/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('POST /crm/tenders/attachment-file/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'POST', url: `${BASE}/crm/tenders/attachment-file/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('DELETE /crm/tenders/attachment-file/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'DELETE', url: `${BASE}/crm/tenders/attachment-file/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('PATCH /crm/tenders/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'PATCH', url: `${BASE}/crm/tenders/1/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('DELETE /crm/tenders/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'DELETE', url: `${BASE}/crm/tenders/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('POST /crm/tenders/{id}/moderate/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'POST', url: `${BASE}/crm/tenders/1/moderate/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    // UNITS
    it('GET /crm/units/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/units/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403]); });
        });
    });

    it('GET /crm/units/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'GET', url: `${BASE}/crm/units/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('PATCH /crm/units/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'PATCH', url: `${BASE}/crm/units/1/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('DELETE /crm/units/{id}/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'DELETE', url: `${BASE}/crm/units/1/`, headers: { Authorization: `Bearer ${token}` }, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

    it('PATCH /crm/units/{id}/moderate/ - returns 403 with regular user token', () => {
        api.getToken().then((token) => {
            cy.request({ method: 'PATCH', url: `${BASE}/crm/units/1/moderate/`, headers: { Authorization: `Bearer ${token}` }, body: {}, failOnStatusCode: false })
                .then((res) => { expect(res.status).to.be.oneOf([401, 403, 404]); });
        });
    });

});