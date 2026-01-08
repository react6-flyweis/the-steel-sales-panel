import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { salesRoutes } from "./routes/sales.routes";
import { Loading } from "./components/loading";

const router = createBrowserRouter(salesRoutes);

export function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
