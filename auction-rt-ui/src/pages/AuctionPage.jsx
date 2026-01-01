import TeamsSection from "../components/AuctionPage/TeamsSection";
import PlayersSection from "../components/AuctionPage/PlayersSection";
import { useState, useCallback, useEffect } from "react";
import { axiosGet } from "../services/apiServices";

const AuctionPage = () => {
  return (
    <section className="flex flex-col md:flex-row w-full text-gray-700 px-4 md:px-12">
      {/* Players section */}
      <section className="w-full md:w-[75%]">
        <PlayersSection />
      </section>
    </section>
  );
};

export default AuctionPage;
