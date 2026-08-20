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

  useEffect(() => {
    fetch(`http://localhost:3001/produk/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data[0]); // ambil data pertama hasil query
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);
}

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
}

const handleSubmit = async (e) => {
    e.prevenDefault()
    await fetch(`http://localhost:3001/produk/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData),
    })
    alert("Produk Berhasil Diperbarui!")
    navigate("/produk")
}

if (loading) {
    return <div className="container mt-4">Loading...</div>
}

return (
    <div className="container mt-4">
        <h2>Edit Produk</h2>
        <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
                <label className="form-label"></label>
            </div>
        </form>
    </div>
)