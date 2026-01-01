import { useState } from "react";
import { axiosPost } from "../../services/apiServices";
import Modal from "../Modal/Modal";
import { Notyf } from "notyf";
import { useEffect } from "react";

const AuctionActionPanel = ({ player, currentPrice, currentTeam }) => {
  if (!player) return;
  return (
    <section className="w-full border-b-1 border-t-1 border-gray-200 mt-2 p-2 py-4  flex  items-center justify-between">
      <h1>{`Current bidding price ${currentPrice}  ${
        currentTeam ? `is being sold to ${currentTeam}` : ""
      }`}</h1>
    </section>
  );
};

export default AuctionActionPanel;
