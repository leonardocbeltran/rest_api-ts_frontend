import { object, number, string, boolean, array } from 'valibot'

export const DraftProductSchemas = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    availability: boolean(),
    id: number(),
    name: string(),
    price: number()
})

export const ProductsSchema = array(ProductSchema)
export type Product = {
    availability: boolean
    id: number
    name: string
    price: number
}

//export type Product = TypeOf<typeof ProductSchema>