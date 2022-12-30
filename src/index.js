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
import ConfirmationEmail from './pages/confirmationEmail';

import {useSelector, useDispatch} from 'react-redux';
import { setData, setDisconnect } from "./assets/scripts/store/redux-slices/authentication";

//LayoutComponent
import gsap from "gsap";
import { SwitchTransition, Transition } from "react-transition-group";
import "./assets/styles/components/modules/layout.scss"
import { useLocation , Outlet, Navigate } from "react-router-dom";
import { setCart, setMenu } from "./assets/scripts/store/redux-slices/modals";
import MonEspace from './pages/mon-espace';

const PageLayout = ({ children }) => children


const AnimationLayout = ()=>{
  
  const dispatch = useDispatch()

  let location = useLocation()
  
  React.useEffect(() => {

    console.log(window)
    dispatch(setCart(false))
    dispatch(setMenu(false))
    try {
      window.scrollTo(0, 0);
    } catch{
      console.log("impossible")

    }

  }, [location]);

  const $body = document.querySelector("body")

        

  return <PageLayout> 
    <div className="transition-bg"></div>
        <div className='transition-page'>

      <span>Stodac</span>
    </div>
    <SwitchTransition mode={"out-in"}>
        <Transition
          key={location.pathname}
          unmountOnExit
          timeout={1000}
          onEnter={() => {
            $body.style.overflow = 'hidden auto';
            $body.style.removeProperty('position');
            $body.style.removeProperty('top');
            $body.style.removeProperty('width');
            let tl = gsap.timeline({
              onComplete: () => {
                setTimeout(()=>{
                  try{

                    document.querySelector(".transition-page").style.display = "none";
                    document.querySelector(".transition-bg").style.display = "none";
                  }catch{
                    console.log("impossible")
                  }
                  },500)
              }
            })
            gsap.killTweensOf(".transition-page");
            tl.fromTo(
              ".transition-page",
              { 
                translateY: 0,
                rotate: 0
              },
              {
                translateY: "-120vh",
                rotate: 4,
                duration: .5

              })
            gsap.fromTo(".transition-bg",{
              top: 0,
              opacity:1
            },{
              opacity: 0,
              duration: 0.5
            })
          }}
          onExit={() => {
            setTimeout(()=>{
              $body.style.overflow = 'hidden';
              $body.style.position = 'fixed';
              $body.style.width = '100%';
            },500)
            document.querySelector(".transition-page").style.display = "flex";
            document.querySelector(".transition-bg").style.display = "block";
            
            let tl = gsap.timeline({

            })
            gsap.killTweensOf(".transition-page");
            tl.fromTo(
              ".transition-page",
              { 
                translateY: "-100vh",
                rotate: -4
              },
              {
                translateY: 0,
                rotate: 0,
                duration: .5
              });
              gsap.fromTo(".transition-bg",{
                top:0,
                opacity:1
              },{
                opacity: 1,
                duration: 0.5
              })
          }}
        >
          <Outlet/>
        </Transition>
      </SwitchTransition>
    
    </PageLayout>
}


const ProtectedRoute = ({ pushTo, children }) => {
  const authentication = useSelector((state) => state.authentication)
  if(authentication.connected)  return children
  return <Navigate to={`/se-connecter/${pushTo}`}/>
}

const ProtectedAdminRoute = ({children, pushTo}) => {
  const authentication = useSelector((state) => state.authentication)
  const dispatch = useDispatch()          

  React.useEffect(()=>{
    fetch(`https://stodac.fr/api/user/getinfos/${authentication.id}`,{
        method: 'get', 
        headers: new Headers({
            'Authorization': 'Bearer ' + authentication.token, 
        }), 
    })
    .then(response => {
        if(response.ok)
            return response.json()
        dispatch(setDisconnect())
    })
    .then(json => dispatch(setData(json[0])))
    .catch(err => console.log(err))
}, [])

  if(authentication.connected && authentication.data.admin)  return children
  return <Navigate to={`/se-connecter/${pushTo}`}/>

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <Router> 
        <Header/>
        <Menu/>
        <Cart/>
        <Routes >
          <Route element={<AnimationLayout/>}>
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
                path="/mon-espace/"
                element={
                  <ProtectedRoute pushTo="mon-espace">
                    <MonEspace/>
                  </ProtectedRoute>
                }
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
              path="/se-connecter/:pushTo"
              element={<Connexion/>}
            />
            <Route  
              path="/se-connecter/admin/:pushTo"
              element={<Connexion/>}
            />
            
            <Route  
              path="/paiement-commande"
              element={
                <ProtectedRoute pushTo="paiement-commande">
                  <Payement/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/article/:_id"
              element={<ArticlePage/>}
            />
            <Route
                path="/recapitulatif-commande"
                element={
                  <ProtectedRoute pushTo="recapitulatif-commande">
                    <Recap/>
                  </ProtectedRoute>
                }
            />
            <Route
              path="/confirmation-commande/:isSucces"
              element={<ConfirmationCommande/>}
            />
            <Route
                path="/admin/commandes"
                element={
                <ProtectedAdminRoute pushTo="admin/commandes">
                  <CommandesAdmin/>
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/articles"
              element={<ProtectedAdminRoute pushTo="admin/articles"><ArticleAdmin/></ProtectedAdminRoute>}
            />
            <Route
              path="/mot-de-passe-oublie"
              element={<ForgivenPassword/>}
            />
            <Route 
              path="/mot-de-passe-oublie/:_token"
              element={<ForgivenPassword/>}
            />
            <Route
              path="/verify/:email/*"
              element={<ConfirmationEmail/>}
            />
            <Route 
              path="*"
              element={<NotFound/>}
            />
          </Route>
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
