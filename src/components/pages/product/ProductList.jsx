import { useEffect, useState } from "react";
import { getAllProducts } from "../../../api/api";
import ProductEditModal from "./ProductEditModal";
import { productDelete } from "../../../api/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      setProducts(res.data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-300 opacity-30"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">No products found.</p>
    );
  }

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleModalClose = () => {
    setEditProduct(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const res = await productDelete(id);
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product");
      console.log(err);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Products
        </h1>

        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Quantity</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 px-6 text-center text-gray-500"
                  >
                    No products available.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                  >
                    <td className="py-4 px-6 font-semibold">{product.name}</td>
                    <td className="py-4 px-6">${product.price}</td>
                    <td className="py-4 px-6">{product.quantity}</td>
                    <td className="py-4 px-6 space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editProduct && (
        <ProductEditModal
          product={editProduct}
          onClose={handleModalClose}
        ></ProductEditModal>
      )}
    </>
  );
};

export default ProductList;
