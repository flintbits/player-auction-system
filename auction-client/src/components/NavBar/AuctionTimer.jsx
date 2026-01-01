import React, { useEffect, useState } from "react";

const AuctionTimer = React.memo(() => {
  const [timeLeft, setTimeLeft] = useState(40);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-lg font-semibold text-red-600 min-w-[60px]">
      {timeLeft}s
    </div>
  );
});

export default AuctionTimer;
