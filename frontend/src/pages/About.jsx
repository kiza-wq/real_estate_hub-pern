import React from "react";
import { FaClock, FaShieldAlt, FaUser } from "react-icons/fa";

export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto text-center">
      <div className="text-5xl font-bold mb-8 text-slate-800">About Us:</div>
      <p className="mb-4 text-slate-700 leading-7 ">
        A modern real estate marketplace has evolved into a highly dynamic,
        technology-driven ecosystem that seamlessly connects buyers, sellers,
        renters, and agents across a wide range of property types, including
        houses, villas, and apartments. These platforms go far beyond simple
        property listings, offering immersive experiences through
        high-resolution photography, virtual tours, drone footage, and even
        augmented reality features that allow users to explore homes remotely
        with remarkable detail. Advanced search filters enable users to refine
        their preferences based on location, price range, architectural style,
        amenities, and neighborhood characteristics, making the discovery
        process both efficient and personalized. Artificial intelligence and
        data analytics play a crucial role by recommending properties tailored
        to user behavior and market trends, while integrated tools such as
        mortgage calculators, price comparison insights, and investment
        forecasts empower users to make informed decisions. In addition, modern
        marketplaces often provide end-to-end services, including legal
        assistance, digital documentation, secure payment systems, and direct
        communication channels with agents or property owners, reducing friction
        and increasing transparency in transactions. For sellers and developers,
        these platforms offer powerful marketing capabilities, reaching global
        audiences and showcasing properties in ways that highlight their unique
        value. Overall, the modern real estate marketplace is not just a listing
        service but a comprehensive digital hub that transforms how people
        search for, evaluate, and acquire residential properties in an
        increasingly connected world.
      </p>
      <div className="bg-zinc-900 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-75">
            <div className="flex items-center gap-4 text-white">
              <FaShieldAlt size={35} />
              <div>
                <div className="font-semibold">Secure Payments</div>
                <div className="text-xs text-zinc-400">Protected by Stripe</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <FaUser size={35} />
              <div>
                <div className="font-semibold">Verified Agents</div>
                <div className="text-xs text-zinc-400">Only top 3%</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <FaClock size={35} />
              <div>
                <div className="font-semibold">Instant Bookings</div>
                <div className="text-xs text-zinc-400">24/7 availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
