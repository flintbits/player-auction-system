import React, { useCallback, useEffect, useState } from "react";
import TeamsSection from "../components/AuctionPage/TeamsSection";
import { axiosGet } from "../services/apiServices";

export default function TeamsPage() {
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

  console.log({ teamList });
  return (
    <section className="w-full md:w-[25%] md:h-screen md:overflow-scroll hide-scrollbar mt-6 md:mt-0">
      <TeamsSection teamList={teamList} />
    </section>
  );
}
