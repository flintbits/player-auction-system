import { useEffect, useState } from "react";
import AuctionActionPanel from "./AuctionActionPanel";
import AuctionPlayerDetails from "./AuctionPlayerDetails";
import { Notyf } from "notyf";
import { useSocket } from "../../hooks/useSocket";

const PlayersSection = ({}) => {
  const [randomPlayer, setRandomPlayer] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(1000);
  const [currentTeam, setCurrentTeam] = useState("");
  const [loading, setLoading] = useState(false);
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

  const { socket, connected } = useSocket();

  useEffect(() => {
    socket.emit("onConnection");
    const handlePlayer = (currentPlayer) => {
      setRandomPlayer([currentPlayer]);
      setLoading(false);
    };

    const handleBid = (bidPrice, team) => {
      setCurrentTeam(team);
      setCurrentPrice(bidPrice);
    };

    setLoading(true);
    socket.on("updatePlayer", handlePlayer);
    socket.on("updateBid", handleBid);

    return () => {
      socket.off("updatePlayer", handlePlayer);
      socket.off("updateBid", handleBid);
    };
  }, [socket]);

  return (
    <section className="px-4 py-2">
      <section>
        <section className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">
            {randomPlayer[0]?.name
              ? `${randomPlayer[0]?.name}`
              : "Waiting for next player"}
          </h1>
        </section>

        <AuctionActionPanel
          currentPrice={currentPrice}
          currentTeam={currentTeam}
          player={randomPlayer[0]}
        />
        {loading ? (
          <p className="flex items-center justify-center h-40 mt-2 rounded-md">
            Loading...
          </p>
        ) : !loading && randomPlayer.length > 0 ? (
          <AuctionPlayerDetails player={randomPlayer[0]} />
        ) : (
          <h1>Waiting for the player</h1>
        )}
      </section>
    </section>
  );
};

export default PlayersSection;
