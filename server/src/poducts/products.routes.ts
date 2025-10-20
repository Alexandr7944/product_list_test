import {ProductsController} from "./products.controller";
import express from "express";

export class ProductsRoutes {
    readonly router: express.Router;
    private readonly controller: ProductsController;

    constructor() {
        this.router = express.Router();
        this.controller = new ProductsController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get("/", this.controller.getProducts.bind(this.controller));
        this.router.get("/:id", this.controller.getProduct.bind(this.controller));
        this.router.post("/", this.controller.createProduct.bind(this.controller));
        this.router.put("/:id", this.controller.updateProduct.bind(this.controller));
        this.router.delete("/:id", this.controller.deleteProduct.bind(this.controller));
    }
}
