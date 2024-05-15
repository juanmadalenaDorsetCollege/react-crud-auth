export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                status: 'authorized',
                error: false
            }
        case 'REGISTER':
            return {
                ...state,
                user: action.payload,
                status: 'authorized',
                error: false
            }
        case 'ERROR':
            return {
                ...state,
                error: action.payload
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