import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";

const AuctionPage = lazy(() => import("./pages/AuctionPage"));
const TeamsPage = lazy(() => import("./pages/TeamsPage"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/auction",
          element: (
            <Suspense fallback={<div>Loading Auction...</div>}>
              <AuctionPage />
            </Suspense>
          ),
        },
        {
          path: "/teams",
          element: (
            <Suspense fallback={<div>Loading Teams...</div>}>
              <TeamsPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <section className="h-screen">
      <RouterProvider router={router} />
    </section>
  );
}

export default App;
