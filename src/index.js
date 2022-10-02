import React from 'react';
import { createBrowserRouter, RouterProvider, Route, } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import "./assets/styles/utils/root.scss"


import Header from "./components/modules/Header"
import Footer from "./components/modules/Footer"
import Boutique from "./pages/boutique"
import Assistance from "./pages/assistance"
import MesCommandes from "./pages/mes-commandes"
import ConditionsGeneralesVente from "./pages/conditions-generales-vente"
import MentionsLegales from "./pages/mentions-legales"

import reportWebVitals from './reportWebVitals';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Boutique/>,
  },{
    path: "/boutique/:page",
    element: <Boutique/>,
  },{
    path: "/boutique",
    element: <Boutique/>,
  },{
    path: "/mes-commandes",
    element: <MesCommandes/>,
  },{
    path: "/assistance",
    element: <Assistance/>,
  },{
    path: "/conditions-generales-de-vente",
    element: <ConditionsGeneralesVente/>,
  },{
    path: "/mentions-legales",
    element: <MentionsLegales/>,
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header/>
    <RouterProvider router={router} />
    <Footer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
