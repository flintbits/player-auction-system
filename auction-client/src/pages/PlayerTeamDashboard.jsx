import React, { useState } from "react";
import SwitchPT from "../components/PTDetails/SwitchPT";
import PTManagement from "../components/PTDetails/PTManagement";

const PlayerTeamDashboard = () => {
  const [formType, setFormType] = useState("players");
  return (
    <section className="flex justify-center items-center flex-col gap-4 text-gray-700 mt-4">
      <SwitchPT formType={formType} setFormType={setFormType} />
      <PTManagement formType={formType} />
    </section>
  );
};

export default PlayerTeamDashboard;
