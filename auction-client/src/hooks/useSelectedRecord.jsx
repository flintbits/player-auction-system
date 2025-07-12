import { useState } from "react";

const useSelectedRecord = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);

  return { selectedRecord, setSelectedRecord };
};

export default useSelectedRecord;
