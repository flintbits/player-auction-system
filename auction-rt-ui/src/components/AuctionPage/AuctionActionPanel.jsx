const AuctionActionPanel = ({ player, currentPrice, currentTeam }) => {
  if (!player) return;
  return (
    <section className="w-full  border-gray-200 mt-2 px-3 py-4 flex flex-col gap-2 bg-green-100 rounded-md">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        Current Bid
      </p>

      <h1 className="text-2xl font-bold text-green-600 leading-tight">
        {currentPrice}
      </h1>

      {currentTeam && (
        <p className="text-sm font-medium text-gray-600">
          Selling to{" "}
          <span className="font-semibold text-blue-600">{currentTeam}</span>
        </p>
      )}
    </section>
  );
};

export default AuctionActionPanel;
