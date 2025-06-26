import { useEffect, useState } from "react";
import { getAllProducts } from "../../../api/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  if (products.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">No products found.</p>
    );
  }

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    }
  };

  return (
    <>
      <div className="overflow-x-auto shadow-md rounded-lg max-w-4xl mx-auto mt-10">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-indigo-600 text-white text-left">
              <th className="py-3 px-6 rounded-tl-lg">Name</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6 rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-6">{product.name}</td>
                <td className="py-3 px-6">{product.price}</td>
                <td className="py-3 px-6">{product.quantity}</td>
                <td className="py-3 px-6 space-x-4">
                  <button className="text-indigo-600 hover:text-indigo-900 font-semibold">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 font-semibold">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
