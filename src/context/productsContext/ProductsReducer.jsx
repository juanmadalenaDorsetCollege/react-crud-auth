export const ProductsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                products: action.payload
            }
        case 'GET_PRODUCT_BY_ID':
            return {
                ...state,
                product: action.payload
            }
        case 'REMOVE_PRODUCT_SELECTED':
            return {
                ...state,
                product: action.payload
            }
        default:
            return state
    }
}