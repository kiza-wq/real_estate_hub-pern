import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { FaBath, FaBed } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <CardContainer className="inter-var">
      <Link to={`/listing/${listing.id}`}>
        <CardBody className="bg-linear-to-b from-purple-600/10 via-violet-600/10 to-zinc-800/10 relative group/card hover:shadow-2xl w-auto sm:w-120 h-auto rounded-xl p-4 border border-violet-600">
          <CardItem
            translateZ="50"
            className="text-2xl font-bold text-zinc-800"
          >
            {listing.name}
          </CardItem>
          <CardItem
            translateZ="60"
            className="text-zinc-600 text-sm max-w-xl mt-2 line-clamp-2"
          >
            {listing.description}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-2">
            <img
              src={listing.image_urls[0]}
              width="1000"
              className="h-80 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="listing_image"
            />
          </CardItem>
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl text-xs font-normal text-black"
          >
            <div className="flex items-center gap-1">
              <MdLocationOn className="h-4 w-4 text-green-700" />
              <p className="text-sm text-gray-600 truncate w-full">
                {listing.address}
              </p>
            </div>
          </CardItem>
          <div className="flex justify-between items-center mt-5 w-full">
            <CardItem
              translateZ={20}
              className="px-4 py-2 rounded-xl border-violet-600 border text-zinc-800 text-md font-bold"
            >
              {listing.offer
                ? `${listing.discount_price.toLocaleString("en-US")} €`
                : `${listing.regular_price.toLocaleString("en-US")} €`}
              {listing.type == "rent" && "/month"}
            </CardItem>
            <CardItem
              translateZ={20}
              className="px-4 py-2 rounded-xl border-violet-600 border text-sm font-bold"
            >
              <div className="text-zinc-800 flex gap-4">
                <div className="flex gap-2 font-bold">
                  <FaBed size={25} className="text-violet-600" />
                  {listing.bedrooms}
                </div>
                <div className="flex gap-2 font-bold ">
                  <FaBath size={22} className="text-violet-600" />
                  {listing.bathrooms}
                </div>
              </div>
            </CardItem>
          </div>
        </CardBody>
      </Link>
    </CardContainer>
  );
}
