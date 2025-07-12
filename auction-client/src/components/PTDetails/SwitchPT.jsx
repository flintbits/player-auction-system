import React from "react";
import { GoPerson } from "react-icons/go";
import { GoPeople } from "react-icons/go";

const SwitchPT = ({ formType, setFormType }) => {
  return (
    <section className="flex items-center justify-center px-2 gap-8 rounded ">
      <button
        className={` p-2 rounded-md flex items-center gap-2 ${
          formType === "players" ? "bg-[#CCFFCC] text-green-700  " : ""
        }`}
        onClick={() => setFormType("players")}
      >
        <GoPerson />
        Players
      </button>
      <button
        className={`p-2 rounded-md flex items-center gap-2 ${
          formType === "teams" ? "bg-[#CCFFCC] text-green-700" : ""
        }`}
        onClick={() => setFormType("teams")}
      >
        <GoPeople />
        Teams
      </button>
    </section>
  );
};

export default SwitchPT;
