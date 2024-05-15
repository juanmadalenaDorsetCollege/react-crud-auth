import productsApi from "../api/productsApi"

export class productServices {

    static async getProducts() {
        const { data } = await productsApi.get('/products')
        return data
    }

    static async getProduct(id) {
        const { data } = await productsApi.get(`/products/${id}`)
        return data
    }

    static async addProduct(product) {
        const { data } = await productsApi.post('/products', product)
        return data
    }

    static async updateProduct(id, product) {
        const { data } = await productsApi.put(`/products/${id}`, product)
        return data
    }

    static async deleteProduct(id) {
        const { data } = await productsApi.delete(`/products/${id}`)
        return data
    }
}