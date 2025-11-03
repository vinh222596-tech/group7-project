import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      tempErrors.email = 'Vui lòng nhập email';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Email không hợp lệ';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setSubmitStatus('submitting');
        const response = await axios.post('http://localhost:3000/forgot-password', { email });
        setSubmitStatus('success');
        // Reset form
        setEmail('');
      } catch (err) {
        setSubmitStatus('error');
        setErrors({
          submit: err.response?.data?.message || 'Gửi yêu cầu thất bại'
        });
      }
    }
  };

  return (
    <div className="forgot-password-form">
      <h2>Quên Mật Khẩu</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email của bạn"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}
        
        <button 
          type="submit" 
          disabled={submitStatus === 'submitting'}
          className="primary-button"
        >
          {submitStatus === 'submitting' ? 'Đang gửi...' : 'Gửi Mã Xác Nhận'}
        </button>

        {submitStatus === 'success' && (
          <div className="success-message">
            Mã xác nhận đã được gửi đến email của bạn!
          </div>
        )}

        <div className="auth-links">
          <Link to="/login" className="link-button">Quay lại đăng nhập</Link>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;