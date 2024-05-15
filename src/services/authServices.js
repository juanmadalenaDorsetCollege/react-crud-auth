import productsApi from "../api/productsApi"

export class AuthService {
    static async login({username, password}) {
        const { data } = await productsApi.post('/auth/login', {username, password})
        return data
    }

    static async register({username, password, confirmPassword}) {
        const { data } = await productsApi.post('/auth/register', {username, password, confirmPassword})
        return data
    }
}