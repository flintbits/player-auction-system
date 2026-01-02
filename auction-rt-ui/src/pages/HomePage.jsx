import React from "react";

export default function HomePage() {
  return (
    <section class="min-h-screen bg-gray-50 px-4 pt-24 flex justify-center">
      <div class="max-w-5xl w-full flex flex-col items-center text-center gap-8">
        <div class="space-y-2">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            Welcome to <span class="text-blue-400">YKPL 2026</span>
          </h1>
          <p class="text-gray-600 text-sm sm:text-base">
            Click on <span class="font-medium text-blue-400">Auction</span> to
            begin the event
          </p>
        </div>

        {/* <div class="bg-white rounded-2xl shadow-lg p-3 sm:p-4">
          <img
            src="/poster.png"
            alt="YUVA Karada Premier League 2026 Poster"
            class="w-64 sm:w-80 md:w-96 lg:w-[26rem] h-autorounded-xl"
          />
        </div> */}

        <a
          href="/auction"
          class="mt-2 inline-flex items-center justify-center rounded-md bg-blue-100 px-6 py-2 text-blue-400 text-base font-medium transition-all hover:bg-blue-200"
        >
          Go to Auction →
        </a>
      </div>
    </section>
  );
}
