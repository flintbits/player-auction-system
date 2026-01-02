import { Outlet, Link, useLocation } from "react-router";
import AuctionTimer from "../components/NavBar/AuctionTimer";

export default function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const linkClass = (path) =>
    `p-2 rounded-md transition-all ${
      currentPath === path
        ? "bg-blue-100 text-blue-400"
        : "text-gray-700 hover:bg-blue-100 text-blue-400"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 text-sm">
      <nav className="sticky top-0 z-50 bg-white px-4 py-2 flex items-center justify-between">
        <section className="w-14 h-14 overflow-hidden relative rounded-md">
          <img
            src={`/logo.png`}
            loading="lazy"
            alt="logo"
            className="w-full h-full object-cover object-center"
          />
        </section>
        {/* <AuctionTimer /> */}
        <div className="flex gap-4">
          <Link to="/auction" className={linkClass("/auction")}>
            Auction
          </Link>
          <Link
            to="/playerteamDashboard"
            className={linkClass("/playerteamDashboard")}
          >
            Dashboard
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
