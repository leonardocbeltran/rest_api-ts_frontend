import { FormEvent } from 'react'
import { useNavigate, ActionFunctionArgs, Form, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../helpers"
import { deleteProduct } from "../services/ProductService"

type ProductDetailProps = {
    product: Product
}

export const action = async ({params} : ActionFunctionArgs) => {
    if(params !== undefined){
        await deleteProduct(params.id)
        return redirect('/')    
    }
}

const ProductDetail = ({product}: ProductDetailProps) => {
    
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const isAvailable = product.availability
    
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form
                    method='post'
                >
                    <button
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                        type='submit'
                        name='id'
                        value={product.id}
                    >{isAvailable ? 'Disponible' : 'No Disponible'}</button>
                </fetcher.Form>
                
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        onClick={ () => navigate(`/productos/${product.id}/editar`)}
                    >Editar</button>
                    <Form 
                        method='post' 
                        className="w-full"
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={ (e: FormEvent<HTMLFormElement>) => {
                                if(!confirm('Seguro deseas eliminar?')){
                                    e.preventDefault()
                                }
                            }
                        }
                    >
                        <input
                            type='submit'
                            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                            value='Eliminar'
                        />
                    </Form>
                    
                </div>
            </td>
        </tr>


    )
}

export default ProductDetail
