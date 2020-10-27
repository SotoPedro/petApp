import express from 'express';
import config from './utils/config';
import compression from 'compression';
import http from 'http';
import fileUpload from 'express-fileupload';

export default class Server {
    //rio: SocketIO.Server;

    private app: express.Application;
    private port: number;
    private httpServer: http.Server;
    private static _instance: Server;

    private constructor() {
        this.app = express();
        this.httpServer = new http.Server(this.app);
        this.port = Number(config.port);
        this.config();
        this.routes();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private async config() {
        this.app.use(compression());
        this.app.use(express.urlencoded({ extended: false, limit: 60 * 1024 * 1024 }));
        this.app.use(express.json({ limit: 60 * 1024 * 1024 }));
        this.app.use(fileUpload({
            limits: {
                fileSize: 60 * 1024 * 1024
            }
        }));
    }

    start() {
        this.httpServer.listen(this.port, () => {

            console.log(`Server corriendo en el puerto ${ this.port }`);
        });
    }

    private routes() {
        this.app.use("/", (req,res) => { res.send("csm la Jenny")});        
    }
}