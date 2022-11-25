import React from "react";
import Filters from "../../components/modules/filters/Admin/sidebar";
import "../../assets/styles/components/pages/admin/commandes.scss"
import { useSelector, useDispatch } from "react-redux";
import formatNumber from "../../assets/scripts/utils/priceNormalisation";
import Icon from "../../components/atoms/Icon";
import Modale from "../../components/modules/formulars/Modale"

const Commandes = () => {
    const authentication = useSelector((state) => state.authentication)

    const [update, setUpdate] = React.useState({})

    const [showedCommandes, setShowedCommandes] = React.useState()
    const auth = useSelector((state) => state.authentication)

    React.useEffect( ()=> {

    }, [])
    const [showModale, setShowModale] = React.useState(false)
    const updateState = ()=>{
        fetch(`https://stodac.fr/api/user/changeEtat/${update.id.substring(0,24)}`, {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.token, 
            }, 
            body: JSON.stringify({
                id:update.id,
                etat: parseInt(update.etat)
            })
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }


    return <div className="commandes">
            <Filters/>
            {
                showModale ? <Modale 
                                text="Voulez vous changer l'état de la commande ?" 
                                valid="Oui" unvalid="Non" 
                                yesCallback={()=>{updateState()}} 
                                noCallBack={()=>{setShowModale(false)}}
                                /> 
                            : <></>
            }
            <div className="commandes-container">

            </div>
        </div>



}

export default Commandes