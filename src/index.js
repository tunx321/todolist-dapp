import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import History from './History';
import Purchase from "./Purchase"
import Team from "./Team"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/purchase",
    element: <Purchase />,
  },
  {
    path: "/team",
    element: <Team />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

