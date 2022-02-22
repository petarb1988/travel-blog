const app = require('../../app');
const request = require('supertest');
const mockUserUtil = require('../../test-utils/mock-user-util');
let session = null;
let mockUserId = null;
let testId1 = null;
let testId2 = null;


describe('/entries', () => {

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
        const res1 = await request(app).delete('/entries/' + testId1).set('Cookie', session);
        const res2 = await request(app).delete('/entries/' + testId2).set('Cookie', session);

        const res = await request(app).get('/logout');

        await mockUserUtil.destroy(mockUserId);
    });


    it('GET /entries/search?hint=Za should return [] of hinted locations that start with Za', async () => {
        const res = await request(app).get('/entries/search?hint=Za').set('Cookie', session);

        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty('location');
    });

    it('GET /entries:id should return entry {}', async () => {
        const res = await request(app).get('/entries/1').set('Cookie', session);

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(1);
        expect(res.body.location).toEqual('Zagreb');
    });

    it('GET /entries?diaryId=1&pageNumber=1&pageSize=10 should return entry []', async () => {
        const res = await request(app).get('/entries?diaryId=1&pageNumber=1&pageSize=10').set('Cookie', session);

        expect(res.statusCode).toEqual(200);
        expect(res.body.data[0]).toHaveProperty('location');
    });    

    it('POST /entries with location, description & diary id should return entry {}', async () => {
        const res = await request(app).post('/entries').send({ location: 'Madrid', description: 'test', diaryId: 1 }).set('Cookie', session);
        testId1 = res.body.id;

        expect(res.statusCode).toEqual(200);
        expect(res.body.location).toEqual('Madrid');
    });

    it('DELETE /entries:id should delete entry and return entry {}', async () => {
        const testEntry = await request(app).post('/entries').send({ location: 'Barcelona', description: 'testt', diaryId: 1 }).set('Cookie', session);
        const deleteId = testEntry.body.id;
        const res = await request(app).delete('/entries/' + deleteId).set('Cookie', session);

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(deleteId);
    });

    it('PUT /entries:id with location and decription should return updated entry {}', async () => {
        const testEntry = await request(app).post('/entries').send({ location: 'Seville', description: 'testtt', diaryId: 1 }).set('Cookie', session);
        const testEntryId = testEntry.body.id;
        const res = await request(app).put('/entries/' + testEntryId).send({ location: 'Valencia', description: 'testttt' }).set('Cookie', session);
        testId2 = res.body.id;

        expect(res.statusCode).toEqual(200);
        expect(res.body.location).toEqual('Valencia');
    });
});