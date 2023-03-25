import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// - pages
import AdminDadhboard from './pages/admin/AdminDashboard';
import UserRole from './pages/admin/UserRole';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Secret from './pages/Secret';
import Dashboard from './pages/user/Dashboard';
import Shop from "./pages/Shop";

// - components
import Menu from './components/nav/Menu';

//protected routes
import AdminRoute from './components/routes/AdminRoute';
import PrivateRoutes from './components/routes/PrivateRoutes';

//admin routes
import AdminCategory from './pages/admin/AdminCategory';
import AdminProduct from './pages/admin/AdminProduct';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductUpdate from './pages/admin/AdminProductUpdate';

//user routes
import UserOrders from './pages/user/UserOrders';
import UserProfile from './pages/user/UserProfile';
// testing purpose route element
const Testing = () => {
  return (
    <div>Testing</div>
  )
}

function App() {


  return (
    <div className="App">
      <Router>
        <Menu />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
           {/* protected routes */}
           {/* user routes */}
          <Route path="/dashboard" element={<PrivateRoutes />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrders />} />


            {/*now the route is just /dashboard as we left the path is empty */}
            <Route path="testing" element={<Testing />} />
            {/*now the route will be /dashboard/testing*/}
            <Route path="secret" element={<Secret />} />
            
          </Route>
          {/* admin routes */}
          <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDadhboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/product/update/:slug" element={<AdminProductUpdate />} />
          <Route path="user-role" element={<UserRole />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App


