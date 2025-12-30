const AuctionPlayerDetails = ({ player }) => {
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

          {/* <section className="flex gap-1  items-center">
            <p className="w-50 font-bold">Gender</p>
            <p>{player.gender.toUpperCase()}</p>
          </section> */}

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

          {/* <section className="flex gap-1 w-96 items-center">
            <p className="w-1/4 font-bold">Category</p>
            <section className="flex flex-wrap items-center gap-2  rounded-sm ">
              {player.category.map((cat, index) => (
                <p key={index} className="px-2 rounded-sm bg-amber-100 ">
                  {cat}
                </p>
              ))}
            </section>
          </section> */}
        </section>
      </section>
    </section>
  );
};

export default AuctionPlayerDetails;
