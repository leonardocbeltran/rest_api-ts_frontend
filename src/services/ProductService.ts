import { safeParse } from "valibot"
import axios from "axios"
import { DraftProductSchemas, ProductsSchema, ProductSchema, Product } from "../types"
import { toBoolean } from "../helpers"

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProduct = async (data : ProductData ) => {
    try {
        const result = safeParse(DraftProductSchemas, {
            name: data.name,
            price: +data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        }else{
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export const getProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Error obteniendo datos de productos')
        }

    } catch (error) {
        console.log(error)
    }

}

export const getProductById = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Error obteniendo datos del producto')
        }
    } catch (error) {
        console.log(error)
    }
}

export const editProduct = async (data: ProductData, id: Product['id']) => {
    try {
        const result = safeParse(ProductSchema, {
            id: +id,
            name: data.name,
            price:  +data.price,
            availability: toBoolean(data.availability.toString())
        })

        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, {
                name: result.output.name,
                price: result.output.price,
                availability: result.output.availability
            })
        }else{
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)            
    } catch (error) {
        console.log(error)
    }
}

export const updateAvailability = async (id: Product['id']) => {

    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
    console.log('desde update availability')
}