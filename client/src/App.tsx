import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Products from './pages/General/Products/Products'
import ProductDetails from './components/ProductDetails/ProductDetails'
import RegisterPage from './pages/Auth/Register/RegisterPage'
import Login from './pages/Auth/Login/Login'
import Cart from './pages/General/Cart/Cart'
import Orders from './pages/General/Orders/Orders'
import ManageOrdersPage from './pages/Admin/Orders/ManageOrders'
import ManageProductsPage from './pages/Admin/Products/ManageProducts'
import ManageUsersPage from './pages/Admin/Users/ManageUsers'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/products/details' element={<ProductDetails/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/admin/orders' element={<ManageOrdersPage/>}/>
          <Route path='/admin/products' element={<ManageProductsPage/>}/>
          <Route path='/admin/users' element={<ManageUsersPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
