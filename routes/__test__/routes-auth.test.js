const app = require('../../app');
const request = require('supertest');
const mockUserUtil = require('../../test-utils/mock-user-util');
let mockUserId = null;
let mockUserUsername = null;
let mockUserPassword = null;


describe('register', () => {
    it('if username and password are passed returns json object with user details, as well as status code 200', async () => {
        mockUserUsername = Math.random().toString(36).slice(2);
        mockUserPassword = Math.random().toString(36).slice(2);
        const res = await request(app).post('/register').send({ username: mockUserUsername, password: mockUserPassword });
        mockUserId = res.body.id;

        expect(res.statusCode).toEqual(200);
        expect(res.body.username).toEqual(mockUserUsername);
    });
});

describe('login', () => {
    it('if username and the password hash are present in database return object with user details and status code 200', async () => {
        const res = await request(app).post('/login').send({ username: mockUserUsername, password: mockUserPassword });

        expect(res.statusCode).toEqual(200);
        expect(res.body.username).toEqual(mockUserUsername);
    })
})

describe('login', () => {
    it('if username is not present in database return status code 401', async () => {
        const res = await request(app).post('/login').send({ username: 'usernme', password: 'pssword' });

        expect(res.statusCode).toEqual(401);
    })
});

describe('login', () => {
    it('if username is found in database but password is wrong return status code 401', async () => {
        const res = await request(app).post('/login').send({ username: mockUserUsername, password: 'pssword' });

        expect(res.statusCode).toEqual(401);
    })
});

describe('logout', () => {
    it('if logged out return status code 200 and text \'Logged out.\'', async () => {
        const res = await request(app).get('/logout');

        await mockUserUtil.destroy(mockUserId);
        
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Logged out.');        
    })
});