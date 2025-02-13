import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function CustomerDetail({ url }) {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [newJumlah, setNewJumlah] = useState(0);
  const navigate = useNavigate();

  async function fetchDataCustomer() {
    try {
      const { data } = await axios.get(`${url}/${id}`);
      setCustomer(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchDataTransaction() {
    try {
      const { data } = await axios.get(`${url}/transaction/${id}`);
      setTransaction(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function updateTransaction(transactionId) {
    try {
      await axios.put(
        `${url}/updateTransaction/${transactionId}`,
        { jumlah: newJumlah },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchDataTransaction();
      setEditingTransactionId(null);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  }

  function backNavigate() {
    navigate(-1);
  }

  useEffect(() => {
    fetchDataCustomer();
    fetchDataTransaction();
  }, []);

  if (!customer) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <button
        onClick={backNavigate}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        <FaArrowLeft className="w-5 h-5 mr-2" />
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">Customer Detail</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm">
        <p className="text-lg">
          <strong>Name:</strong> {customer.name}
        </p>
        <p className="text-lg">
          <strong>Level:</strong> {customer.level}
        </p>
        <p className="text-lg">
          <strong>Total Transaction:</strong> Rp {customer.total_transaction}
        </p>
        <p className="text-lg">
          <strong>Favorite Menu:</strong> {customer.favorite_menu}
        </p>
        <p className="text-lg">
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold ${
              customer.aktif ? "text-green-600" : "text-red-600"
            }`}
          >
            {customer.aktif ? "Active" : "Inactive"}
          </span>
        </p>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-3">
        Transaction History
      </h2>
      {transaction.length > 0 ? (
        <ul className="bg-gray-50 p-4 rounded-lg shadow-sm">
          {transaction.map((t, index) => (
            <li
              key={index}
              className="border-b py-2 last:border-b-0 hover:bg-gray-100 transition duration-200"
            >
              <p>
                <strong>Product Name:</strong> {t.produk_name}
              </p>
              {editingTransactionId === t.id ? (
                <div>
                  <input
                    type="number"
                    value={newJumlah}
                    onChange={(e) => setNewJumlah(e.target.value)}
                    className="border p-1 rounded"
                  />
                  <button
                    onClick={() => updateTransaction(t.id)}
                    className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTransactionId(null)}
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p>
                  <strong>Jumlah:</strong> {t.jumlah}{" "}
                  <button
                    onClick={() => {
                      setEditingTransactionId(t.id);
                      setNewJumlah(t.jumlah);
                    }}
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </p>
              )}
              <p>
                <strong>Total Harga:</strong> Rp {t.total_harga}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No transactions available.</p>
      )}
    </div>
  );
}
