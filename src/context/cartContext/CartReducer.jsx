export const CartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const exist = state.products.find( product => product.id === action.payload.id )
            if(exist){
                return {
                    ...state,
                    products: state.products.map( product => product.id === action.payload.id ? {...product, quantity: product.quantity + 1} : product )
                }
            }else{
                action.payload.quantity = 1
                return {
                    ...state,
                    products: [...state.products, action.payload]
                }
            }
        case 'REMOVE_PRODUCT':
            const product = state.products.find( product => product.id === action.payload.id )
            console.log(product)
            if(product?.quantity > 1){
                return {
                    ...state,
                    products: state.products.map( product => product.id === action.payload.id ? {...product, quantity: product.quantity - 1} : product )
                }
            }
            else{
                return {
                    ...state,
                    products: state.products.filter( product => product.id !== action.payload.id )
                }
            }

        default:
            return state
    }
}