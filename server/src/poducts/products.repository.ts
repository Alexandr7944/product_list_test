import {NewProduct, Product} from "./schema";

export class ProductsRepository {
    private data: Product[];
    private id: number;

    constructor() {
        this.data = [];
        this.id = 0;
    }

    findAll(): Product[] {
        return this.data;
    }

    findOne(id: number) {
        return this.data.find(product => product.id === id);
    }

    save(product: NewProduct): Product {
        const newProduct: Product = {
            id:     ++this.id,
            rating: {rating: 0, count: 0},
            ...product
        } as unknown as Product;
        this.data.push(newProduct);
        return newProduct;
    }

    saveAll(products: Product[]): void {
        this.data = products.map((item, index, arr) => {
            return {
                ...item,
                id: ++this.id,
            }
        });
    }


    update(id: number, product: Partial<Product>): boolean {
        const index = this.data.findIndex(product => product.id === id);
        if (index === -1) {
            return false;
        }
        this.data[index] = {
            ...this.data[index],
            ...product
        }
        return true;
    }

    delete(id: number): boolean {
        const index = this.data.findIndex(product => product.id === id);
        if (index === -1) {
            return false;
        }
        this.data.splice(index, 1);
        return true;
    }
}
