import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "./AddUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [users, setUsers] = useState([]);          // state danh sách người dùng
  const [editingUser, setEditingUser] = useState(null); // state người dùng đang edit
  const API_URL = "http://localhost:5000/users";

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      toast.error("❌ Lỗi khi tải danh sách người dùng");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xóa người dùng
  const handleDelete = async (_id) => {
    if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
    try {
      await axios.delete(`${API_URL}/${_id}`);
      setUsers(users.filter((u) => u._id !== _id));
      toast.success("🗑️ Xóa thành công!");
    } catch (err) {
      toast.error("❌ Lỗi khi xóa người dùng");
    }
  };

  // Chọn người dùng để edit
  const handleEdit = (user) => setEditingUser(user);

  // Cập nhật người dùng
  const handleUpdate = async (updatedUser) => {
    try {
      await axios.put(`${API_URL}/${updatedUser._id}`, {
        name: updatedUser.name,
        email: updatedUser.email,
      });
      fetchUsers();
      setEditingUser(null);
      toast.success("✏️ Cập nhật thành công!");
    } catch (err) {
      toast.error("❌ Lỗi khi cập nhật người dùng");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <AddUser
        fetchUsers={fetchUsers}
        editingUser={editingUser}
        onUpdate={handleUpdate}
        cancelEdit={() => setEditingUser(null)}
      />

      <div
        style={{
          marginTop: "30px",
          width: "100%",
          maxWidth: "600px",
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          padding: "20px",
          color: "#333",
        }}
      >
        <h3 style={{ color: "#fff", textAlign: "center" }}>📋 Danh Sách Người Dùng</h3>
        {users.length === 0 ? (
          <p style={{ textAlign: "center", color: "#fff" }}>Chưa có người dùng nào.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {users.map((u) => (
              <li
                key={u._id}
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  margin: "10px 0",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  <strong>{u.name}</strong> - {u.email}
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleEdit(u)}
                    style={{
                      background: "linear-gradient(90deg, #00b09b, #96c93d)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    style={{
                      background: "linear-gradient(90deg, #ff5f6d, #ffc371)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
