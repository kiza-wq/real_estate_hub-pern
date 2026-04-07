import { FaArrowRight, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SwiperText() {
  return (
    <div className="flex justify-center items-center flex-col gap-4 p-28 px-3 w-full h-full">
      <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium text-zinc-700 mb-6">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        + 10 new properties this week
      </div>

      <div className=" text-6xl md:text-8xl font-bold leading-none tracking-tighter text-white mb-6">
        Find Your
        <br />
        <span className="text-violet-400">Dream Property</span>
      </div>

      <p className="text-xl text-white/90 mb-10 max-w-md">
        Discover extraordinary properties in the world's most desirable
        locations. Modern living, reimagined.
      </p>

      <div className="flex items-center gap-4 text-sm md:text-xl">
        <Link
          to={"/search"}
          className="text-white hover:bg-violet-600 bg-zinc-900 font-semibold px-10 py-5 rounded-3xl transition-all active:scale-95 flex items-center gap-3"
        >
          Browse Listings
          <FaArrowRight />
        </Link>
        <Link
          to={"/about"}
          className="border border-white/70 hover:bg-white/10 text-white font-semibold px-8 py-5 rounded-3xl transition-all flex items-center gap-3"
        >
          <FaInfoCircle />
          About Us
        </Link>
      </div>
    </div>
  );
}
