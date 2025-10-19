import {Sequelize} from "sequelize-typescript";
import config from "../config/db.config";

export default class Database {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.connectToDatabase().catch(e => {
            console.log(e);
            throw e;
        });
    }

    private async connectToDatabase() {
        // @ts-ignore
        this.sequelize = new Sequelize({
            ...config,
            models: []
        });

        await this.sequelize
            .authenticate()
            .then(() => console.log("Connection has been established successfully."))
            .catch((err) => console.error("Unable to connect to the Database:", err));
    }
}
