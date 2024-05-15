import { useEffect, useContext } from 'react'
import ProductItem from './ProductItem'
import { ProductContext } from '../../context/productsContext/ProductsContext'

const ProductList = () => {

    const { products, getProducts } = useContext(ProductContext)

    useEffect(() => {
        document.title = 'Product List'
        if(products?.length <= 0) getProducts()
    }, [])

    if(products?.length > 0) return (
        <div className=''>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-3'>
                {
                    products?.map( (product, index) => {
                        return <ProductItem product={product} key={index}/>
                    })
                }
            </section>           
        </div>
    )

    return (
        <div className='pt-24 px-8 min-h-screen'>
            <h1 className='text-3xl font-semibold text-center'>Loading...</h1>
        </div>
    )
}

export default ProductList