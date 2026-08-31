import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Produk from "./pages/Produk";
import Kategori from "./pages/Kategori";
import Tentang from "./pages/Tentang";
import AddProduk from "./pages/AddProduk";
import EditProduk from "./pages/EditProduk";

function ProtectedRouter({ children }) {
  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/Login" element={<Login />} />

        <Route path="/"
        element={
          <ProtectedRouter>
            <Layout />
          </ProtectedRouter>
        }
        >

          <Route index element={<Home />} />
          <Route path="produk" element={<Produk />} />
          <Route path="kategori" element={<Kategori />} />
          <Route path="tentang" element={<Tentang />} />
          <Route path="produk/tambah" element={<AddProduk />} />
          <Route path="produk/edit/:id" element={<EditProduk />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}