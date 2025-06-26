import { useState } from "react";
import { createProduct } from "../../../api/api";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name.trim() === "" ||
      !form.price.trim() === "" ||
      !form.quantity.trim() === ""
    ) {
      alert("All fields are required.");
      return;
    }
    try {
      const res = await createProduct(form);
      setForm({
        name: "",
        price: "",
        quantity: "",
      });
      setSuccess(res.data.message);
      console.log(res.data);
    } catch (err) {
      setError(err.response.data.message);
      alert("Product creation failed.");
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
            >
              ➕ Create Product
            </button>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition duration-300"
            >
              🔍 View All Products
            </button>
          </div>
          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 mt-3 text-center">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
