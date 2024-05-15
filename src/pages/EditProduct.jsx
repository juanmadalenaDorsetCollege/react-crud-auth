import React, { useContext, useEffect, useRef, useState } from 'react'
import { productServices } from '../services/productServices'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { AuthContext } from '../context/authContext/AuthContext'
import { ProductContext } from '../context/productsContext/ProductsContext'

export default function EditProduct() {

    const { id } = useParams()
    const { getProducts, getProduct, product, removeProductSelected } = useContext(ProductContext)
    const navigate = useNavigate()
    const { status } = useContext(AuthContext)

    useEffect(() => {
        if(status !== 'authorized'){
            navigate('/')
        }
    }, [status])

    useEffect(() => {
        if(!id) navigate('/')
        getProduct(id)
        return () => {
            removeProductSelected()
        }   
    }, [])

    useEffect(() => {
        setTitle(product.title)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
        setPrice(product.price)
        setDiscountPercentage(product.discountPercentage)
        setStock(product.stock)
        setRating(product.rating)
        setThumbnail(product.thumbnail)
        setImages(product.images)
    }, [product])

    const [title, setTitle] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [discountPercentage, setDiscountPercentage] = useState('')
    const [stock, setStock] = useState('')
    const [rating, setRating] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [images, setImages] = useState('')

    const [error, setError] = useState(null)

    const handleUpdateProduct = async () => {
        setError(null)
        console.log(title, brand, category, description, price, discountPercentage, stock, thumbnail, images, rating)
        if(!title || !brand || !category || !description || !price || !discountPercentage || !stock || !thumbnail || !images || !rating) return setError('All fields are required')
        if(rating < 0 || rating > 5) return setError('Rating must be between 0 and 5')
        try{
            await productServices.updateProduct(id, {title, brand, category, description, price, discountPercentage, stock, thumbnail, images, rating})
            getProducts(true)
            navigate('/')
            toast.success('Product updated successfully')
        }
        catch(err){
            setError('Error updating product')
            console.log(err)
        }
    }

    return (
        <section className='flex items-center justify-center flex-col'>
            <h1 className="text-3xl font-semibold text-center">Update Product</h1>
            <div className="w-2/3 min-w-96 mt-3 py-8 bg-neutral-100 rounded-lg flex items-center justify-center flex-col">
                <div className="w-[80%]">
                    <input type="text" value={title} placeholder="Title" className="w-full p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4" onChange={({target}) => setTitle(target.value)}/>
                    <input type="text" value={brand} placeholder="Brand" className="w-full p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4" onChange={({target}) => setBrand(target.value) }/>
                    <input type="text" value={category} placeholder="Category" className="w-full p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4" onChange={({target}) => setCategory(target.value) }/>
                    <input type="text" value={description} placeholder="Description" className="w-full p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4" onChange={({target}) => setDescription(target.value) }/>
                    <div className="flex justify-between gap-4">
                        <input type="number" value={price} placeholder="Price" className="w-1/3 p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4"  onChange={({target}) => setPrice(target.value) }/>
                        <input type="number" value={discountPercentage} placeholder="Discount %" className="w-1/3 p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4"  onChange={({target}) => setDiscountPercentage(target.value) }/>
                        <input type="number" value={stock} placeholder="Stock" className="w-1/3 p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4"  onChange={({target}) => setStock(target.value) }/>
                        <input type="number" max={5} min={0} value={rating} placeholder="Rating" className="w-1/3 p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4"  onChange={({target}) => setRating(target.value) }/>
                    </div>
                    <input type="text" value={thumbnail} placeholder="Thumbnail Url" className="w-full p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4" onChange={({target}) => setThumbnail(target.value)}/>
                    <input type="text" value={images} placeholder="images Url" className="w-full p-3 font-medium rounded-lg bg-neutral-50 border-2 border-neutral-200 mb-4" onChange={({target}) => setImages(target.value)}/>
                    <p className="text-red-600 text-center">{error}</p>
                    <button className="w-full p-3 rounded-md border bg-neutral-300 hover:bg-neutral-400" onClick={handleUpdateProduct}>
                        <span className="font-bold">
                            Update Product
                        </span>
                    </button>
                </div>
            </div>
        </section>
    )
}
