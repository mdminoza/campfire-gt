import * as http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import app from './app.js';
import socketInit from './socket.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

socketInit(server);

server.listen(PORT);
