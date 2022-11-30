import React from "react";
import Filters from "../../components/modules/filters/Admin/filtresCommandes";
import "../../assets/styles/components/pages/admin/commandes.scss"
import { useSelector, useDispatch } from "react-redux";
import formatNumber from "../../assets/scripts/utils/priceNormalisation";
import Icon from "../../components/atoms/Icon";
import Modale from "../../components/modules/formulars/Modale"

const Commandes = () => {
    const authentication = useSelector((state) => state.authentication)
    const [commandes,setCommandes] = React.useState([
        {
            comande:{
                date: "Chargement...",
                etat: -1,
                facture: {
                    lastname: '',
                    firstname: '',
                    entreprise: '',
                    mobile: 0,
                    email: '',
                    city: "",
                    moyendepayement: "",
                    postCode: "",
                    street: "",
                    streetNumber: ""
                },
                fini: false,
                id: "",
                livraison: {
                    adresse: {
                        adresse: "",
                        city: "",
                        postCode: "",
                    }, 
                    modeDeLivraison: 'Domicile'
                },
                materiels: [{
                    obj: {
                        id: '',
                        reference: ' ',
                        name: '  ',
                        img: '',
                        price: 0
                    },
                    prix_ttl: 270.24,
                    qty: 1,
                }],
                nometat: ['En attente de paiement', 'Payée', 'Envoyée', 'erreur payement (100)', 'erreur payement (101)'],
                paypal_info: {id: '', prix_payer: 0},
                pdf: "",
                prix: {
                    prix_ttl: 0,
                    prix_ttl_HT: 0,
                    prix_ttl_fdp: 0,
                    prix_ttl_fdp_HT: 0,
                    prix_ttl_panier: 0,
                    prix_ttl_panier_HT: 0,
                },
                suiviColissimo: ""
            }
        }
    ])
    const [update, setUpdate] = React.useState({})
    const [radioOlder,setOlder] = React.useState(false)
    const [radioNewer,setNewer] = React.useState(false)
    const [radioPaypal,setRadioPaypal] = React.useState(false)
    const [radioCheque,setRadioCheque] = React.useState(false)
    const [radioVirement,setRadioVirement] = React.useState(false)
    const [radioEnCoursDeLivraison,setRadioEnCoursDeLivraison] = React.useState(false)
    const [radioEnAttenteDePayement,setRadioEnAttenteDePayement] = React.useState(false)
    const [radioRecu,setRadioRecu] = React.useState(false)
    const [radioPAnule,setRadioPAnule] = React.useState(false)

    const [showedCommandes, setShowedCommandes] = React.useState(commandes)
    const auth = useSelector((state) => state.authentication)
    const [parameters, setParameters] = React.useState({
        type:["default","global"],
        limit:20,
        recherche: {
            Global:"",
            id:"",
            email:"",
            tel:"",
            np:"",
            etat:[0,0,0,0,0,0,1],
            date:"",
        },
    })

    React.useEffect( ()=> {
        let hasChanged = false
        let filteredArray ;
        
        if(radioPaypal){
        
            filteredArray =commandes.filter(commande => commande.comande.facture.moyendepayement==="paypal")
            hasChanged = true

        }
        if(radioCheque){
        
            filteredArray =commandes.filter(commande => commande.comande.facture.moyendepayement==="cheque")
            hasChanged = true
            
        }
        if(radioVirement){
        
            filteredArray =commandes.filter(commande => commande.comande.facture.moyendepayement==="virement")
            hasChanged = true
            
        }
        if(radioEnAttenteDePayement){
        
            filteredArray =commandes.filter(commande => commande.comande.etat===0)
            hasChanged = true
            
        }
        if(radioRecu){
        
            filteredArray =commandes.filter(commande => commande.comande.etat===2)
            hasChanged = true
            
        }
        if(radioPAnule){
        
            filteredArray =commandes.filter(commande => commande.comande.etat===1)
            hasChanged = true
            
        }


        if(radioNewer && filteredArray){
            filteredArray = filteredArray.sort((date1, date2) => new Date(date1.comande.date).setHours(0, 0, 0, 0) > new Date(date2.comande.date).setHours(0, 0, 0, 0) ? -1 : 1)
            hasChanged = true          
        }
        if(radioOlder && filteredArray){
            filteredArray = filteredArray.sort((date1, date2) => new Date(date1.comande.date).setHours(0, 0, 0, 0) < new Date(date2.comande.date).setHours(0, 0, 0, 0) ? -1 : 1)
            hasChanged = true
        
        }
        
        if(hasChanged){
            setShowedCommandes(filteredArray)
        }


    },[
        radioPaypal,
        radioCheque,
        radioVirement,
        radioEnCoursDeLivraison,
        radioEnAttenteDePayement,
        radioRecu,
        radioPAnule,
        radioOlder,
        radioNewer
    ])
    React.useEffect( ()=> {
        fetch(`https://stodac.fr/api/user/allFacture/${authentication.id}/`, {
            method: 'POST', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authentication.token, 
            },
            body: JSON.stringify({
                recherche: parameters.recherche,
                limit: parameters.limit,
                parametre: parameters.type
            })
        })  .then(response => response.json())
            .then(json => {
                setCommandes(json)
                setShowedCommandes(json.sort((date1, date2) => new Date(date1.comande.date).setHours(0, 0, 0, 0) > new Date(date2.comande.date).setHours(0, 0, 0, 0) ? -1 : 1))
            })

            document.querySelector("#newer").addEventListener("click", (e)=>{
                setNewer(e.target.checked)
                setOlder(false)
            })
            document.querySelector("#older").addEventListener("click", (e)=>{
                setOlder(e.target.checked)
                setNewer(false)
            })
            document.querySelector("#paypal").addEventListener("click", (e)=>{
                setRadioPaypal(e.target.checked)
                setRadioEnAttenteDePayement(false)
                setRadioPAnule(false)
                setRadioRecu(false)
                setRadioEnCoursDeLivraison(false)
                setRadioVirement(false)
                setRadioCheque(false)
            })
            document.querySelector("#cheque").addEventListener("click", (e)=>{
                setRadioCheque(e.target.checked)
                setRadioEnAttenteDePayement(false)
                setRadioPAnule(false)
                setRadioRecu(false)
                setRadioEnCoursDeLivraison(false)
                setRadioVirement(false)
                setRadioPaypal(false)
            })
            document.querySelector("#virement").addEventListener("click", (e)=>{
                setRadioVirement(e.target.checked)
                setRadioEnAttenteDePayement(false)
                setRadioPAnule(false)
                setRadioRecu(false)
                setRadioEnCoursDeLivraison(false)
                setRadioCheque(false)
                setRadioPaypal(false)
            })
            document.querySelector("#Enattentedepaiement").addEventListener("click", (e)=>{
                setRadioEnAttenteDePayement(e.target.checked)
                setRadioPAnule(false)
                setRadioRecu(false)
                setRadioEnCoursDeLivraison(false)
                setRadioVirement(false)
                setRadioCheque(false)
                setRadioPaypal(false)
            })
            document.querySelector("#Evoyée").addEventListener("click", (e)=>{
                setRadioRecu(e.target.checked)
                setRadioPAnule(false)
                setRadioEnAttenteDePayement(false)
                setRadioEnCoursDeLivraison(false)
                setRadioVirement(false)
                setRadioCheque(false)
                setRadioPaypal(false)
            })
            document.querySelector("#Payée").addEventListener("click", (e)=>{
                setRadioPAnule(e.target.checked)
                setRadioRecu(false)
                setRadioEnAttenteDePayement(false)
                setRadioEnCoursDeLivraison(false)
                setRadioVirement(false)
                setRadioCheque(false)
                setRadioPaypal(false)



            })
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
                <h1>Commandes</h1>
                <ul>
                    {
                        showedCommandes.map(commande => {
                            return <li>
                            <div className="title first">
                                <h2>{commande.comande.date.substring(0,10)}</h2>
                                <p>Numéro de commande : {commande.comande.id.substring(25, 31)}</p>
                            </div>
                            <div className="line">
                                <p>{commande.comande.facture.lastname} {commande.comande.facture.firstname}</p>
                            </div>
                            <div className="line">
                                <p>PDF de livraison</p>
                                <a href={commande.comande.pdf}>
                                    <Icon type="PDF"/>  
                                </a>
                            </div>
                            <div className="line">
                                <p>Mode de livraison</p>
                                <p>{commande.comande.livraison.modeDeLivraison}</p>
                            </div>
                            <div className="line">
                                <p>Adresse de livraison</p>
                                <p>
                                    {commande.comande.livraison.adresse.adresse} {", "}
                                    {commande.comande.livraison.adresse.city} {", "}
                                    {commande.comande.livraison.adresse.complement} {commande.comande.livraison.adresse.complement ? ", " : " "}
                                    {commande.comande.livraison.adresse.postCode}

                                </p>
                            </div>
                            <div className="line">
                                <p>Adresse de livraison</p>
                                <p>
                                    {commande.comande.facture.streetNumber} {" "}
                                    {commande.comande.facture.street} {", "}
                                    {commande.comande.facture.city} {", "}
                                    {commande.comande.facture.complement} {commande.comande.facture.complement ? ", " : " "}
                                    {commande.comande.facture.postCode}

                                </p>
                            </div>
                            <ul>
                                {
                                    commande.comande.materiels.map((article)=>{
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
                                <p>{formatNumber(commande.comande.prix.prix_ttl_fdp)} €</p>
                            </div>
                            <div className="total_HT">
                                <p>Total HT :</p>
                                <p>{formatNumber(commande.comande.prix.prix_ttl_HT)} €</p>
                            </div>
                            <div className="total_TTC">
                                <p>Total TTC :</p>
                                <p>{formatNumber(commande.comande.prix.prix_ttl_panier)} €</p>
                            </div>
                            <div className="etat">
                                <p className={`status-${commande.comande.etat}`}>Status : 
                                    <select onChange={(e)=>{
                                        setShowModale(true)
                                        setUpdate({
                                            id: commande.comande.id, 
                                            etat: e.target.value 
                                        })
                                        // updateState(commande.comande.id , e.target.value)
                                        }}>
                                        {
                                            commande.comande.nometat.map((etat, index)=> {
                                                if(index === commande.comande.etat){
                                                    return <option selected value={index}>{etat}</option>
                                                }
                                                return <option value={index}>{etat}</option>
                                            })
                                        }
                                    </select>
                                </p>
                                <p>Payement par {commande.comande.facture.moyendepayement}</p>
                            </div>
                                <hr/>
                            </li>
                        })
                    }
                    </ul>
            </div>
        </div>



}

export default Commandes