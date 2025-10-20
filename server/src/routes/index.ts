import {Application, NextFunction, Request, Response} from "express";
import createHttpError from "http-errors";
import {onError} from "../utils/onError";
import {ProductsRoutes} from "../poducts/products.routes";

class Routes {
    constructor(
        private app: Application,
    ) {
        this.initRoutes();
        this.initRoutes = this.initRoutes.bind(this);
    }

    initRoutes() {
        this.app.use('/api/products', new ProductsRoutes().router)

        this.app.use(function (_req: Request, _res: Response, next: NextFunction) {
            next(createHttpError(404, 'Route not found'));
        });

        this.app.use(onError)
    }
}

export default Routes;
