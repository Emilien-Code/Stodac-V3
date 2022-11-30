import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData, setDisconnect } from "../assets/scripts/store/redux-slices/authentication";
import "../assets/styles/components/pages/mes-commandes.scss"
import formatNumber from "../assets/scripts/utils/priceNormalisation";
const MesCommandes = ()=>{

    const dispatch = useDispatch()
    const authentication = useSelector((state) => state.authentication)
    const [ordoredCommandes, setOrdoredCommandes] = React.useState([])

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
        .then(json => {
            dispatch(setData(json[0]))
            let a = JSON.parse(JSON.stringify(json[0].comande))
            a.sort((com, prev) =>{
             console.log(parseInt(com.id.substring(25, 31)) < parseInt(prev.id.substring(25, 31)) ? prev : com)
             return parseInt(com.id.substring(25, 31)) - parseInt(prev.id.substring(25, 31))
            })

            console.log(a)
        })
        .catch(err => console.log(err))
    }, [])

    return <div className="mes-commandes">
        <h1>Mes Commandes</h1>

        {
        authentication.connected && <>
        {
            authentication.data.comande.length > 0 ?

            authentication.data.comande.map((commande)=>{
                return <article>
                    <div className="title first">
                        <h2>{commande.date.substring(0,10)}</h2>
                        <p>Numéro de commande : {commande.id.substring(25, 31)}</p>
                    </div>
                    <ul>
                        {
                            commande.materiels.map((article)=>{
                                return <li>
                                    <picture>
                                        <source srcSet={article.obj.img}/>
                                        <img src={article.obj.img} alt={`illustration de ${article.obj.name}`}/>
                                    </picture>
                                    <div className="infos">
                                        <div className="title">
                                            <h3>{article.obj.name}</h3>
                                            <p>{formatNumber(article.obj.price * article.qty)}€</p>
                                        </div>
                                        <p>Quantité: {article.qty < 10 ? "0" : ""}{article.qty}</p>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                    <div className="frais_de_port">
                        <p>Frais de ports :</p>
                        <p>{formatNumber(commande.prix.prix_ttl_fdp)} €</p>
                    </div>
                    <div className="total_HT">
                        <p>Total HT :</p>
                        <p>{formatNumber(commande.prix.prix_ttl_HT)} €</p>
                    </div>
                    <div className="total_TTC">
                        <p>Total TTC :</p>
                        <p>{formatNumber(commande.prix.prix_ttl_panier)} €</p>
                    </div>
                    <div className="etat">
                        <p>Status : {commande.nometat[commande.etat]}</p>
                        <p>Payement par {commande.facture.moyendepayement}</p>
                    </div>
                        <hr/>
                    </article>
            })
            :
            <h2>Vous n’avez passé aucune commande.</h2>
        }</>
        }
    </div>
}
export default MesCommandes