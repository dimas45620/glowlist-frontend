import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduk() {
  const navigate = useNavigate();

  const [kategori, setKategori] = useState([]);

  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    harga: "",
    id_kategori: "",
  });

  useEffect(() => {
    getKategori();
  }, []);

  const getKategori = async () => {
    try {
      const res = await fetch("http://localhost:3001/kategori");
      const data = await res.json();
      setKategori(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/produk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Produk berhasil ditambahkan");
        navigate("/produk");
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Tambah Produk</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            name="judul"
            className="form-control"
            value={formData.judul}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea
            name="deskripsi"
            className="form-control"
            value={formData.deskripsi}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Harga</label>
          <input
            type="number"
            name="harga"
            className="form-control"
            value={formData.harga}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Kategori</label>

          <select
            name="id_kategori"
            className="form-control"
            value={formData.id_kategori}
            onChange={handleChange}
            required
          >
            <option value="">-- Pilih Kategori --</option>

            {kategori.map((item) => (
              <option
                key={item.id_kategori}
                value={item.id_kategori}
              >
                {item.kategori}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" type="submit">
          Simpan Produk
        </button>
      </form>
    </div>
  );
}