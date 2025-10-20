import {z} from "zod";

export const newProductSchema = z.object({
    title:       z.string().min(1),
    price:       z.number().min(0),
    description: z.string().min(1),
    image:       z.string().url(),
    category:    z.string().min(1)
})

export type NewProduct = z.infer<typeof newProductSchema>;

export const ProductSchema = z.object({
    ...newProductSchema,
    id:     z.number(),
    rating: z.object({
        rating: z.number().min(0).max(5),
        count:  z.number().min(0)
    })
})

export type Product = z.infer<typeof ProductSchema>;
