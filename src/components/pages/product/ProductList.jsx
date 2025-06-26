import { useEffect, useState } from "react";
import { getAllProducts } from "../../../api/api";
import ProductEditModal from "./ProductEditModal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    }
  };

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

  return (
    <>
      <div className="max-w-6xl mx-auto mt-12 px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Product List
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
                    <td className="py-4 px-6">₹{product.price}</td>
                    <td className="py-4 px-6">{product.quantity}</td>
                    <td className="py-4 px-6 space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
                      >
                        Edit
                      </button>
                      <button className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50">
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
