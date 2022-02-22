const app = require('../../app');
const request = require('supertest');
const mockUserUtil = require('../../test-utils/mock-user-util');
let session = null;
let mockUserId = null;
let testId1 = null;
let testId2 = null;


describe('/diaries', () => {

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
        const res1 = await request(app).delete('/diaries/' + testId1).set('Cookie', session);
        const res2 = await request(app).delete('/diaries/' + testId2).set('Cookie', session);

        const res = await request(app).get('/logout');

        await mockUserUtil.destroy(mockUserId);
    });


    it('GET /users should return diaries []', async () => {
        const res = await request(app).get('/diaries').set('Cookie', session);

        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('userId');
    });

    it('GET /diaries:id should return diary {}', async () => {
        const res = await request(app).get('/diaries/1').set('Cookie', session);

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
    });

    it('POST /diaries with name and user id should return diary {}', async () => {
        const res = await request(app).post('/diaries').send({ name: 'test_diary1', userId: 14 }).set('Cookie', session);
        testId1 = res.body.id;

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('test_diary1');
    });

    it('DELETE /diaries:id should delete diary and return diary {}', async () => {
        const testDiary = await request(app).post('/diaries').send({ name: 'test_diary2', userId: 14 }).set('Cookie', session);
        const deleteId = testDiary.body.id;
        const res = await request(app).delete('/diaries/' + deleteId).set('Cookie', session);

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(deleteId);
    });

    it('PUT diaries:id with name and userId should return updated diary {}', async () => {
        const testDiary = await request(app).post('/diaries').send({ name: 'test_diary3', userId: 14 }).set('Cookie', session);
        const testDiaryId = testDiary.body.id;
        const res = await request(app).put('/diaries/' + testDiaryId).send({ name: 'test_diary4', userId: 14 }).set('Cookie', session);
        testId2 = testDiaryId;

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual('test_diary4');
    });
});