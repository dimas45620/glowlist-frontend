import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.auth) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("idPengguna", data.id_pengguna);
        localStorage.setItem("nama", data.nama);

        alert("Login berhasil, selamat datang " + data.nama + "!");
        navigate("/produk");
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login GlowList</h2>

      <form onSubmit={handleSubmit} className="mt-3">

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>

      </form>
    </div>
  );
}
