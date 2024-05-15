import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/cartContext/CartContext'


const CartButton = () => {
    const { products, removeProduct } = useContext(CartContext)

    const [showModal, setShowModal] = useState(false)
    const [total, setTotal] = useState(0)
    const [totalProducts, setTotalProducts] = useState(0)

    useEffect(() => {

        const total = products.reduce((acc, product) => {
            return acc + ((product.price - (product.price * product.discountPercentage / 100)) * product.quantity)
        }, 0)
        setTotal(total)            

        const totalProducts = products.reduce((acc, product) => {
            return acc + product.quantity
        }, 0)
        setTotalProducts(totalProducts)

    }, [products])

    return (
        <>
            <div 
                className="fixed bottom-4 right-8 w-16 h-16 rounded-full flex items-center justify-center bg-white bg-opacity-100 backdrop-blur shadow-2xl cursor-pointer z-50"
                onClick={() => setShowModal(true)}
            >
                    <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png" alt="cart" className="w-8 h-8"/>
                    {
                        products.length > 0 &&
                        <div className="absolute right-0 top-0 px-2 py-0 bg-red-600 rounded-full">
                            <p className="font-medium text-lg text-white">
                                {totalProducts}
                            </p>
                        </div>
                    }
            </div>
            {
                showModal &&
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white px-6 py-8 rounded-lg w-2/3">
                        {/* <h1 className="text-2xl font-semibold">Cart</h1> */}
                        <ul>
                            {
                                products.length === 0 &&
                                <li className="flex items-center justify-center border-b py-4 px-2">
                                    <p className='font-medium text-lg'>No products in cart</p>
                                </li>
                            }
                            {
                                products.length > 0 &&
                                <li className="flex items-center justify-between border-b py-4 px-2">
                                    <p className='text-left font-medium text-lg w-5/12'>Title</p>
                                    <p className='font-medium text-lg w-1/12'>Quantity</p>
                                    <p className='font-medium text-lg w-1/12'>Price</p>
                                    <p className='font-medium text-lg w-1/12'>Total</p>
                                    <p className='font-medium text-lg w-1/12'>Discount</p>
                                    <p className='font-medium text-lg w-1/12'>Final Price</p>
                                    <p className='w-1/12'></p>
                                </li>
                            }
                            {

                                products.map((product, index) => (                                    
                                    <li key={product.id} className="flex items-center justify-between border-b py-4 px-2">
                                        <p className='font-medium text-lg w-5/12'>{product.title}</p>
                                        <p className='font-medium text-lg w-1/12'>{product.quantity}</p>
                                        <p className='font-medium text-lg w-1/12'>{product.price.toFixed(2) + ' €'}</p>
                                        <p className='font-medium text-lg w-1/12'>{(product.price * product.quantity).toFixed(2) + ' €'}</p>
                                        <p className='font-medium text-lg w-1/12'>{product.discountPercentage + '%'}</p>
                                        <p className='font-medium text-lg w-1/12'>{((product.price - (product.price * product.discountPercentage / 100)) * product.quantity).toFixed(2) + ' €'}</p>
                                        <button className='w-1/12' onClick={() => removeProduct(product)}>❌</button>
                                    </li>
                                ))
                            }
                            <li className="flex items-center justify-between border-b py-4 px-2 bg-neutral-100">
                                <p className='font-medium text-lg w-10/12'>Total</p>
                                <p className='font-medium text-xl w-2/12'>{total.toFixed(2) + ' €'}</p>
                            </li>
                        </ul>
                        <button onClick={() => setShowModal(false)} className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4">Close</button>
                    </div>
                </div>
            }
        </>
    )
}

export default CartButton