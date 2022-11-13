import React from 'react';
import { createBrowserRouter, RouterProvider, Route, } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import "./assets/styles/utils/root.scss"


import reduxStore from "./assets/scripts/store/redux";
import { Provider } from "react-redux";


import Header from "./components/modules/Header"
import Footer from "./components/modules/Footer"
import MesCommandes from "./pages/mes-commandes"

import Loader from './components/modules/loader';

import reportWebVitals from './reportWebVitals';
import Boutique from './pages/boutique';
import Assistance from './pages/assistance';
import ConditionsGeneralesVente from './pages/conditions-generales-vente';
import MentionsLegales from './pages/mentions-legales';
import Cart from "./components/modules/cart"
import Connexion from "./pages/conexion"
import ArticlePage from './pages/article';
import NotFound from './pages/404';
import Payement from "./pages/paiement-commande";
import Recap from "./pages/recap-commande";
import ConfirmationCommande from './pages/confirmation-commande';
import Menu from "./components/modules/Menu.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    // element: <React.Suspense fallback={</>}> <LazyBoutique/> ,
    element: <Boutique/> ,
    errorElement: <NotFound/>
  },{
    path: "/boutique/:page",
    
    // element: <React.Suspense fallback={</>}> <LazyBoutique/> ,
    element: <Boutique/> ,
  },{
    path: "/boutique",
    // element: <React.Suspense fallback={</>}> <LazyBoutique/> ,
    element: <Boutique/> ,
  },{
    path: "/mes-commandes",
    element: <MesCommandes/>,
  },{
    path: "/assistance",
    // element:  <React.Suspense fallback={</>}> <LazyAssistance/> ,
    element:  <Assistance/> ,
  },{
    path: "/conditions-generales-de-vente",
    // element: <React.Suspense fallback={</>}> <LazyConditionsGeneralesVente/> ,
    element: <ConditionsGeneralesVente/> ,
  },{
    path: "/mentions-legales",
    // element: <React.Suspense fallback={</>}> <LazyMentionsLegales/> ,
    element:  <MentionsLegales/>,
  },{
    path: "/se-connecter",
    element:<Connexion/>
  },{
    // a changer en sah ;)
    path: "/paiement-commande",
    element:<Payement/>
  },{
    path:"/article/:_id",
    element: <ArticlePage/>
  },{
    path:"/recapitulatif-commande",
    element: <Recap/>
  },{
    path:"/confirmation-commande/:isSucces",
    element: <ConfirmationCommande/>
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
    <Header/>
    <Menu/>
    <Cart/>
    <RouterProvider router={router} />
    <Footer/>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
