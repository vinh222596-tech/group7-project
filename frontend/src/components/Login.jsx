import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = 'Vui lòng nhập email';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Email không hợp lệ';
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = 'Vui lòng nhập mật khẩu';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setSubmitStatus('submitting');
        const response = await axios.post('http://localhost:3000/login', formData);
        setSubmitStatus('success');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      } catch (err) {
        setSubmitStatus('error');
        setErrors({
          ...errors,
          submit: err.response?.data?.message || 'Đăng nhập thất bại'
        });
      }
    }
  };

  return (
    <div className="login-form">
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}
        
        <button 
          type="submit" 
          disabled={submitStatus === 'submitting'}
          className="primary-button"
        >
          {submitStatus === 'submitting' ? 'Đang đăng nhập...' : 'Đăng Nhập'}
        </button>

        <div className="auth-links">
          <Link to="/signup" className="link-button">Đăng Ký</Link>
          <Link to="/forgot-password" className="link-button">Quên Mật Khẩu</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;