import React from "react";
import Filters from "../../components/modules/filters/Admin/sidebar";
import "../../assets/styles/components/pages/admin/commandes.scss"
import { useSelector, useDispatch } from "react-redux";
import Icon from "../../components/atoms/Icon";
import Modale from "../../components/modules/formulars/Modale"
import Input from "../../components/atoms/input";
import Button from "../../components/atoms/Button";
const Articles = () => {
    const authentication = useSelector((state) => state.authentication)
    const [articles, setArticles] = React.useState([]);
    const auth = useSelector((state) => state.authentication);
    const [manufacturers, setManufacters] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [showModale, setShowModale] = React.useState(false);
    const [selectedArticle,setSelectedArticle] = React.useState([]);
    const [file, setFile] = React.useState();
    const searchedWord = useSelector((state) => state.filters.searched);
    const searchedCategorie = useSelector((state) => state.filters.category);
    const searchedManufacturer = useSelector((state) => state.filters.manufactor);

    const createStuff = (fd)=>{
        fetch(`https://stodac.fr/api/stuff/`, {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + auth.token, 
            }, 
            body: fd
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
    React.useEffect(()=>{
        if(searchedCategorie || searchedManufacturer){
            fetch(`https://stodac.fr/api/stuff/getBy/`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: searchedCategorie,
                    manufacturer:searchedManufacturer
                })
            })
            .then(response => response.json())
            .then(data => setArticles(data))
        }else{
            fetch(`https://stodac.fr/api/stuff/all/2000/0`)
            .then(response => response.json())
            .then( data => setArticles(data))
            .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));
        }
    },[searchedCategorie, searchedManufacturer])
    React.useEffect(()=>{
        if(searchedWord){
            fetch(`https://stodac.fr/api/stuff/name/${searchedWord}/4`)
            .then(response => response.json())
            .then(data => setArticles(data))
        }
    },[searchedWord])


    const removeArticle = ()=>{
        fetch(`https://stodac.fr/api/stuff/${selectedArticle._id}`,{
            method: 'DELETE', 
            headers: {
              'Authorization': 'Bearer ' + authentication.token, 
            },
        })
    }

    const editArticle = (article) => {
        console.log(article)
        setSelectedArticle(article)
    }
    
    React.useEffect(()=>{
        fetch(`https://stodac.fr/api/stuff/all/2000/0`)
        .then(response => response.json())
        .then( data => setArticles(data))
        .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));
        
        fetch(`https://stodac.fr/api/stuff/manufacturer`)
        .then(response => response.json())
        .then( data => setManufacters(data))
        .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));

        fetch(`https://stodac.fr/api/stuff/categories`)
        .then(response => response.json())
        .then( data => setCategories(data))
        .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));

    }, [])

    const createArticle = ()=>{
        const fd = new FormData()
        fd.append('image', file)
        fd.append('name', selectedArticle.name)
        fd.append('manufacturer', selectedArticle.manufacturer)
        fd.append('qty', parseInt(selectedArticle.qty))
        fd.append('price', Math.round(parseFloat(selectedArticle.price) * 1.2 * 100) / 100)//Parseint attention
        fd.append('poids', parseFloat(selectedArticle.poids))
        fd.append('reference', selectedArticle.reference)
        fd.append('category', selectedArticle.category)
        fd.append('state', selectedArticle.state)
        fd.append('description', selectedArticle.description)
        fd.append('compatibility', JSON.stringify([selectedArticle.compatibility]))

        createStuff(fd)
    }

    const changeStuff = () => {
        fetch(`https://stodac.fr/api/stuff/${selectedArticle._id}`,{
            method: 'PUT', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authentication.token, 
            },
            body: JSON.stringify({
                image: selectedArticle.img,
                name: selectedArticle.name,
                manufacturer: selectedArticle.manufacturer,
                qty: selectedArticle.qty,
                price: Math.round(parseFloat(selectedArticle.price) * 120)/100,
                poids: parseFloat(selectedArticle.poids),
                reference: selectedArticle.reference,
                category: selectedArticle.category,
                state: selectedArticle.state,
                description: selectedArticle.description,
                compatibility: JSON.stringify([selectedArticle.compatibility])
            })
        })

    }
    const more = ()=>{
        setSelectedArticle({
            img: "img",
            name: "nom",
            manufacturer: "Marques",
            qty: "0",
            price: "0",
            poids: "0",
            reference:"#REF",
            category:"Categories",
            state:"Neuf",
            description:"Description",
            compatibility:"Compatibilité1, Compatibilité2, ... "
        })
    }

    return <div className="commandes">
            <Filters callBack={editArticle} articles={articles} more={more}/>
            {
                showModale ? <Modale 
                                text="Voulez vous changer l'état de la commande ?" 
                                valid="Oui" unvalid="Non" 
                                yesCallback={()=>{createStuff()}} 
                                noCallBack={()=>{setShowModale(false)}}
                                /> 
                            : <></>
            }
            <div className="commandes-container articles-container">
                <h2>Article: </h2>
                <h3>Nom</h3>
                <Input type="text" defaultValue={selectedArticle.name} callBack={(e)=>{selectedArticle.name = e}}/>
                <h3>Référence</h3>
                <Input type="text" defaultValue={selectedArticle.reference} callBack={(e)=>{selectedArticle.reference = e}}/>
                <h3>Marque</h3>
                <div>
                    <Input type="select" selectType="Marques" defaultValue={selectedArticle.manufacturer} selectValues={manufacturers} callBack={(e)=>{selectedArticle.manufacturer = e}}/>
                    <Input type="text"  callBack={(e)=>{ selectedArticle.manufacturer = e}}/>
                </div>
                <h3>Catégorie</h3>
                <div>
                    <Input type="select" selectType="Catégories" defaultValue={selectedArticle.category} selectValues={categories} callBack={(e)=>{selectedArticle.category = e}}/>
                    <Input type="text"  callBack={(e)=>{selectedArticle.category = e}}/>
                </div>
                <div>
                    <div>
                        <h3>Quantitée</h3>
                        <Input type="text" defaultValue={selectedArticle.qty} callBack={(e)=>{selectedArticle.qty = e}}/>
                    </div>
                    <div>
                        <h3>État</h3>
                        <Input type="text" defaultValue={selectedArticle.state} callBack={(e)=>{selectedArticle.state = e}}/>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Image</h3>
                        <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                    <div className="numbers">
                        <div>
                            <h3>Poids (g)</h3>
                            <Input type="text" defaultValue={selectedArticle.poids} callBack={(e)=>{selectedArticle.poids = e}}/>
                        </div>
                        <div>

                            <h3>Prix HT</h3>
                            <Input type="text" defaultValue={selectedArticle.price} callBack={(e)=>{selectedArticle.price = e}}/>
                        </div>
                    </div>
                </div>
                <h3>Compatibilitées</h3>
                <Input type="text" defaultValue={selectedArticle.compatibility} callBack={(e)=>{selectedArticle.compatibility = e}}/>
                <h3>Description</h3>
                <Input type="text" defaultValue={selectedArticle.description} callBack={(e)=>{selectedArticle.description = e}}/>

                <div className="submit">
                    {
                        selectedArticle._id ? <Button type="text" color="black" content="Supprimer" callBack={removeArticle}/> : <Button type="text" color="white"/>
                    }
                    
                    <Button type="text" color="green" content={selectedArticle._id ? "Modifier" : "Ajouter"} callBack={selectedArticle._id ? changeStuff : createArticle}/>
                </div>
            </div>
        </div>



}

export default Articles