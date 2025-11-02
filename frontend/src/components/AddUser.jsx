import { useState } from 'react';
import axios from 'axios';

function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;
    if (!formData.name.trim()) {
      tempErrors.name = 'Vui lòng nhập tên';
      isValid = false;
    } else if (formData.name.length < 2) {
      tempErrors.name = 'Tên phải có ít nhất 2 ký tự';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = 'Vui lòng nhập email';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Email không hợp lệ';
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
        const response = await axios.post('http://localhost:3000/users', formData);
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: ''
        });
      } catch (err) {
        setSubmitStatus('error');
        setErrors({
          ...errors,
          submit: err.response?.data?.message || 'Error creating user'
        });
      }
    }
  };

  return (
    <div className="add-user-form">
      <h2>Thêm Người Dùng Mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

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

        {errors.submit && <div className="error-message">{errors.submit}</div>}
        
        <button 
          type="submit" 
          disabled={submitStatus === 'submitting'}
        >
          {submitStatus === 'submitting' ? 'Đang thêm...' : 'Thêm Người Dùng'}
        </button>

        {submitStatus === 'success' && (
          <div className="success-message">Thêm người dùng thành công!</div>
        )}
      </form>
    </div>
  );
}

export default AddUser;