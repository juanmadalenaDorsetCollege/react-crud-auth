import { useContext, useState } from 'react'
import { CartContext } from '../../context/cartContext/CartContext'
import { Link as NavLink } from 'react-router-dom'

const ProductItem = ({product}) => {
    const [isHovered, setIsHovered] = useState(false)

    const { addTocart } = useContext(CartContext)

    const handleAddToCart = (product) => {
        addTocart(product)
    }
    
    return (
        // <Link to={`/${product.id}`}>
            <section className='h-auto w-full rounded-lg mb-4 cursor-pointer' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <div className='h-96 w-full relative'>
                    <div className='absolute top-2 right-2 flex flex-row gap-1'>
                        {/* <div className='px-3 py-1 rounded-2xl bg-lime-400'>
                            <p className='text-black font-semibold text-center'>
                                New!
                            </p>
                        </div>  */}
                        {
                            product.discountPercentage > 0 && 
                            <div className='px-3 py-1 rounded-2xl bg-red-600'>
                                <p className='text-white font-semibold text-center'>
                                    {product.discountPercentage}% Off
                                </p>
                            </div>
                        }
                        {
                            product.stock < 10 && product.stock > 0 &&
                            <div className='px-3 py-1 rounded-2xl bg-yellow-600'>
                                <p className='text-white font-semibold text-center'>
                                    {product.stock} left
                                </p>
                            </div>
                        }
                        {
                            product.stock === 0 && 
                            <div className='px-3 py-1 rounded-2xl bg-red-600'>
                                <p className='text-white font-semibold text-center'>
                                    Out of Stock
                                </p>
                            </div>
                        }
                    </div>
                    <NavLink to={`/${product._id}`}>
                        <img src={product.thumbnail} alt='product' className='h-96 w-full object-cover rounded-lg'/>
                    </NavLink>
                    <div className='z-10 absolute bottom-2 right-2 flex justify-end items-center'>
                        {
                            isHovered && 
                            <div onClick={() => handleAddToCart(product)} className='h-10 w-10 cursor-pointer flex justify-center items-center bg-zinc-800 bg-opacity-55 backdrop-blur rounded-full'>
                                <p className='text-lg text-white font-bold pb-1'>+</p>
                            </div>
                        }
                    </div>
                </div>
                <div className='flex justify-between px-3 pt-1'>
                    <h3 className='text-lg font-medium'>
                        {product.title}
                    </h3>
                    <p className='font-medium'>
                        {
                            product.discountPercentage > 0 &&
                            <span className='line-through font-normal opacity-80 mr-2'>
                                {product.price?.toFixed(2)} €
                            </span>
                        }
                        <span className=''>
                            {
                                (product.price - (product.price * product.discountPercentage / 100)).toFixed(2) + ' €'
                            }
                        </span>
                    </p>
                </div>
                <div className='flex justify-between px-3'>
                    <h3 className=' '>
                        {product.brand}
                    </h3>
                    <p className='font-medium'>
                        <span className=''>
                            {product.rating?.toFixed(1) ?? 'Not rated'} ⭐  
                        </span>
                    </p>
                </div>
            </section>
        // </Link>
    )
}

export default ProductItem