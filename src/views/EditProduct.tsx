import { Link, Form, useActionData, useLoaderData, ActionFunctionArgs, redirect, LoaderFunctionArgs } from "react-router-dom"
import Error from "../components/Error"
import { editProduct, getProductById } from "../services/ProductService"
import { Product } from "../types"
import ProductForm from "../components/ProductForm"

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
]

export const loader =  async ({params}: LoaderFunctionArgs) => {
    if(params.id !== undefined){
        const product = await getProductById(+params.id)
        if(!product){
            return redirect('/')
            //throw new Response('', {status: 404, statusText: 'No encontrado'})
        }
        return product
    }
}

export const action = async ({request, params} : ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData())

    let error : string = ''
    if(Object.values(data).includes('')){
        error = 'Todos los campos son Obligatorios'
    }

    if(error.length){
        return error
    }

    if(params !== undefined){
        await editProduct(data, params.id)
        return redirect('/')    
    }

}


const EditProduct = () => {

    const error = useActionData() as string
    const product = useLoaderData() as Product

    return (
        <>
        <div className="flex justify-between">
            <h2 className="text-4xl font-bold text-slate-500">Actualizar Producto</h2>
            <Link 
                to='/'
                className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
            >Volver a Productos</Link>
        </div>

            {error && <Error> {error} </Error>}

            <Form
                className="mt-10"
                method="post"
            >
                <ProductForm
                    product={product}
                />
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>
        </>
    )
}

export default EditProduct
