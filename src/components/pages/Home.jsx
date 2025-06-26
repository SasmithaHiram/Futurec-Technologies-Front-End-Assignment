import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to Product Manager
      </h1>
      <div className="space-x-4">
        <Link
          to="/register"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Login
        </Link>
        <Link
          to="/products"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          View Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
