import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NewCustomer({ url, handleFetch, handleModalToggle }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Warga");
  const levels = ["Warga", "Juragan", "Sultan", "Konglomerat"];
  const [favoriteMenu, setFavoriteMenu] = useState("");
  const [produkList, setProdukList] = useState([]);

  useEffect(() => {
    async function getProduk() {
      try {
        const { data } = await axios.get(`${url}/produk`);
        setProdukList(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProduk();
  }, [url]);

  async function handleSubmit(e) {
    e.preventDefault();
    const newCustomer = { name, level, ProdukId: favoriteMenu };

    try {
      await axios.post(`${url}/createCustomer`, newCustomer, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      handleFetch();
      setName("");
      setFavoriteMenu("");
      handleModalToggle();
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tambah Customer Baru</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Nama:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2">Level:</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>

        <label className="block mb-2">Menu Favorit:</label>
        <select
          value={favoriteMenu}
          onChange={(e) => setFavoriteMenu(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        >
          <option value="">Pilih menu</option>
          {produkList.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Tambah Customer
        </button>
      </form>
    </div>
  );
}
