import envData from "./envData";

const options = {
    host:    envData.DB_HOST,
    port:    envData.DB_PORT,
    dialect: "postgres",
    logging: false,
    pool:    {
        max:     5,
        min:     0,
        acquire: 30000,
        idle:    10000
    },
};

console.log(`${options.host}:${options.port}/${envData.DB_NAME}`);

const config = {
    database: envData.DB_NAME,
    username: envData.DB_USER,
    password: envData.DB_PASSWORD,
    ...options,
};

export default config;
