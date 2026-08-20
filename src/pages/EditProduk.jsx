import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    harga: "",
    id_kategori: "",
  });

  const [loading, setLoading] = useState(true);

  // Mengambil data produk berdasarkan ID
  useEffect(() => {
    fetch(`http://localhost:3001/produk/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setLoading(false);
      });
  }, [id]);

  // Mengubah isi form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Menyimpan perubahan
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("Yakin mau menyimpan perubahan ini?")) {
        try {
      const res = await fetch(`http://localhost:3001/produk/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Produk berhasil diperbarui!");
        navigate("/produk");
      } else {
        const data = await res.json();
        alert(data.message || "Gagal memperbarui produk");
      }
      
      
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan saat memperbarui produk");
    }
  };
    }

    

  // Loading
  if (loading) {
    return (
      <div className="container mt-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Edit Produk ✨</h2>

      <form onSubmit={handleSubmit} className="mt-3">

        {/* Judul */}
        <div className="mb-3">
          <label className="form-label">Judul Produk</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="form-control"
            placeholder="Masukkan judul produk"
            required
          />
        </div>

        {/* Deskripsi */}
        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            className="form-control"
            placeholder="Masukkan deskripsi produk"
            rows="4"
          ></textarea>
        </div>

        {/* Harga */}
        <div className="mb-3">
          <label className="form-label">Harga</label>
          <input
            type="number"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            className="form-control"
            placeholder="Masukkan harga"
            required
          />
        </div>

        {/* ID Kategori */}
        <div className="mb-3">
          <label className="form-label">ID Kategori</label>

          <select
            name="id_kategori"
            value={formData.id_kategori}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="1">Sunscreen</option>
            <option value="4">Toner</option>
          </select>
        </div>

        {/* Tombol */}
        <button
          type="submit"
          className="btn btn-success me-2"
        >
          Simpan Perubahan
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/produk")}
        >
          Batal
        </button>

      </form>
    </div>
  );
}