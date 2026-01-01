import { useState } from "react";
import { axiosPost } from "../../services/apiServices";
import Modal from "../Modal/Modal";
import { Notyf } from "notyf";
import { useSocket } from "../../hooks/useSocket";

const AuctionActionPanel = ({
  player,
  teamList,
  fetchRandomPlayer,
  hammerPrice,
  setHammerPrice,
}) => {
  const [soldToTeam, setSoldToTeam] = useState("");
  const [confirmBidDialog, setConfirmBidDialog] = useState(false);
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
  const isInputValidated = player && soldToTeam && hammerPrice;

  const { socket } = useSocket();

  const handleUnsold = async (id) => {
    await axiosPost(`auction/markUnsold/${id}`)
      .then((res) => {
        notyf.success(`${player.name} is unsold`);
      })
      .catch((e) => {
        console.log("something went wrong", e);
      });
  };

  const handleConfirmBid = async () => {
    await axiosPost("auction/soldPlayer", {
      teamId: soldToTeam._id,
      playerId: player._id,
      price: hammerPrice,
    })
      .then((res) => {
        setSoldToTeam("");
        setConfirmBidDialog(false);
        setHammerPrice(0);
        notyf.success(`${player.name} is sold to ${soldToTeam.name}`);
      })
      .catch((e) => {
        console.log("something went wrong", e);
      });
  };

  const updateBid = () => {
    let currentPrice = Number(hammerPrice);
    if (currentPrice < 2500) {
      currentPrice += 250;
    } else if (currentPrice > 2500 && currentPrice < 10000) {
      currentPrice += 500;
    } else {
      currentPrice += 1000;
    }
    setHammerPrice(currentPrice);
    socket.emit("bidPlayer", currentPrice, "test team");
  };

  return (
    <section className="w-full border-b-1 border-t-1 border-gray-200 mt-2 p-2 py-4  flex  items-center justify-between">
      <button
        className="bg-gray-200 text-gray-500 rounded-md text-sm w-32 h-6 active:scale-95 transition-all"
        onClick={() => handleUnsold(player._id)}
      >
        Unsold
      </button>
      <section className="flex items-center gap-2">
        <select
          onChange={(e) => setSoldToTeam(JSON.parse(e.target.value))}
          className="border-b-1 border-[#E0E0E0]  px-2  h-6  focus:outline-none"
        >
          <option value="">Select a team</option>
          {teamList?.map((team) => (
            <option key={team._id} value={JSON.stringify(team)}>
              {team.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Hammer Price"
          value={hammerPrice}
          onChange={(e) => setHammerPrice(Number(e.target.value))}
          className={
            " border-b-1 border-[#E0E0E0] p-2 w-40 h-6 focus:outline-none"
          }
        />
        <button
          className="bg-orange-200 text-orange-600 rounded-md text-sm w-32 h-6 active:scale-95 transition-all"
          onClick={updateBid}
        >
          Bid
        </button>
        <button
          className="bg-[#CCFFCC] text-green-700 rounded-md text-sm w-32 h-6 active:scale-95 transition-all"
          onClick={() =>
            isInputValidated
              ? setConfirmBidDialog(true)
              : notyf.error(
                  "Action required: Select a team and enter the hammer price to proceed"
                )
          }
        >
          Confirm Bid
        </button>
      </section>
      <button
        className="bg-blue-100 text-blue-400 rounded-md text-sm w-32 h-6 active:scale-95 transition-all"
        onClick={fetchRandomPlayer}
      >
        Get Player
      </button>
      {confirmBidDialog && (
        <Modal onClose={() => setConfirmBidDialog(false)}>
          <section className="flex justify-center flex-col gap-2">
            <h1 className="font-semibold text-2xl text-gray-700">Proceed?</h1>
            <p className="font-light text-sm text-gray-500">
              Confirm bid: <span className="font-medium">{player?.name} </span>
              to <span className="font-medium">{soldToTeam?.name}</span> for the
              winning bid of <span className="font-medium">{hammerPrice}</span>{" "}
              Rupees
            </p>
          </section>
          <section className="flex items-center justify-between mt-6">
            <button
              onClick={() => setConfirmBidDialog(false)}
              className="bg-red-200 active:bg-red-300 text-red-400 rounded p-2 transition-all"
            >
              Cancel
            </button>
            <button
              className="bg-blue-200 active:bg-blue-400 text-blue-500 rounded p-2 transition-all"
              onClick={handleConfirmBid} // todo call the api to set the player to the team
            >
              Proceed
            </button>
          </section>
        </Modal>
      )}
    </section>
  );
};

export default AuctionActionPanel;
