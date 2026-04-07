import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <section className="flex flex-col justify-center items-center p-3 min-h-[80vh] md:min-h-[60vh]">
      <div className="w-full lg:w-xl">
        <div className="text-5xl text-zinc-700 text-center font-bold my-10">
          Sign In
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg "
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
            {loading ? "Loading..." : "Sign In"}
          </button>
          <div className="my-1 flex items-center">
            <div className="grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-700">OR</span>
            <div className="grow h-px bg-gray-300"></div>
          </div>
          <OAuth />
        </form>
        <div className="flex gap-2 justify-center items-center mt-6 text-sm text-gray-600">
          <p>Dont have an account?</p>
          <Link to="/sign-up">
            <span className="text-violet-600 hover:underline font-medium">
              Sign Up
            </span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </section>
  );
}
