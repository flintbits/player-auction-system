import React, { useDebugValue } from "react";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { MdOutlineClose } from "react-icons/md";
import PlayerCard from "./PlayerCard";
import NotSold from "./NotSold";

const TeamsSection = ({ teamList }) => {
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [filterString, setFilterString] = useState("");
  const filteredList = teamList?.filter((item) =>
    item.name.toLowerCase().includes(filterString.toLowerCase())
  );
  const [showUnsold, setShowUnsold] = useState(false);

  return (
    <section className="p-2">
      <section className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Teams</h2>
        <section className="flex items-center gap-1">
          {filterString?.length > 0 && (
            <button
              title="Clear the search field"
              className="text-red-500 cursor-pointer
              "
              onClick={() => setFilterString("")}
            >
              <MdOutlineClose />
            </button>
          )}
          <input
            type="text"
            placeholder="Search team"
            value={filterString}
            onChange={(e) => setFilterString(e.target.value)}
            className={
              " border-b-1 border-[#E0E0E0] py-2 px-1  w-40 h-6  focus:outline-none"
            }
          />
        </section>
      </section>
      <section className="flex gap-2 flex-col  my-2">
        {filteredList.length > 0 ? (
          filteredList.map((team) => (
            <section
              key={team._id}
              className="bg-white rounded-md p-2 select-none active:scale-95 transition-all"
              onClick={() => {
                setShowTeamDetails(true);
                setSelectedTeam(team);
              }}
            >
              <section className="flex items-center gap-2 justify">
                <section className="w-20 h-20 overflow-hidden relative rounded-md mr-5">
                  <img
                    src={`http://localhost:3000/teamLogo/${team.logo}`}
                    loading="lazy"
                    alt={team.name}
                    className="w-full h-full object-cover object-center"
                  />
                </section>
                <h1 className="font-semibold  text-lg w-1/3">{team.name}</h1>
                <p className="font-bold text-lg w-1/3">{team.purseValue}</p>
                <p className="font-bold  text-lg w-1/3">
                  {team.players.length}
                </p>
              </section>
            </section>
          ))
        ) : (
          <p>No Records found</p>
        )}
        <section className="border-1 my-2 border-gray-200"></section>
        <button
          className="bg-red-200 rounded-md p-2 overflow-scroll hide-scrollbar text-center active:scale-95"
          onClick={() => setShowUnsold(true)}
        >
          Not Sold
        </button>
      </section>
      {showTeamDetails && (
        <Modal
          onClose={() => {
            setShowTeamDetails(false);
            selectedTeam({});
          }}
          width="max-w-4xl"
        >
          <section className="flex justify-center flex-col gap-2">
            <h1 className="font-semibold text-2xl text-gray-700">
              {selectedTeam.name}
            </h1>
            <section className="flex justify-between bg-gray-100 p-2 rounded-md w-full">
              <p className="w-1/2">Purse Value : {selectedTeam.purseValue}</p>
              <p className="w-1/2">Players : {selectedTeam.players.length}</p>
            </section>
            <section className="border-1 border-gray-200 "></section>
            {selectedTeam.players.length === 0 ? (
              <p>No Players Found</p>
            ) : (
              <>
                <p>Players under this team</p>
                <section className="flex flex-wrap justify-center gap-1 max-h-60 overflow-auto">
                  <section className="flex justify-between bg-gray-100 p-2 rounded-md w-full">
                    <p className="w-1/3">Name</p>
                    <p className="w-1/3">Gender</p>
                    <p className="w-1/3">Bid Price</p>
                    <p className="w-1/3">Category</p>
                  </section>
                  {selectedTeam.players.map((player, index) => (
                    <PlayerCard
                      name={player.name}
                      // gender={player.gender}
                      bid={player.price}
                      category={player.category}
                      key={index}
                    />
                  ))}
                </section>
              </>
            )}
          </section>
        </Modal>
      )}
      {showUnsold && (
        <Modal onClose={() => setShowUnsold(false)} width="max-w-4xl">
          <NotSold />
        </Modal>
      )}
    </section>
  );
};

export default React.memo(TeamsSection);
