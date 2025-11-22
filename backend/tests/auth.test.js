require('dotenv').config();
console.log('Starting auth test...');
const request = require('supertest');
console.log('Imported supertest');
const mongoose = require('mongoose');
console.log('Imported mongoose');
const { app, server } = require('../server');
console.log('Imported server');
const User = require('../models/User');
console.log('Imported User');

describe('Auth API', () => {
    beforeAll(async () => {
        process.env.JWT_SECRET = 'testsecret';
        await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });

        if (res.statusCode !== 200) {
            console.log('Register Error:', res.body);
            console.log('Register Text:', res.text);
        }
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should login a user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
