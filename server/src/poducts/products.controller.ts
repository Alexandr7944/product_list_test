import {Request, Response, NextFunction} from 'express';
import {NewProduct, newProductSchema, Product} from "./schema";
import {ProductsRepository} from "./products.repository";
import {ProductsService} from "./products.service";

export class ProductsController {
    private productService: ProductsService;

    constructor() {
        const repository = new ProductsRepository();
        this.productService = new ProductsService(repository);
    }

    async getProducts(_req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.productService.getProducts();
            return res.json(products);
        } catch (error) {
            next(error)
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (id > 0) {
                const result = await this.productService.getProduct(id);
                if (result) {
                    return res.json(result);
                } else {
                    next(new Error("Product not found"));
                }
            }
            next(new Error("Bad Request"));
        } catch (error) {
            next(error)
        }
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const productInput: NewProduct = newProductSchema.parse(req.body);
            const product: Product = await this.productService.addProduct(productInput);
            return res.json(product);
        } catch (error) {
            next(error)
        }

    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (id > 0) {
                const fieldsToUpdate = newProductSchema.parse(req.body);
                const result: boolean = await this.productService.updateProduct(id, fieldsToUpdate);
                if (result) {
                    return res.json(result);
                }
            }
            next(new Error("Bad Request"));
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            if (id > 0) {
                const result: boolean = await this.productService.deleteProduct(id);
                if (result)
                    return res.json(result);
            }
            next(new Error("Bad Request"));
        } catch (error) {
            next(error)
        }
    }
}
