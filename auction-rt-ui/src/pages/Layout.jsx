import { Outlet, Link, useLocation } from "react-router";
import HomePage from "./HomePage";
import { useSocket } from "../hooks/useSocket";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import { useRef } from "react";

import Confetti from "react-confetti";

export default function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { socket, connected } = useSocket();

  const [showModal, setShowModal] = useState(false);
  const [bidInfo, setBidInfo] = useState({ price: null, team: "" });
  const timerRef = useRef(null);

  const linkClass = (path) =>
    `p-2 rounded-md transition-all ${
      currentPath === path
        ? "bg-blue-100 text-blue-400"
        : "text-gray-700 hover:bg-blue-100 text-blue-400"
    }`;

  useEffect(() => {
    if (!socket || !connected) return;

    const handleBidCompleted = (price, team) => {
      setBidInfo({
        price,
        team,
      });
      setShowModal(true);

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowModal(false);
      }, 15000);
    };

    socket.on("bidCompleted", handleBidCompleted);

    return () => {
      socket.off("bidCompleted", handleBidCompleted);
      clearTimeout(timerRef.current);
    };
  }, [socket, connected]);

  return (
    <div className="min-h-screen bg-gray-50 text-sm">
      <nav className="sticky top-0 z-40 bg-white px-4 py-2 flex items-center justify-between">
        <section className="w-14 h-14 overflow-hidden relative rounded-md">
          <img
            src={`/logo.png`}
            loading="lazy"
            alt="logo"
            className="w-full h-full object-cover object-center"
          />
        </section>
        <div className="flex gap-4">
          <Link to="/auction" className={linkClass("/auction")}>
            Auction
          </Link>
          <Link to="/teams" className={linkClass("/teams")}>
            Teams
          </Link>
        </div>
      </nav>
      {currentPath === "/" ? <HomePage /> : <Outlet />}
      {showModal && (
        <div>
          <div className="fixed inset-0 z-50 pointer-events-none">
            <Confetti />
          </div>
          <Modal
            onClose={() => setShowModal(false)}
            width="w-[95vw] sm:w-[90vw] md:max-w-4xl"
          >
            {console.log(bidInfo)}
            <section className="w-full mt-2 px-4 py-4 flex flex-col gap-2 bg-blue-100 rounded-md">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Bid Completed
              </p>

              <h2 className="text-2xl font-bold text-blue-500 leading-tight">
                {bidInfo?.price}
              </h2>

              <p className="text-sm font-medium text-gray-600">
                Sold to{" "}
                <span className="font-semibold text-blue-400">
                  {bidInfo?.team}
                </span>
              </p>
            </section>
          </Modal>
        </div>
      )}
    </div>
  );
}
