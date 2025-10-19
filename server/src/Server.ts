import morgan from 'morgan';
import express, {Application} from "express";
import cors, {CorsOptions} from "cors";
import helmet from "helmet";
import Routes from "./routes";
import Database from "./db";
import {developmentConfig, productionConfig} from "./config";

require('console-stamp')(console, {
    format: ':date(dd.mm.yyyy HH:MM:ss.l) :label(10)'
});

class Server {
    isProduction: boolean;

    constructor(app: Application) {
        this.isProduction = process.env.NODE_ENV === 'production';
        this.config(app);
        this.syncDatabase();
        new Routes(app );
    }

    private config(app: Application): void {
        let config: CorsOptions = this.isProduction ? productionConfig : developmentConfig;

        app.use(morgan('combined'));
        app.use(cors(config));
        app.use(helmet());
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
    }

    private syncDatabase() {
        new Database().sequelize?.sync({
            alter: !this.isProduction,
            // force: false
        });
        console.log('Database sync complete');
    }
}

export default Server;
