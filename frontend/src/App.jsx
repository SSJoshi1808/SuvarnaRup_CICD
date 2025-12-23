import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLayout from './components/layout/UserLayout';
import Home from "./pages/Home"
import { Toaster } from "sonner"
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from './pages/CollectionPage';
import Productdetails from './components/products/Productdetails';
import CheckOut from './components/cart/CheckOut';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/admin/UserManagement';
import ProductManagement from './components/admin/ProductManagement';
import AddProduct from './components/admin/AddProduct';
import EditProductPage from './components/admin/EditProductPage';
import OrderManagement from './components/admin/OrderManagement';
import { Provider } from 'react-redux';
import store from "./redux/store"
import OrderDetails from './pages/OrderDetails';
import PrivateRoute from './components/common/PrivateRoute';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import Features from './pages/Features';
import Myorder from './pages/Myorder';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>{/*Uesr Layout */}
            <Route index element={<Home />}></Route>
            <Route path='login' element={<Login />} ></Route>
            <Route path='register' element={<Register />} ></Route>
            <Route path='profile' element={<Profile />} ></Route>
            <Route path='collections/:collection' element={<CollectionPage />}></Route>
            <Route path='product/:id' element={<Productdetails />}></Route>
            <Route path="CheckOut" element={<CheckOut />}></Route>
            <Route path="orderconfirmationpage" element={<OrderConfirmationPage />}></Route>
            <Route path="order/:id" element={<OrderDetails />}></Route>
            <Route path="myorders" element={<PrivateRoute><Myorder /></PrivateRoute>}></Route>
            <Route path="about" element={<AboutUs />}></Route>
            <Route path="faq" element={<FAQ />}></Route>
            <Route path="features" element={<Features />}></Route>
          </Route>
          <Route path="/admin" element={<PrivateRoute requireAdmin={true}><AdminLayout /></PrivateRoute>}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </Provider>
  )
}

export default App
