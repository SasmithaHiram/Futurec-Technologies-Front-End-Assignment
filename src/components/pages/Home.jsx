import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

const Home = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 relative px-6">
      <div className="absolute top-6 right-6">
        <Link
          to="/login"
          className="flex items-center gap-2 text-indigo-600 font-medium hover:underline text-lg"
        >
          <FiLogIn className="text-xl" />
          Login
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to <span className="text-indigo-600">Product Manager</span>
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          Start organizing your products with ease.
        </p>

        <Link
          to="/register"
          className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
