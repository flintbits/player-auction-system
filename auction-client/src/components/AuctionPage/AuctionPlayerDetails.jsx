const AuctionPlayerDetails = ({ player }) => {
  const playerData = [
    { label: "Referance number", value: player.referanceNumber },
    // { label: "Name", value: player.name.toUpperCase() },
    { label: "Age", value: player.age },
    { label: "Location", value: player.location },
    { label: "Batting Rating", value: player.battingRating },
    { label: "Bowling Rating", value: player.bowlingRating },
    { label: "Bowling Style", value: player.bowlingStyle },
    { label: "Fielding Rating", value: player.fieldingRating },
    { label: "Base Price", value: player.basePrice },
  ];

  return (
    <section className=" mt-2 p-4 px-8 rounded-md ">
      <section className="flex gap-16 items-start mt-2">
        <section className="w-150 h-250 relative rounded-md">
          <img
            src={`http://localhost:3000/playerPic/${player.photo}`}
            loading="lazy"
            alt={player.name}
            className="w-full h-full object-cover object-center"
          />
        </section>
        <section className="flex gap-6 text-[20px] flex-col">
          {playerData.map((data, index) => (
            <section key={index} className="flex gap-1 items-center ">
              <p className="w-50 font-bold ">{data.label}</p>
              <p>{data.value}</p>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
};

export default AuctionPlayerDetails;
