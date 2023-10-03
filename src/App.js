import './App.css';
import Login
 from './pages/Login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Produto from './pages/Produto/Produto';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/produto" element={<Produto />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
