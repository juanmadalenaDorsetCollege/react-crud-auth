import { CartProvider } from './context/cartContext/CartContext.jsx'
import HomePage from './pages/HomePage.jsx'
import { Routes, Route } from 'react-router-dom'
import BasicLayout from './pages/layouts/BasicLayout.jsx'
import { ProductProvider } from './context/productsContext/ProductsContext.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Login from './pages/Login.jsx'
import AuthLayout from './pages/layouts/AuthLayout.jsx'
import Register from './pages/Register.jsx'
import { AuthProvider } from './context/authContext/AuthContext.jsx'
import AddProduct from './pages/AddProduct.jsx'
import EditProduct from './pages/EditProduct.jsx'

const AppContext = ({children}) => {
    return ( 
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    )
}

function App() {

  return (
    <>
      <AppContext>
        <Routes>
          <Route path="/" element={<BasicLayout/>}>
            <Route index element={<HomePage />} />
            <Route path=':id' element={<ProductDetails />} />
            <Route path='addproduct' element={<AddProduct/>} />
            <Route path='editproduct/:id' element={<EditProduct/>} />
          </Route>
          <Route path="/auth" element={<AuthLayout/>}>
            <Route index element={<Login/>} />
            <Route path='register' element={<Register/>} />
          </Route>
          </Routes>
      </AppContext>
    </>
  )
}

export default App
