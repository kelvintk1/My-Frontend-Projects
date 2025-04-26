import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Slideshow from './Slideshow';
import Register from './Register';
import Login from './Login';
import Verify from './Verify';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Slideshow />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/Home" element={<Home />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;