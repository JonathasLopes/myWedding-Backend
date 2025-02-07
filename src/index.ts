import express from 'express';
import cors from 'cors';
import router from './routes';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(3333, () => console.log('Server is running!'));