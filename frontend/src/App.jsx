import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'
import UserList from './components/UserList'
import AddUser from './components/AddUser'
import AdminRoute from './components/AdminRoute'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import axios from 'axios'
import Home from './pages/Home'
function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/"></Link>
      </div>
      <div className="auth-section">
        {user ? (
          <div className="avatar-container">
            <div 
              className="avatar" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  Trang cá nhân
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="dropdown-item"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-button">
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={
              <AdminRoute>
                <UserList />
              </AdminRoute>
            } />
            <Route path="/add" element={
              <AdminRoute>
                <AddUser />
              </AdminRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<div>Trang cá nhân</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App