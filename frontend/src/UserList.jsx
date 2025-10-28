import React from "react";
import axios from "axios";

function UserList({ users, fetchUsers, showToast }) {
  // 🗑️ Xóa người dùng
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này không?")) return;
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers();
      showToast("🗑️ Đã xóa người dùng");
    } catch (err) {
      showToast("❌ Lỗi khi xóa người dùng", false);
      console.error(err);
    }
  };

  // ✏️ Sửa người dùng
  const handleEdit = async (id) => {
    const newName = prompt("Nhập tên mới:");
    const newEmail = prompt("Nhập email mới:");
    if  (!newName   || !newEmail) return;

    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        name: newName,
        email: newEmail,
      });
      showToast("✏️ Cập nhật thành công!");
      fetchUsers();
    } catch (err) {
      showToast("❌ Lỗi khi cập nhật người dùng", false);
      console.error(err);
    }
  };

  return (
    <div>
      <div className="toolbar">
        <h3>Danh sách người dùng ({users.length})</h3>
        <div className="badge">Tổng {users.length}</div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button className="btn btn-ghost" onClick={() => handleEdit(u.id)}>
                  ✏️ Sửa
                </button>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "6px" }}
                  onClick={() => handleDelete(u.id)}
                >
                  🗑️ Xóa
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", color: "var(--muted)" }}>
                Không có người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
