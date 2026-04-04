const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models/index');

let token;
let holdingId;

beforeAll(async () =>{ 
    const response = await request(app)
        .post('/api/auth/register')
        .send({ email: `holdings${Date.now()}@test.com`, password: 'password123' });
    token = response.body.token;
});

afterAll(async () => {
    await sequelize.close();
})

describe('Holdings Route', () => {
    test('POST /api/holdings - should add a new holding', async () => {
        const response = await request(app)
            .post('/api/holdings')
            .set('Authorization', `Bearer ${token}`)
            .send({ coinId: 'bitcoin', coinName: 'Bitcoin', quantity: 1, purchasePrice: 40000 })
        
        expect(response.status).toBe(201);
        expect(response.body.coinId).toBe('bitcoin');
        holdingId = response.body.id;
    });

    test('GET /api/holdings - should return a users holdings', async () => {
        const response = await request(app)
            .get('/api/holdings')
            .set('Authorization', `Bearer ${token}`)
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('PUT, /api/holding/:id - should update a holding', async () => { 
        const response = await request(app)
            .put(`/api/holdings/${holdingId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ coinId: 'bitcoin', coinName: 'Bitcoin', quantity: 2, purchasePrice: 40000 })

        expect(response.status).toBe(200);
        expect(response.body.quantity).toBe(2)
    });

    test('DELETE, /api/holding/:id - should delete a holding', async () => {
        const response = await request(app)
            .delete(`/api/holdings/${holdingId}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toBe('Holding deleted!');
    });
})