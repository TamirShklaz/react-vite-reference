import { createBrowserRouter } from "react-router-dom";
import Companies from "@/pages/companies.tsx";
import Root from "@/pages/root.tsx";
import { Layout } from "@/pages/layout.tsx";
import Create from "@/pages/create.tsx";
import Weather from "@/pages/weather.tsx";
import Todos from "@/pages/todos.tsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Root />
      },
      {
        path: "/companies",
        element: <Companies />
      },
      {
        path: "/create",
        element: <Create />
      },
      {
        path: "/weather",
        element: <Weather />
      },
      {
        path: "/todos",
        element: <Todos />
      }
    ]
  }
]);
