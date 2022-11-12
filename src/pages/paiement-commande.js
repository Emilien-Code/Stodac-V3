import React from "react";
import "../assets/styles/components/pages/payement-commande.scss"
import Bloc from "../components/sections/bloc"
import { useSelector, useDispatch } from "react-redux";

const Payement = ()=>{

  const cart = useSelector((state) => state.cart)
  const auth = useSelector((state) => state.authentication)



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
            // this.$router.push('/finiCommande/');
        }).catch(err=>{
          console.log(err)
        })
      }










    return <div className="payement-command">
        <div className="bloc1">
            <Bloc type="Facturation"/>
        </div>
        <div className="Bloc2">
            <Bloc type="Mode de payement" saveFacture={saveFacture}/>
        </div>
    </div>
}
export default Payement