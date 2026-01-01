import { useEffect, useState } from "react";
import { axiosGet } from "../../services/apiServices";
import { MdOutlineClose } from "react-icons/md";

const NotSold = ({ setRandomPlayer }) => {
  const [list, setList] = useState([]);
  const [filterString, setFilterString] = useState("");
  const [loading, setLoading] = useState(false);
  const filteredList = list?.filter((item) =>
    item.name.toLowerCase().includes(filterString.toLowerCase())
  );

  const fetchPlayerRecords = async () => {
    setLoading(true);
    try {
      const res = await axiosGet(`players`);
      const unsoldPlayers = res.data.filter((item) => item.markUnsold === true);
      setList(unsoldPlayers);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayerRecords();
  }, []);

  return (
    <section className="flex justify-center flex-col gap-2">
      <section className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Unsold players</h2>
        <section className="flex items-center gap-1">
          {filterString?.length > 0 && (
            <button
              title="Clear the search field"
              className="text-red-500 cursor-pointer"
              onClick={() => setFilterString("")}
            >
              <MdOutlineClose />
            </button>
          )}
          <input
            type="text"
            placeholder="Search player"
            value={filterString}
            onChange={(e) => setFilterString(e.target.value)}
            className={
              " border-b-1 border-[#E0E0E0] py-2 px-1  w-40 h-6  focus:outline-none"
            }
          />
        </section>
      </section>
      <section className="border-1 border-gray-200 "></section>

      <section className="flex items-center flex-col gap-1 max-h-60 overflow-auto">
        {loading ? (
          <p>Loading...</p>
        ) : !loading && filteredList.length > 0 ? (
          <>
            <section className="flex justify-between bg-gray-100 p-2 rounded-md w-full">
              <p className="w-1/3">Name</p>
              <p className="w-1/3">Age</p>
              <p className="w-1/3">Base Price</p>
              <p className="w-1/3">Category</p>
            </section>
            {filteredList.map((item) => (
              <section
                key={item._id}
                className="flex justify-between items-center border-b-1 bg-white p-2 border-gray-200 w-full hover:cursor-pointer"
                onClick={() => {
                  console.log(item);
                  setRandomPlayer(item);
                }}
              >
                <p className="w-1/3">{item.name}</p>
                <p className="w-1/3">{item.age}</p>
                <p className="w-1/3">₹{item.basePrice}</p>
                <span className="w-1/3 flex flex-wrap gap-2">
                  {item.category.map((cat, item) => (
                    <p
                      key={item}
                      className="text-[12px] bg-amber-100 rounded p-1"
                    >
                      {cat}
                    </p>
                  ))}
                </span>
              </section>
            ))}
          </>
        ) : (
          <p>No record found</p>
        )}
      </section>
    </section>
  );
};

export default NotSold;
