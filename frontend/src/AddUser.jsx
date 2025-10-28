import React, { useState, useEffect } from "react";
import axios from "axios";

function AddUser({ fetchUsers, editingUser, onUpdate, cancelEdit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      alert("⚠️ Tên không được để trống");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("⚠️ Email không hợp lệ");
      return;
    }

    setLoading(true);
    try {
      if (editingUser) {
        await onUpdate({ _id: editingUser._id, name, email });
      } else {
        await axios.post("http://localhost:5000/users", { name, email });
        fetchUsers();
        alert("✅ Thêm người dùng thành công!");
      }
      setName("");
      setEmail("");
    } catch (err) {
      alert("❌ Lỗi khi lưu người dùng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: "20px",
        borderRadius: "16px",
        backdropFilter: "blur(10px)",
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>
          {editingUser ? "✏️ Sửa Người Dùng" : "➕ Thêm Người Dùng"}
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", color: "#fff" }}>Tên người dùng</label>
          <input
            type="text"
            placeholder="Nhập tên..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", color: "#fff" }}>Email</label>
          <input
            type="email"
            placeholder="Nhập email..."
            value={email}
            disabled={!!editingUser} // không đổi email khi edit
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: editingUser ? "#f2f2f2" : "#fff",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: editingUser
              ? "linear-gradient(90deg, #00b09b, #96c93d)"
              : "linear-gradient(90deg, #007bff, #00c6ff)",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loading ? "Đang lưu..." : editingUser ? "Lưu thay đổi" : "Thêm"}
        </button>

        {editingUser && (
          <button
            type="button"
            onClick={cancelEdit}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "gray",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Hủy
          </button>
        )}
      </form>
    </div>
  );
}

export default AddUser;