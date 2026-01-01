import TeamsSection from "../components/AuctionPage/TeamsSection";
import PlayersSection from "../components/AuctionPage/PlayersSection";
import { useState, useCallback, useEffect } from "react";
import { axiosGet } from "../services/apiServices";

const AuctionPage = () => {
  const [teamList, setTeamList] = useState([]);

  const fetchTeams = useCallback(async () => {
    try {
      const res = await axiosGet(`teams`);
      setTeamList(res.data);
    } catch (e) {
      console.error(e);
    }
  }, [teamList]);

  useEffect(() => {
    if (teamList.length === 0) {
      fetchTeams();
    }
  }, []);

  return (
    <section className="flex flex-col md:flex-row w-full text-gray-700 px-4 md:px-12">
      {/* Players section */}
      <section className="w-full md:w-[75%]">
        <PlayersSection teamList={teamList} fetchTeams={fetchTeams} />
      </section>

      {/* Teams section */}
      <section className="w-full md:w-[25%] md:h-screen md:overflow-scroll hide-scrollbar mt-6 md:mt-0">
        <TeamsSection teamList={teamList} />
      </section>
    </section>
  );
};

export default AuctionPage;
