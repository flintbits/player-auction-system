const PlayerCard = ({ name, gender, bid, category }) => {
  return (
    <>
      <section className="flex justify-between items-center border-b-1 bg-white p-2 border-gray-200 w-full">
        <p className="w-1/3">{name}</p>
        <p className="w-1/3">{gender}</p>
        <p className="w-1/3">{bid}</p>
        <span className="w-1/3 flex flex-wrap gap-2">
          {category.map((cat) => (
            <p className="text-[12px] bg-amber-100 rounded-md p-1">{cat}</p>
          ))}
        </span>
      </section>
    </>
  );
};
export default PlayerCard;
