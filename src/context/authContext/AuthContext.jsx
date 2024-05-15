import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
import { AuthService } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

const initialState = {
    user: null,
    error: null,
    status: 'unauthorized'
}

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer( AuthReducer, initialState );
    const naivgate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if (user && token) {
            dispatch({type: 'LOGIN', payload: JSON.parse(user)})
        }else{
            dispatch({type: 'LOGOUT'})
        }
    }, [])

    const login = async (credentials) => {
        try {
            const { user, token} = await AuthService.login(credentials)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            dispatch({type: 'LOGIN', payload: user})
            naivgate('/')
        } catch (error) {
            dispatch({type: 'ERROR', payload: error?.response?.data?.msg})
        }
    }

    const register = async (credentials) => {
        try {
            const { user, token } = await AuthService.register(credentials)
            localStorage.setItem('token', token)
            dispatch({type: 'REGISTER', payload: user})
            naivgate('/')
        } catch (error) {
            dispatch({type: 'ERROR', payload: error?.response?.data?.msg})
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }

    const clearError = () => {
        dispatch({type: 'CLEAR_ERROR'})
    }

    return (
        <AuthContext.Provider value={{...state, login, register, logout, clearError}}>
            {children}
        </AuthContext.Provider>
    )
}