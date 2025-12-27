import { useEffect, useState } from "react";
import { axiosGet, axiosPut } from "../../services/apiServices";
import AuctionActionPanel from "./AuctionActionPanel";
import AuctionPlayerDetails from "./AuctionPlayerDetails";
import { PLAYERCATEGORY } from "../../constants/PlayerCategory";
import Modal from "../Modal/Modal";
import { Notyf } from "notyf";

const PlayersSection = ({ teamList, fetchTeams }) => {
  const [randomPlayer, setRandomPlayer] = useState([]);
  const [category, setCategory] = useState(PLAYERCATEGORY[0].value);
  const [resetKey, setResetKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRoundOver, setRoundOver] = useState(false);
  const notyf = new Notyf({
    duration: 1000,
    position: {
      x: "right",
      y: "top",
    },
    types: [
      {
        type: "success",
        background: "MediumSeaGreen",
        duration: 2000,
        dismissible: true,
      },
      {
        type: "error",
        background: "indianred",
        duration: 2000,
        dismissible: true,
      },
    ],
  });

  const fetchRandomPlayer = async () => {
    setLoading(true);
    try {
      const response = await axiosGet(`auction/randomPlayers/${category}`);
      setResetKey((prev) => !prev);
      await fetchTeams();
      setRandomPlayer(response.data);
    } catch (e) {
      console.error("Something went wrong", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPlayer();
  }, [category]);

  const handleRoundOver = async () => {
    console.log("hello");
    await axiosPut(`auction/endRound/${category}`)
      .then((res) => {
        notyf.success("Next round");
        setRoundOver(false);
        fetchRandomPlayer();
      })
      .catch((e) => console.error(e));
  };

  return (
    <section className="px-4 py-2">
      <section>
        <section className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">
            {randomPlayer[0]?.name
              ? `${randomPlayer[0]?.name}`
              : "No Player found"}
          </h1>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className=" border-b-1 border-[#E0E0E0]  px-2  focus:outline-none"
          >
            {PLAYERCATEGORY.map(({ name, value }) => (
              <option key={name} value={value}>
                {name}
              </option>
            ))}
          </select>
        </section>

        <AuctionActionPanel
          player={randomPlayer[0]}
          teamList={teamList}
          fetchRandomPlayer={fetchRandomPlayer}
          key={resetKey}
        />
        {loading ? (
          <p className="flex items-center justify-center h-40 mt-2 rounded-md">
            Loading...
          </p>
        ) : !loading && randomPlayer.length > 0 ? (
          <AuctionPlayerDetails player={randomPlayer[0]} />
        ) : (
          <section className="flex flex-col gap-4 items-center justify-center h-40 mt-2 rounded-md">
            <p>No player found</p>
            <section className="flex items-center gap-2 flex-col justify-between border-1 p-2 rounded-md text-red-500">
              <p>Note: Click on Round Over if no players are available</p>
              <button
                onClick={() => setRoundOver(true)}
                className="cursor-pointer bg-red-200 rounded-md p-2 active:scale-95"
              >
                Round Over
              </button>
            </section>
            {isRoundOver && (
              <Modal onClose={() => setRoundOver(false)}>
                <section className="flex justify-center flex-col gap-2">
                  <h1 className="font-semibold text-xl text-gray-500">
                    Confirm Round Over
                  </h1>
                </section>
                <section className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => setRoundOver(false)}
                    className="bg-red-200 active:bg-red-300 text-red-400 rounded p-1"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-200 active:bg-blue-400 text-blue-500 rounded p-1"
                    onClick={() => handleRoundOver()}
                  >
                    Proceed
                  </button>
                </section>
              </Modal>
            )}
          </section>
        )}
      </section>
    </section>
  );
};

export default PlayersSection;
