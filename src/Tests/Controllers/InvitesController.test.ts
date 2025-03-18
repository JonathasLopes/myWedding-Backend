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

describe('Invites Controller', () => {
    test('PUT /api/ConfirmPresence deve retornar status 200 e uma mensagem', async () => {
        const ids = '6477e10d-63f2-4979-b1e5-3d181c12aada,a879a5bc-ccf6-4034-91e3-353f3bca1b94'

        const response = await request(app)
            .put('/api/ConfirmPresence')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Basic ${process.env.TOKEN}`)
            .send({ ids: ids })
            .expect(200);

        const expectedMessages = [
            'Convidados confirmados com sucesso!',
            'Convidado confirmado com sucesso!'
        ];

        expect(expectedMessages).toContain(response.body.message);
    });

    test('GET /api/GetAllInvites deve retornar status 200 e todos os convidados', async () => {
        const response = await request(app)
            .get('/api/GetAllInvites')
            .set('Authorization', `Basic ${process.env.TOKEN}`)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
    });

    test('PUT /api/RemovePresence deve retornar status 200 e uma mensagem', async () => {
        const ids = '6477e10d-63f2-4979-b1e5-3d181c12aada,a879a5bc-ccf6-4034-91e3-353f3bca1b94'

        const response = await request(app)
            .put('/api/RemovePresence')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Basic ${process.env.TOKEN}`)
            .send({ ids: ids })
            .expect(200);

        const expectedMessages = [
            'Confirmações removidas com sucesso!',
            'Confirmação removida com sucesso!'
        ];

        expect(expectedMessages).toContain(response.body.message);
    });

    test('POST /api/SearchInvite deve retornar status 200 e uma lista de familias', async () => {
        const name = 'celia'

        const response = await request(app)
            .post('/api/SearchInvite')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Basic ${process.env.TOKEN}`)
            .send({ name: name })
            .expect(200);

        expect(Array.isArray(response.body.families)).toBe(true);
    });
})