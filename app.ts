import dotenv from 'dotenv';
import Server from './models/server'

//Configuración dotEnv
dotenv.config();


const server = new Server();
server.listen();    

