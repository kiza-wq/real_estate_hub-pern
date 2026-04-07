import { FaHouseUser, FaInfoCircle, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../assets/estate_logo.png";
import blankprofile from "../assets/blank-profile.webp";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setsearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header className="bg-slate-100 shadow-md border-b border-zinc-200 sticky top-0 z-99">
      <div className="flex justify-around sm:justify-between items-center max-w-6xl mx-auto h-20 sm:h-30">
        <Link
          to="/"
          className="flex flex-wrap items-center font-bold text-xs md:text-xl lg:text-5xl"
        >
          <img src={logo} className="rounded-lg w-9 sm:w-12" />
          <span className="text-slate-700">Estate</span>
          <span className="text-violet-700">Hub</span>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-violet-600" />
          </button>
        </form>

        <ul className="flex gap-4 justify-center items-center text-lg">
          <Link to="/">
            <li className="flex items-center gap-1 text-zinc-700 hover:text-violet-600 transition-colors">
              <FaHouseUser />
              <span className="hidden sm:inline">Home</span>
            </li>
          </Link>
          <Link to="/about">
            <li className="flex items-center gap-1 text-zinc-700 hover:text-violet-600 transition-colors">
              <FaInfoCircle />
              <span className="hidden sm:inline">About</span>
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full object-cover h-7 w-7"
                src={currentUser.avatar || blankprofile}
                alt="profile"
              />
            ) : (
              <li className="bg-zinc-900 hover:bg-violet-600 text-white px-7 py-3 rounded-3xl text-xs sm:text-sm font-semibold transition-all active:scale-95 ">
                Sign in
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
