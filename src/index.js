import React from 'react';
import { BrowserRouter as Router, Routes, createBrowserRouter, RouterProvider, Route, } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import "./assets/styles/utils/root.scss"

import reduxStore from "./assets/scripts/store/redux";
import { Provider } from "react-redux";


import Header from "./components/modules/Header"
import Footer from "./components/modules/Footer"
import MesCommandes from "./pages/mes-commandes"

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
import CommandesAdmin from "./pages/Admin/commandes.js"
import ArticleAdmin from "./pages/Admin/articles.js"
import ForgivenPassword from './pages/forgiven-password';
  const r = [{

  },{

  },{
    path: "/mot-de-passe-oublie/:_token",
    element: <ForgivenPassword/>
  }

]
const PageLayout = ({ children }) => children;

const AnimationLayout = ()=>{
  return <PageLayout></PageLayout>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <Router> 
        <Header/>
        <Menu/>
        <Cart/>



        <Routes element={<AnimationLayout/>}>
     
          <Route
            path="/"
            element={<Boutique/>}
          />
          <Route
            path="/boutique/:page"
            element={<Boutique/>}
          />
          <Route
            path="/boutique/"
            element={<Boutique/>}
          />
          <Route
            path="/mes-commandes/"
            element={<MesCommandes/>}
          />
          <Route
            path="/assistance"
            element={<Assistance/>}
          />
          <Route
           path="/conditions-generales-de-vente"
           element={<ConditionsGeneralesVente/>}
          />
          <Route
            path="/mentions-legales"
            element={<MentionsLegales/>}
          />
          <Route  
            path="/se-connecter"
            element={<Connexion/>}
          />
          <Route  
            path="/paiement-commande"
            element={<Payement/>}
          />
          <Route
            path="/article/:_id"
            element={<ArticlePage/>}
          />
          <Route
              path="/recapitulatif-commande"
              element={<Recap/>}
          />
          <Route
            path="/confirmation-commande/:isSucces"
            element={<ConfirmationCommande/>}
          />
          <Route
              path="/admin/commandes"
              element={<CommandesAdmin/>}
          />
          <Route
            path="/admin/articles"
            element={<ArticleAdmin/>}
          />
          <Route
            path="/mot-de-passe-oublie"
            element={<ForgivenPassword/>}
          />
          <Route 
            path="/mot-de-passe-oublie/:_token"
            element={<ForgivenPassword/>}
          />
        </Routes>
        <Footer/>
      </Router>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
