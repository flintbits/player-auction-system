const AuctionPlayerDetails = ({ player }) => {
  if (!player)
    return (
      <section className="flex flex-col items-center gap-3 text-gray-500">
        <img src="/law.png" className="w-30 opacity-70 m-10" />
      </section>
    );

  const playerData = [
    { label: "Reference number", value: player.referanceNumber },
    { label: "Name", value: player.name.toUpperCase() },
    { label: "Age", value: player.age },
    { label: "Location", value: player.location },
    { label: "Batting Rating", value: player.battingRating },
    { label: "Bowling Rating", value: player.bowlingRating },
    { label: "Bowling Style", value: player.bowlingStyle },
    { label: "Fielding Rating", value: player.fieldingRating },
    { label: "Base Price", value: player.basePrice },
  ];

  return (
    <section className="mt-2  md:p-4 md:px-8 rounded-md bg-gray-50">
      <section className="flex flex-col gap-4 md:gap-16 items-start">
        {/* Player image */}
        <section className="w-[110px] h-[120px] sm:w-[130px] sm:h-[200px] md:w-[150px] md:h-[250px] relative rounded-md overflow-hidden shrink-0 ring-1 ring-gray-200 self-center">
          <img
            src={player.photo}
            loading="lazy"
            alt={player.name}
            className="w-full h-full object-cover object-center"
          />
        </section>

        {/* Player details */}
        <section className=" grid grid-cols-2 gap-y-4 sm:gap-y-3 md:gap-y-5 text-[15px] sm:text-[16px] md:text-[20px] flex-1 ">
          {playerData.map((data, index) => (
            <section
              key={index}
              className="flex flex-col items-start even:border-l-2 even:pl-6 ml-2 border-gray-300"
            >
              {/* Label */}
              <p className="min-w-[80px] sm:min-w-[100px] md:w-[120px] text-sm  text-gray-500">
                {data.label}
              </p>

              {/* Value */}
              <p className="text-gray-800 leading-tight break-words">
                {data.value}
              </p>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
};

export default AuctionPlayerDetails;
