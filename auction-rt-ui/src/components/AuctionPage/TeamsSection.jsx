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
              className="bg-white rounded-md p-3 select-none active:scale-95 transition-all hover:bg-gray-50"
              onClick={() => {
                setShowTeamDetails(true);
                setSelectedTeam(team);
              }}
            >
              <section className="flex items-center gap-3">
                {/* Team logo */}
                <section className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden relative rounded-md shrink-0">
                  <img
                    src={`http://localhost:3000/teamLogo/${team.logo}`}
                    loading="lazy"
                    alt={team.name}
                    className="w-full h-full object-cover object-center"
                  />
                </section>

                {/* Team name */}
                <h1 className="font-semibold text-[14px] sm:text-[15px] md:text-lg flex-1 truncate">
                  {team.name}
                </h1>

                {/* Purse value */}
                <p className="font-semibold text-[13px] sm:text-[14px] md:text-lg text-gray-700 min-w-[60px] text-right">
                  {team.purseValue}
                </p>

                {/* Player count */}
                <p className="font-semibold text-[13px] sm:text-[14px] md:text-lg text-gray-700 min-w-[40px] text-right">
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
          }}
          width="w-full sm:max-w-xl md:max-w-4xl"
        >
          <section className="flex flex-col gap-3 sm:gap-4">
            {/* Team name */}
            <h1 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-700 text-center sm:text-left">
              {selectedTeam.name}
            </h1>

            {/* Team stats */}
            <section className="flex flex-col sm:flex-row bg-gray-100 p-3 rounded-md text-sm sm:text-base gap-2 sm:gap-0">
              <p className="sm:w-1/2">
                <span className="font-medium">Purse Value:</span>{" "}
                {selectedTeam.purseValue}
              </p>
              <p className="sm:w-1/2">
                <span className="font-medium">Players:</span>{" "}
                {selectedTeam.players.length}
              </p>
            </section>

            <section className="border border-gray-200" />

            {selectedTeam.players.length === 0 ? (
              <p className="text-sm sm:text-base text-gray-500 text-center">
                No Players Found
              </p>
            ) : (
              <>
                <p className="text-sm sm:text-base font-medium text-gray-600">
                  Players under this team
                </p>

                <section className="flex flex-col gap-2 max-h-60 sm:max-h-80 overflow-auto">
                  {/* Table header */}
                  <section className="hidden sm:flex justify-between bg-gray-100 p-2 rounded-md text-sm font-medium">
                    <p className="w-1/4">Name</p>
                    <p className="w-1/4">Gender</p>
                    <p className="w-1/4">Bid Price</p>
                    <p className="w-1/4">Category</p>
                  </section>

                  {/* Players */}
                  {selectedTeam.players.map((player, index) => (
                    <PlayerCard
                      key={index}
                      name={player.name}
                      bid={player.price}
                      category={player.category}
                    />
                  ))}
                </section>
              </>
            )}
          </section>
        </Modal>
      )}
      {showUnsold && (
        <Modal
          onClose={() => setShowUnsold(false)}
          width="w-[95vw] sm:w-[90vw] md:max-w-4xl"
        >
          <NotSold />
        </Modal>
      )}
    </section>
  );
};

export default React.memo(TeamsSection);
