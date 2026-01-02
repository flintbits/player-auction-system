import React from "react";

export default function HomePage() {
  return (
    <section className="min-h-screen bg-gray-50 px-4 pt-24 flex justify-center">
      <div className="max-w-5xl w-full flex flex-col items-center text-center gap-8">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            Welcome to <span className="text-blue-400">YKPL 2026</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Click on <span className="font-medium text-blue-400">Auction</span>{" "}
            to begin the event
          </p>
        </div>

        <a
          href="/auction"
          className="mt-2 inline-flex items-center justify-center rounded-md bg-blue-100 px-6 py-2 text-blue-400 text-base font-medium transition-all hover:bg-blue-200"
        >
          Go to Auction →
        </a>
      </div>
    </section>
  );
}
