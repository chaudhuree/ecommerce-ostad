import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// - pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Dashboard from './pages/user/Dashboard';
import Secret from './pages/Secret';

// - components
import Menu from './components/nav/Menu';
import PrivateRoutes from './components/routes/PrivateRoutes';

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          // protected routes
          <Route path="/dashboard" element={<PrivateRoutes />}>
            <Route path="" element={<Dashboard />} /> //now the route is just /dashboard as we left the path is empty
            <Route path="testing" element={<Testing />} /> //now the route will be /dashboard/testing
            <Route path="secret" element={<Secret/>} />
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
