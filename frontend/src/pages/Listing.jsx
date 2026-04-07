import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  useEffect(() => {
    // Instantly jump to top (0,0) whenever the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="md:min-h-[125vh] min-h-[160vh] sm:max-w-[60vw] mx-auto mt-10">
      {loading && (
        <p className="text-center my-20 text-5xl text-zinc-800 font-semibold">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="relative h-[70vh]">
          <Swiper
            style={{
              "--swiper-navigation-color": "#7F00FF",
              "--swiper-pagination-color": "#7F00FF",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 rounded-4xl hover:shadow-2xl shadow-violet-300 border-violet-600 border-3 mb-5"
          >
            {listing.image_urls.map((url) => (
              <SwiperSlide key={url}>
                <img src={url} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper3"
          >
            {listing.image_urls.map((url) => (
              <SwiperSlide
                key={url}
                className="border-2 border-violet-600 rounded-2xl  hover:shadow-2xl shadow-violet-600"
              >
                <img src={url} className="rounded-2xl" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col w-full mx-auto p-3 my-7 gap-4">
            <div className="text-3xl font-bold text-zinc-800">
              {listing.name}
              <p className="text-2xl font-semibold text-zinc-600">
                {listing.offer
                  ? `${listing.discount_price.toLocaleString("en-US")} €`
                  : `${listing.regular_price.toLocaleString("en-US")} €`}
                {listing.type === "rent" && " / month"}
              </p>
            </div>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt size={30} className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4 justify-center items-center w-full text-lg ">
              <p className="bg-red-600 w-full text-white text-center p-3 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-600 w-full text-white text-center p-3 rounded-md">
                  €{+listing.regular_price - +listing.discount_price} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800 h-30 overflow-y-auto border border-gray-300">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-700 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-xl" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-xl" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-xl" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-xl" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser.id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-violet-600 text-white rounded-lg hover:opacity-95 p-4 text-xl"
              >
                Contact Owner
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
