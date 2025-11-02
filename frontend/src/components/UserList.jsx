import { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching users');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      fetchUsers();
    } catch (err) {
      setError('Error deleting user');
    }
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setEditFormData({
      name: user.name,
      email: user.email
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/users/${editingId}`, editFormData);
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setError('Lỗi cập nhật người dùng');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error === 'Error fetching users' ? 'Lỗi tải danh sách người dùng' : error}</div>;

  return (
    <div className="user-list">
      <h2>Danh Sách Người Dùng</h2>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {editingId === user._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingId === user._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingId === user._id ? (
                  <>
                    <button onClick={handleUpdate} className="save-btn">
                      Lưu
                    </button>
                    <button onClick={() => setEditingId(null)} className="cancel-btn">
                      Hủy
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(user)}
                      className="edit-btn"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="delete-btn"
                    >
                      Xóa
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;