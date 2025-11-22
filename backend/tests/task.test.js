require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('../server');
const User = require('../models/User');
const Task = require('../models/Task');

let token;

describe('Task API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });

    beforeEach(async () => {
        await Task.deleteMany({});
        await User.deleteMany({});

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });
        token = res.body.token;
    });

    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('x-auth-token', token)
            .send({
                title: 'Test Task',
                description: 'Test Description'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('Test Task');
    });

    it('should get all tasks', async () => {
        await request(app)
            .post('/api/tasks')
            .set('x-auth-token', token)
            .send({
                title: 'Test Task',
                description: 'Test Description'
            });

        const res = await request(app)
            .get('/api/tasks')
            .set('x-auth-token', token);

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    });
});
