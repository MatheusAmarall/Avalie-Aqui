import './App.css';
import Login
 from './pages/Login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
