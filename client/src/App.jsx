import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// - pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';

// - components
import Menu from './components/nav/Menu';
function App() {
  

  return (
    <div className="App">
     <Router>
        <Menu/>
        <Toaster/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
     </Router>
    </div>
  )
}

export default App
