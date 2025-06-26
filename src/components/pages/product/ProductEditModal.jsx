import { useState } from "react";
import { editProduct } from "../../../api/api";

const ProductEditModal = ({ product, onClose }) => {
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editProduct(product._id, form);
      onClose();
    } catch (error) {
      alert("Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
  <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Product</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Enter product name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Enter price"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Enter quantity"
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition"
        >
          Update
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default ProductEditModal;
