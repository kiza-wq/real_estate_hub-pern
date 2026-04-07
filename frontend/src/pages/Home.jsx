import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import ImageSlider from "../components/ImageSlider";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=5");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* TOP */}

      <ImageSlider offerListings={offerListings} />

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 mt-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="text-4xl text-zinc-700 font-bold my-5">
              Recent offers:
            </div>
            <Link
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer"
              to={"/search?offer=true"}
            >
              Show more offers...
            </Link>

            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing.id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="text-4xl text-zinc-700 font-bold my-5">
              Recent places for rent:
            </div>
            <Link
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer"
              to={"/search?type=rent"}
            >
              Show more places for rent...
            </Link>

            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing.id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="text-4xl text-zinc-700 font-bold my-5">
              Recent places for sale:
            </div>

            <Link
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer"
              to={"/search?type=sale"}
            >
              Show more places for sale...
            </Link>

            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
