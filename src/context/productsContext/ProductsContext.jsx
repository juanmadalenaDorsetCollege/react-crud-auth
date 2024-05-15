import { createContext, useReducer } from "react";
import { ProductsReducer } from "./ProductsReducer";
import { productServices } from "../../services/productServices";

const initialState = {
    products: [],
    product: {}
}

export const ProductContext = createContext({});

export const ProductProvider = ({children}) => {

    const [ state, dispatch ] = useReducer( ProductsReducer, initialState );

    const getProducts = async (refresh = false) => {
        if( state.products?.length <= 0 || refresh) {
            const products = await productServices.getProducts()
            dispatch({type: 'GET_PRODUCTS', payload: products})
        }else{
            return state.products
        }
    }
    
    const getProduct = async (id) => {
        const product = await productServices.getProduct(id)
        dispatch({type: 'GET_PRODUCT_BY_ID', payload: product})
    }

    const removeProductSelected = () => {
        dispatch({type: 'REMOVE_PRODUCT_SELECTED', payload: {}})
    }

    return (
        <ProductContext.Provider value={{...state, getProducts, getProduct, removeProductSelected}}>
            {children}
        </ProductContext.Provider>
    )

}
