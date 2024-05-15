import { useContext, useEffect, useState } from "react";
import { NavLink, ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../context/productsContext/ProductsContext";
import { CartContext } from "../context/cartContext/CartContext";
import Gallery from "../components/common/Gallery";
import { productServices } from "../services/productServices";
import { toast } from "sonner";
import { AuthContext } from "../context/authContext/AuthContext";


export default function ProductDetails() {

    let { id } = useParams();
    const { getProduct, product, removeProductSelected, getProducts  } = useContext(ProductContext)
    const { addTocart } = useContext(CartContext)
    const { status } = useContext(AuthContext)

    //scroll position of the list
    const scrollPosition = window.scrollY

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
        getProduct(id)
        return () => {
            removeProductSelected()
            window.scrollTo(0, scrollPosition)
        }
    }, [id])

    const handleAddToCart = () => {
        addTocart(product)
    }

    const handleDelete = async () => {
      await productServices.deleteProduct(id)
      toast.success('Product deleted successfully')
      getProducts(true)
      navigate('/')
    }

    return (
      <>
        <section className="grid grid-cols-1 md:grid-cols-3">
          <div className="snap-y snap-mandatory h-[62dvh] overflow-scroll md:h-auto md:col-span-2">
            <Gallery images={product.images} />
          </div>
          <div>
            <div className="sticky top-24 md:px-4 pb-8">
              <div className=" rounded-lg bg-gray-100 px-4 py-6">
                <h1 className="text-3xl font-medium">{product.title}</h1>
                <p className="text-xl">{product.brand}</p>
                <p className="text-lg">{product.rating}⭐</p>
                <p className="mt-2 font-medium">
                  Description
                </p>
                <p className="">{product.description}</p>
                <div className="mt-2">
                  <p className="text-2xl font-medium">
                    <span className={`${product.discountPercentage > 0 ? 'line-through opacity-70' : null}`}>
                      {product.price}$
                    </span>
                    {
                      product.discountPercentage > 0 && 
                      <span className="text-red-600 ml-2">
                            {
                                (product.price - (product.price * product.discountPercentage / 100)).toFixed(2) + ' €'
                            }                     
                        </span>
                    }
                  </p>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <button className="bg-sky-800 w-full py-2 rounded-lg" onClick={handleAddToCart}>
                    <span className="text-white font-medium">
                      Add to Cart
                    </span>
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className=""> <span className="text-3xl">🚗</span> Delivery in 3-6 working days. Free shipping over €49</p>
              </div>
              {
                status == 'authorized' &&
                <div className="flex justify-end gap-4">
                  {/* edit button */}
                  <NavLink to={`/editproduct/${id}`} className="bg-sky-800 text-white text-center w-40 py-2 rounded-lg mt-4">
                    <span className="font-medium">
                      Edit
                    </span>
                  </NavLink>
                  {/* delete button */}
                  <button className="bg-red-600 text-white w-40 py-2 rounded-lg mt-4" onClick={handleDelete}>
                    <span className="font-medium">
                      Delete
                    </span>
                  </button>
                </div>
              }
            </div>
          </div>
        </section>
      </>
    )
}