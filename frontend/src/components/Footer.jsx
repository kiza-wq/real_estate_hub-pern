import { Link } from "react-router-dom";
import logo from "../assets/estate_logo.png";
import ds from "../assets/ds-logo.png";
import { FaAppStore, FaGooglePlay, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="place-self-center max-w-25 sm:max-w-50">
            <Link
              to="/"
              className="flex flex-wrap items-center font-bold text-xs md:text-lg lg:text-xl"
            >
              <img src={logo} className="rounded-lg w-8 sm:w-10" />
              <span className="text-slate-700">Estate</span>
              <span className="text-violet-700">Hub</span>
            </Link>
            <p className=" text-xs sm:text-sm leading-relaxed ">
              Premium real estate marketplace connecting discerning buyers with
              exceptional properties worldwide.
            </p>
          </div>

          <div className="place-self-center">
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <div className="space-y-3 text-sm">
              <Link
                to={"/search"}
                className="block hover:text-white transition-colors"
              >
                Browse Homes
              </Link>
              <Link
                to={"/sign-in"}
                className="block hover:text-white transition-colors"
              >
                Sell Your Property
              </Link>
              <Link
                to={"/sign-in"}
                className="block hover:text-white transition-colors"
              >
                Find Agents
              </Link>
            </div>
          </div>

          <div className="place-self-center">
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <div className="space-y-3 text-sm">
              <Link
                to={"/about"}
                className="block hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                to={"/about"}
                className="block hover:text-white transition-colors"
              >
                Careers
              </Link>
              <Link
                to={"/about"}
                className="block hover:text-white transition-colors"
              >
                Press
              </Link>
            </div>
          </div>

          <div className="place-self-center">
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <div className="space-y-3 text-sm">
              <Link
                to={"/about"}
                className="block hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to={"/about"}
                className="block hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to={"/about"}
                className="block hover:text-white transition-colors"
              >
                Our Partners
              </Link>
            </div>
          </div>

          <div className="flex flex-col place-self-center  ">
            <h4 className="text-white font-semibold mb-6 mx-auto">
              Get the app
            </h4>
            <div className="flex flex-col gap-4 mx-auto">
              <div className="bg-zinc-900 border border-zinc-700 px-6 py-3 rounded-2xl text-sm cursor-pointer hover:border-zinc-400 transition-colors">
                <FaAppStore size={25} />
              </div>
              <div className="bg-zinc-900 border border-zinc-700 px-6 py-3 rounded-2xl text-sm cursor-pointer hover:border-zinc-400 transition-colors">
                <FaGooglePlay size={25} />
              </div>
            </div>
          </div>
          <Link to={"#"} className="place-self-center mt-10">
            <img src={ds} alt="DELTA SOLUTIONS" className="w-40" />
          </Link>
        </div>

        <div className="border-t border-zinc-800 mt-20 pt-10 text-xs flex flex-col md:flex-row justify-between items-center gap-6">
          <div>© 2026 Estate Hub. Powered by ΔELTA SOLUTIONS.</div>
          <div className="flex gap-8">
            <Link to={"#"} className="hover:text-white">
              <FaTwitter size={20}/>
            </Link>
            <Link to={"#"} className="hover:text-white">
              <FaInstagram size={20}/>
            </Link>
            <Link to={"#"} className="hover:text-white">
              <FaLinkedin size={20}/>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
