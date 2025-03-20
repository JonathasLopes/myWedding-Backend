import 'jest-extended';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import router from '../../routes';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/api', router);

jest.setTimeout(10000);

describe.skip('Message Controller', () => {
    test('GET /api/GetAllMessages deve retornar status 200 e todos as mensagens', async () => {
        const response = await request(app)
            .get('/api/GetAllMessages')
            .set('Authorization', `Basic ${process.env.TOKEN}`)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/SendMessage deve retornar status 200 e uma mensagem', async () => {
        const name = 'celia'
        const message = 'Olá teste'

        const response = await request(app)
            .post('/api/SendMessage')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Basic ${process.env.TOKEN}`)
            .send({ name: name, message: message })
            .expect(200);

            expect(response.body).toHaveProperty('message', 'Mensagem enviada com sucesso!');
    });
})