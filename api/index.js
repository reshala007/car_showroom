import express from 'express';
import { MongoClient } from 'mongodb';
import authRouter from './routers/authRouter.js';

const dbURL = 'mongodb://localhost:27017';
const app = express();
const PORT = 5000;
const client = new MongoClient(dbURL);
const db = client.db('car_showroom')

app.use(express.json());
app.use('/auth', authRouter)
const start = async () => {
    try {
        await client.connect()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

start();

export default db