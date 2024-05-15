import { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";
import { toast } from "sonner";

const initialState = {
    products: [],
}

export const CartContext = createContext({});

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer( CartReducer, initialState );

    const addTocart = (product) => {
        toast.success(`${product.title} added to cart`)
        dispatch({type: 'ADD_TO_CART', payload: product})
    }

    const removeProduct = (product) => {
        toast.error(`${product.title} removed from cart`)
        dispatch({type: 'REMOVE_PRODUCT', payload: product})
    }

    return (
        <CartContext.Provider value={{...state, addTocart, removeProduct}}>
            {children}
        </CartContext.Provider>
    )
}
