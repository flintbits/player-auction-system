import TeamsSection from "../components/AuctionPage/TeamsSection";
import PlayersSection from "../components/AuctionPage/PlayersSection";
import { useState, useCallback, useEffect } from "react";
import { axiosGet } from "../services/apiServices";

const AuctionPage = () => {
  const [teamList, setTeamList] = useState([]);
  const [randomPlayer, setRandomPlayer] = useState([]);
  console.log({ randomPlayer });

  const fetchTeams = async () => {
    try {
      const res = await axiosGet(`teams`);
      setTeamList(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (teamList.length === 0) {
      fetchTeams();
    }
  }, []);

  return (
    <section className="flex w-full text-gray-700 px-12">
      <section className="w-[75%]">
        <PlayersSection
          teamList={teamList}
          fetchTeams={fetchTeams}
          randomPlayer={randomPlayer}
          setRandomPlayer={setRandomPlayer}
        />
      </section>

      <section className="w-[25%] h-screen overflow-scroll hide-scrollbar">
        <TeamsSection
          teamList={teamList}
          randomPlayer={randomPlayer}
          setRandomPlayer={setRandomPlayer}
        />
      </section>
    </section>
  );
};

export default AuctionPage;
