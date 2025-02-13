import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  FaSearch,
  FaFilter,
  FaSyncAlt,
  FaTrash,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import { fetchAsync, setSearch } from "../todos/customer";
import { useNavigate } from "react-router-dom";
import rupiah from "../helper/rupiah";
import NewCustomer from "./newCustomer";

export default function Customer({ url }) {
  const { customer, loading, error, search } = useSelector(
    (state) => state.customer
  );
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  async function handleDelete(id) {
    try {
      await axios.put(`${url}/deleteCustomer/${id}`);
      handleFetch();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  }
  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      setShowModal(false);
    }
  };

  const filteredCustomers = customer.filter((cust) =>
    cust.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDetail = (id) => {
    navigate(`/customer/${id}`);
  };

  const handleFetch = () => {
    dispatch(fetchAsync());
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold">Customer</h1>
      <p className="text-gray-600">
        You can manage and organize your customer and other things here
      </p>

      <div className="bg-purple-500 text-white p-6 rounded-lg mt-4 shadow-md flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Customer</h2>
          <p>
            On this menu you will be able to create, edit, and delete customers.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleModalToggle}
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold"
          >
            + Add New Customer
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Customer"
              className="p-2 rounded-md text-black"
              value={search}
              onChange={handleSearch}
            />
            <button className="absolute right-1 top-5 transform -translate-y-1/2 text-blue-600">
              <FaSearch />
            </button>
          </div>
          <button className="bg-gray-200 text-black px-4 py-2 rounded-md">
            <FaFilter />
          </button>
          <button
            onClick={handleFetch}
            className="bg-gray-200 text-black px-4 py-2 rounded-md"
          >
            <FaSyncAlt />
          </button>
        </div>
      </div>

      {showModal && (
        <div
          id="modal-backdrop"
          onClick={handleBackdropClick}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all scale-95 animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>
            <NewCustomer
              url={url}
              setShowModal={setShowModal}
              handleFetch={handleFetch}
            />
            <button
              onClick={handleModalToggle}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg mt-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4">Customer Name</th>
              <th>Level</th>
              <th>Favorite Menu</th>
              <th>Total Transaction</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  {error}
                </td>
              </tr>
            ) : (
              filteredCustomers.map((cust) => (
                <tr key={cust.id} className="border-b">
                  <td className="p-4">{cust.name}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-md ${
                        cust.level === "Warga"
                          ? "bg-orange-200 text-orange-600"
                          : cust.level === "Juragan"
                          ? "bg-blue-500 text-blue-900"
                          : cust.level === "Konglomerat"
                          ? "bg-purple-500 text-purple-900"
                          : cust.level === "Sultan"
                          ? "bg-green-500 text-green-900"
                          : "bg-gray-500 text-gray-900"
                      }`}
                    >
                      {cust.level}
                    </span>
                  </td>
                  <td>{cust.favorite_menu}</td>
                  <td>{rupiah(cust.total_transaction)}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleDetail(cust.id)}
                      className="text-blue-600 px-2 pt-4"
                    >
                      <FaEye />
                    </button>
                    <button className="text-green-600 px-2 pt-4">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(cust.id)}
                      className="text-red-600 px-2 pt-4"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
