
import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors';
import db from '../db/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';


        this.dbConnection();
        //Métodos Iniciales
        this.middlewares();
        //Definir Mis Rutas
        this.routes();

        //Configuración de Carpeta Publica 
        this.app.use(express.static('public'));


        //Todo: Conectar Base de Datos

    }


    async dbConnection(){

        try {
            await db.authenticate();
            console.log('Database Online')

        } catch (error) {
            throw new Error( );
        }
    }

    middlewares() {

        // Cors
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());
        // Carpeta Publica



    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor Corriendo en Puerto : ' + this.port);
        })
    }
}

export default Server;