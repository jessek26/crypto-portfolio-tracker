const request = require('supertest');
const app = require('../server.js');
const { sequelize } = require('../models/index.js');

afterAll(async () => {
    await sequelize.close();
});

describe('Auth Route', () => {
    const testEmail = `test${Date.now()}@test.com`

    test('POST /api/auth/register - should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ email: `${testEmail}`, password: 'password123' });
        
        expect(response.status).toBe(201);
        expect(response.body.token).toBeDefined();
    });

    test('POST /api/auth/register - should fail since email already exists', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ email:`${testEmail}`, password: 'password123' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });

   test('POST /api/auth/login - should successfully login', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: testEmail, password: 'password123' });
        
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    test('POST /api/auth/login - should fail with wrong password', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: testEmail, password: 'wrongpassword' });
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBeDefined();
    });
}); 