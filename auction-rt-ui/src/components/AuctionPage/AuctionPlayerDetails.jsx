const AuctionPlayerDetails = ({ player }) => {
  console.log("player", player);

  if (!player)
    return (
      <section className="flex flex-col items-center gap-3 text-gray-500">
        <img src="/law.png" className="w-30 opacity-70 m-10" />
      </section>
    );

  const playerData = [
    { label: "Referance number", value: player.referanceNumber },
    { label: "Name", value: player.name.toUpperCase() },
    { label: "Age", value: player.age },
    { label: "Location", value: player.location },
    { label: "Dominent Hand", value: player.hand },
    { label: "Expertice", value: player.expertice },
    { label: "Base Price", value: player.basePrice },
  ];

  return (
    <section className="mt-2 p-3 md:p-4 md:px-8 rounded-md bg-gray-50">
      <section className="flex gap-4 md:gap-16 items-start">
        {/* Player image */}
        <section className="w-[110px] h-[170px] sm:w-[130px] sm:h-[200px] md:w-[150px] md:h-[250px] relative rounded-md overflow-hidden shrink-0 ring-1 ring-gray-200">
          <img
            src={`http://localhost:3000/playerPic/${player.photo}`}
            loading="lazy"
            alt={player.name}
            className="w-full h-full object-cover object-center"
          />
        </section>

        {/* Player details */}
        <section className="grid grid-cols-1 gap-y-2 sm:gap-y-3 md:gap-y-5 text-[13px] sm:text-[14px] md:text-[20px] flex-1">
          {playerData.map((data, index) => (
            <section key={index} className="flex gap-2 items-start">
              {/* Label */}
              <p className="min-w-[80px] sm:min-w-[100px] md:w-[120px] font-semibold text-gray-500">
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
