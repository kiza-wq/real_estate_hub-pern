import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center p-3 min-h-[80vh] md:min-h-[60vh]">
      <div className="w-full lg:w-xl">
        <div className="text-5xl text-zinc-700 text-center font-bold my-10">
          Sign Up
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="w-full bg-violet-600 text-white py-3 rounded-lg hover:bg-violet-700 transition font-medium disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <div className="my-1 flex items-center">
            <div className="grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-700">OR</span>
            <div className="grow h-px bg-gray-300"></div>
          </div>
          <OAuth />
        </form>
        <div className="flex gap-2 justify-center items-center mt-6 text-sm text-gray-600">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-violet-600 hover:underline font-medium">
              Sign In
            </span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </section>
  );
}
