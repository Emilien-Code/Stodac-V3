import React from "react";
import Filters from "../../components/modules/filters/Admin/sidebar";
import "../../assets/styles/components/pages/admin/commandes.scss"
import { useSelector, useDispatch } from "react-redux";
import Modale from "../../components/modules/formulars/Modale"
import Input from "../../components/atoms/input";
import Button from "../../components/atoms/Button";
import formatNumber from "../../assets/scripts/utils/priceNormalisation";
const Articles = () => {
    const [articles, setArticles] = React.useState([]);
    const auth = useSelector((state) => state.authentication);
    const [manufacturers, setManufacters] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    const [showCreateModale, setShowCreateModale] = React.useState(false);
    const [showChangeModale, setShowChangeModale] = React.useState(false);
    const [showDeleteModale, setShowDeleteModale] = React.useState(false);
    
    const [selectedArticle,setSelectedArticle] = React.useState([]);
    const [file, setFile] = React.useState();
    const searchedWord = useSelector((state) => state.filters.searched);
    const searchedCategorie = useSelector((state) => state.filters.category);
    const searchedManufacturer = useSelector((state) => state.filters.manufactor);


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
            .then(data1 => {
                fetch(`https://stodac.fr/api/stuff/reference/${searchedWord}/4`)
                .then(response => response.json())
                .then(data2 => setArticles([...data1, ...data2]))
            })
        }
    },[searchedWord])

    const handleStuff = (action) => {
        if(action === 'create') setShowCreateModale(true);
        if(action === 'change') setShowChangeModale(true);
        if(action === 'delete') setShowDeleteModale(true);
    }

    const removeArticle = ()=>{
        console.log(auth.token)
        fetch(`https://stodac.fr/api/stuff/${selectedArticle._id}`,{
            method: 'DELETE', 
            headers: {
                'Authorization': 'Bearer ' + auth.token,  
            },
            body: JSON.stringify({
                userId: auth.id
            })
        })
        setShowDeleteModale(false)
    }

    const editArticle = (_article) => {
        let article = JSON.parse(JSON.stringify(_article));
        article.price = article.price / 1.2;
        setSelectedArticle(article);
    }
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
        setShowCreateModale(false)
    }

    const changeStuff = () => {
        fetch(`https://stodac.fr/api/stuff/${selectedArticle._id}`,{
            method: 'PUT', 
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth.token, 
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
                compatibility: JSON.stringify(selectedArticle.compatibility),
                userId: auth.id
            })
        })
        setShowCreateModale(false)


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
                showCreateModale ? <Modale 
                                text="Voulez créer l'article ?" 
                                valid="Oui" unvalid="Non" 
                                yesCallback={()=>{createArticle()}} 
                                noCallBack={()=>{setShowCreateModale(false)}}
                                /> 
                            : <></>
            }
            {
                showChangeModale ? <Modale 
                                text="Voulez modifier l'article ?" 
                                valid="Oui" unvalid="Non" 
                                yesCallback={()=>{changeStuff()}} 
                                noCallBack={()=>{setShowChangeModale(false)}}
                                /> 
                            : <></>
            }
            {
                showDeleteModale ? <Modale 
                                text="Voulez supprimer l'article ?" 
                                valid="Oui" unvalid="Non" 
                                yesCallback={()=>{removeArticle()}} 
                                noCallBack={()=>{setShowDeleteModale(false)}}
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
                        <h3>Quantité</h3>
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
                            <Input type="text" defaultValue={formatNumber(selectedArticle.price)} callBack={(e)=>{selectedArticle.price = e}}/>
                        </div>
                    </div>
                </div>
                <h3>Compatibilités</h3>
                <Input type="text" defaultValue={selectedArticle.compatibility} callBack={(e)=>{selectedArticle.compatibility = e}}/>
                <h3>Description</h3>
                <Input type="text" defaultValue={selectedArticle.description} callBack={(e)=>{selectedArticle.description = e}}/>

                <div className="submit">
                    {
                        selectedArticle._id ? <Button type="text" color="black" content="Supprimer" callBack={()=>{handleStuff('delete')}}/> : <Button type="text" color="white"/>
                    }
                    
                    <Button type="text" color="green" content={selectedArticle._id ? "Modifier" : "Ajouter"} callBack={selectedArticle._id ? ()=>{handleStuff('change')} : ()=>{handleStuff('create')}}/>
                </div>
            </div>
        </div>



}

export default Articles
