import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// - pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

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
