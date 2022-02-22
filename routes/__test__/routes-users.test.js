const app = require('../../app');
const request = require('supertest');
const mockUserUtil = require('../../test-utils/mock-user-util');
let session = null;
let mockUserId = null;
let testId1 = null;
let testId2 = null;


describe('/users', () => {

    beforeAll(async () => {
        const mockUser = await mockUserUtil.create();
        const res = await request(app).post('/login').send({ username: mockUser.username, password: mockUser.password });

        mockUserId = res.body.id;

        session = res
               .headers['set-cookie'][0]
               .split(',')
               .map(item => item.split(';')[0])
               .join(';');
            expect(res.status).toEqual(200);
    });

    afterAll(async () => {
        const res1 = await request(app).delete('/users/' + testId1).set('Cookie', session);
        const res2 = await request(app).delete('/users/' + testId2).set('Cookie', session);

        const res = await request(app).get('/logout');

        await mockUserUtil.destroy(mockUserId);
    });


    it('GET /users should return users []', async () => {
        const res = await request(app).get('/users/').set('Cookie', session);

        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('hash');
    });

    it('GET /users:id should return user {}', async () => {
        const res = await request(app).get('/users/1').set('Cookie', session);

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
    });

    it('POST /users with username and password should return user {}', async () => {
        const res = await request(app).post('/users').send({ username: 'test1', password: 'password' }).set('Cookie', session);
        testId1 = res.body.id;

        expect(res.statusCode).toEqual(200);
        expect(res.body.username).toEqual('test1');
    });

    it('DELETE /users:id should return user {}', async () => {
        const testUser = await request(app).post('/users').send({ username: 'test2', password: 'password' }).set('Cookie', session);
        const deleteId = testUser.body.id;
        const res = await request(app).delete('/users/' + deleteId).set('Cookie', session);

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(deleteId);
    });

    it('PUT /users:id with username and password should return user {}', async () => {
        const testUser = await request(app).post('/users').send({ username: 'test3', password: 'password' }).set('Cookie', session);
        const testUserId = testUser.body.id;
        const res = await request(app).put('/users/' + testUserId).send({ username: 'test4', password: 'password' }).set('Cookie', session);
        testId2 = res.body.id;

        expect(res.statusCode).toEqual(200);
        expect(res.body.username).toEqual('test4');
    });
    });