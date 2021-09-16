import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_CONN, DB_USER, DB_PW } = process.env;

mongoose.connect(
    DB_CONN,
    {
        dbName: 'staging-campfire', 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }
);

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));

export { conn };
