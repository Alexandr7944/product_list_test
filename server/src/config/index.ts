import {CorsOptions} from "cors";

export const developmentConfig: CorsOptions = {
    credentials: true,
    origin: 'http://localhost:5173'
}

export const productionConfig: CorsOptions = {
    credentials: true,
    origin: 'http://localhost:' + process.env.APP_PORT
}
