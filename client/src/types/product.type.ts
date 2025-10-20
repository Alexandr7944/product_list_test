export type Product = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number,
    },
}

export type NewProductInput = {
    title: string;
    price: number;
    description: string;
    image: string; // URL
    category: string;
};


export type UpdateProductInput = NewProductInput & {
    id: number;
};
