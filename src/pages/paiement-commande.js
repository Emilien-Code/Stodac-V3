import React from "react";
import "../assets/styles/components/pages/payement-commande.scss"
import Bloc from "../components/sections/bloc"
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


import { setData, setDisconnect } from "../assets/scripts/store/redux-slices/authentication";
const Payement = ()=>{
  let navigate = useNavigate();
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const auth = useSelector((state) => state.authentication)

  React.useEffect(()=>{
    fetch(`https://stodac.fr/api/user/getinfos/${auth.id}`,{
        method: 'get', 
        headers: new Headers({
            'Authorization': 'Bearer ' + auth.token, 
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

    const saveFacture = (Factureid) => {
        let option = {
          lastname: auth.data.lastName,                             // USER INFOS
          firstname: auth.data.firstName,                           // USER INFOS
          mobile:auth.data.mobile,                                 // USER INFOS
          email:auth.data.email,                                   // USER INFOS

          mdp: cart.payementMode,                                                // Mode de paiement

          street: cart.commandInfo.facturation.street,                  // Facturation
          city: cart.commandInfo.facturation.city,                  // Facturation
          streetNumber: cart.commandInfo.facturation.streetNumber,            // Facturation
          postCode: cart.commandInfo.facturation.postCode,                 // Facturation
          nom: cart.commandInfo.facturation.lastName,                     // Facturation
          prenom: cart.commandInfo.facturation.firstName,               // Facturation
          entreprise:  cart.commandInfo.facturation.corporation,      // Facturation
          idp:Factureid
        }

        fetch(`https://stodac.fr/api/user/addCommande/${auth.id}`, {
          method: 'POST', 
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token, 
          }, 
          body: JSON.stringify(option)
      })
        .then(()=>{
          navigate('/confirmation-commande/succes');
        }).catch(err=>{
          navigate('/confirmation-commande/erreur');
          console.log(err)
        })
      }










    return <>
      <Helmet>
        <title>
            Payement de votre commande | Stodac : Vente d'accessoires pour poêles à granulés
        </title>
      </Helmet>
      <div className="payement-command">
          <div className="bloc1">
              <Bloc type="Facturation"/>
          </div>
          <div className="Bloc2">
              <Bloc type="Mode de paiement" saveFacture={saveFacture}/>
          </div>
      </div>
    </>
}
export default Payement
