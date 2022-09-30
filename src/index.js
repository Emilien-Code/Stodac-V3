import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/styles/utils/root.scss"
import reportWebVitals from './reportWebVitals';
import Header from "./components/modules/Header"
import Boutique from "./pages/boutique"
import Assistance from "./pages/assistance"
import MesCommandes from "./pages/mes-commandes"
import { createBrowserRouter, RouterProvider, Route, } from "react-router-dom";
import ConditionsGeneralesVente from "./pages/conditions-generales-vente"
import MentionsLegales from "./pages/mentions-legales"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Boutique/>,
  },{
    path: "/MesCommandes",
    element: <MesCommandes/>,
  },{
    path: "/Assistance",
    element: <Assistance/>,
  },{
    path: "/Conditions-Generales-De-Vente",
    element: <ConditionsGeneralesVente/>,
  },{
    path: "/Mentions-Legales",
    element: <MentionsLegales/>,
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
