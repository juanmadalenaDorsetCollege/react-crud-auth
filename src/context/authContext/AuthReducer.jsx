export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                status: 'authorized',
                error: null
            }
        case 'REGISTER':
            return {
                ...state,
                user: action.payload,
                status: 'authorized',
                error: null
            }
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            }
        case 'LOGOUT':
            return {
                ...state,
                status: 'unauthorized',
                user: null
            }
        default:
            return state
    }
}