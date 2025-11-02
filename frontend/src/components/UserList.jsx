import { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => window.location.href = `/edit-user/${user._id}`}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;