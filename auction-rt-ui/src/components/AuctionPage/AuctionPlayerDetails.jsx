const AuctionPlayerDetails = ({ player }) => {
  console.log("player", player);

  if (!player) return <h1>Booo</h1>;
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
        <section className="flex gap-10 text-[20px] flex-col">
          <section className="flex gap-1 items-center">
            <p className="w-50 font-bold ">Referance number</p>
            <p>{player.referanceNumber}</p>
          </section>
          <section className="flex gap-1 items-center">
            <p className="w-50 font-bold ">Name</p>
            <p>{player.name.toUpperCase()}</p>
          </section>

          <section className="flex gap-1  items-center">
            <p className="w-50 font-bold">Gender</p>
            <p>{player.gender.toUpperCase()}</p>
          </section>

          <section className="flex gap-1 items-center">
            <p className="w-50 font-bold">Age</p>
            <p>{player.age}</p>
          </section>

          <section className="flex gap-1  items-center">
            <p className="w-50 font-bold">Location</p>
            <p>{player.location}</p>
          </section>

          <section className="flex gap-1 items-center">
            <p className="w-50 font-bold">Dominent Hand</p>
            <p>{player.hand}</p>
          </section>

          <section className="flex gap-1 items-center">
            <p className="w-50 font-bold">Expertice</p>
            <p>{player.expertice}</p>
          </section>

          <section className="flex gap-1 w-96 items-center">
            <p className="w-50 font-bold">Base Price</p>
            <p>{player.basePrice}</p>
          </section>
        </section>
      </section>
    </section>
  );
};

export default AuctionPlayerDetails;

/*
<section className="flex items-center gap-2 rounded-md p-2 w-full">
          <h1 className="font-semibold">Gender: </h1>
          <p>{player.gender}</p>
        </section>

        <section className="flex items-center gap-2  rounded-md p-2 w-full">
          <h1 className="font-semibold">Age: </h1>
          <p>{player.age}</p>
        </section>

        <section className="flex items-center gap-2  rounded-md p-2 w-full">
          <h1 className="font-semibold">Location: </h1>
          <p>{player.location}</p>
        </section>

        <section className="flex items-center gap-2  rounded-md p-2 w-full">
          <h1 className="font-semibold">Hand: </h1>
          <p>{player.hand}</p>
        </section>

        <section className="flex items-center gap-2 rounded-md p-2 w-full">
          <h1 className="font-semibold">Price: </h1>
          <p>{player.basePrice}</p>
        </section>

        <section className="flex items-center gap-2  rounded-md p-2 w-full">
          <h1 className="font-semibold">Category: </h1>
          {player.category.map((cat, index) => (
            <p
              key={index}
              className="px-2 rounded-md border-1 border-blue-200 "
            >
              {cat}
            </p>
          ))}
        </section>

*/
