import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./router";

if (!import.meta.env.VITE_API_URL) throw new Error("Missing VITE_API_URL");
if (!import.meta.env.VITE_EDITOR_URL)
  throw new Error("Missing VITE_EDITOR_URL");

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
