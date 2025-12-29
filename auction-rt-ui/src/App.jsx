import AuctionPage from "./pages/AuctionPage";
import Layout from "./pages/Layout";
import { createBrowserRouter, RouterProvider } from "react-router";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/auction",
          element: <AuctionPage />,
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
