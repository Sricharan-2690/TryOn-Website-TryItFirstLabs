import React from 'react'
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './pages/Home'
import {Toaster} from "sonner"
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CollectionsPage from './pages/CollectionsPage'
import ProductDetails from './components/Products/ProductDetails'
import CheckOut from './components/Cart/CheckOut'
import OrdersConfirmationPage from './pages/OrdersConfirmationPage'
import OrderDetails from './pages/OrderDetails'
import MyOrdersPage from './pages/MyOrdersPage'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminLayout from './components/Admin/AdminLayout'
import AdminHomePage from './pages/AdminHomePage'
import UserManagement from './components/Admin/UserManagement'
import ProductManagement from './components/Admin/ProductManagement'
import EditProductPage from './components/Admin/EditProductPage'
import OrderManagement from './components/Admin/OrderManagement'

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from './components/Common/protectedRoute'

const App = () => {
  return (
    <Provider store={store}>
      <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
    <BrowserRouter>
    <Toaster position="top-right"/>
      <Routes>

          {/* user layout */}
          <Route path='/' element={<UserLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/collections/:collection' element={<CollectionsPage/>}></Route>
            <Route path='/product/:id' element={<ProductDetails/>}></Route>
            <Route path='/checkout' element={<CheckOut/>}></Route>
            <Route path='/order-confirmation' element={<OrdersConfirmationPage/>}></Route>
            <Route path='/order/:id' element={<OrderDetails/>}></Route>
            <Route path='/my-orders' element={<MyOrdersPage/>}></Route>
          </Route>

           {/* admin layout */}
          <Route path='/admin' element={<ProtectedRoute role="admin"><AdminLayout/></ProtectedRoute>}>
            <Route index element={<AdminHomePage/>} ></Route>
            <Route path="users" element={<UserManagement/>}></Route>
            <Route path="products" element={<ProductManagement/>}></Route>
            <Route path="products/:id/edit" element={<EditProductPage/>}></Route>
            <Route path="orders" element={<OrderManagement/>}></Route>
          </Route>

      </Routes>
    </BrowserRouter>
    </PayPalScriptProvider>
    </Provider>
  )
}

export default App
