import {ProductsRepository} from "./products.repository";

export class ProductsService {
    constructor(
        private readonly repository: ProductsRepository
    ) {
    }

    async getProducts() {
        let products = this.repository.findAll();
        if (!products.length) {
            products = await this.fetchProducts();
            this.repository.saveAll(products);
            return this.repository.findAll()
        }
        return products;
    }

    private async fetchProducts() {
        const data = await fetch('https://fakestoreapi.com/products');
        return await data.json();
    }

    async getProduct(id: number) {
        return this.repository.findOne(id);
    }

    async addProduct(product: any) {
        return this.repository.save(product);
    }

    async updateProduct(id: number, product: any) {
        return this.repository.update(id, product);
    }

    async deleteProduct(id: number) {
        return this.repository.delete(id);
    }
}
