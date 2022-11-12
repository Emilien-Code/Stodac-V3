import React from "react";
import "../assets/styles/components/pages/payement-commande.scss"
import Bloc from "../components/sections/bloc"
const Payement = ()=>{





    const saveFacture = (Factureid) => {
        let option = {
          lastname:this.userInfos.lastName,                             // USER INFOS
          firstname:this.userInfos.firstName,                           // USER INFOS
          mobile:this.userInfos.mobile,                                 // USER INFOS
          email:this.userInfos.email,                                   // USER INFOS
          mdp: this.MDP,                                                // Mode de paiement
          street:document.getElementById("rue").value,                  // Facturation
          city:document.getElementById("ville").value,                  // Facturation
          streetNumber:document.getElementById("num").value,            // Facturation
          postCode:document.getElementById("cp").value,                 // Facturation
          nom:document.getElementById("nom").value,                     // Facturation
          prenom:document.getElementById("prenom").value,               // Facturation
          entreprise: document.getElementById("entreprise").value,      // Facturation
          idp:Factureid
        }

        // this.$store.dispatch('saveFacture', option)
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