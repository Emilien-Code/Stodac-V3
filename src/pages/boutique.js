import React from "react";
import Article from "../components/modules/article.jsx"
import Button from "../components/atoms/Button.jsx";
import "../assets/styles/components/pages/boutique.scss"
import { useSelector } from "react-redux";
import Filters from "../components/sections/filters.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Boutique = ()=>{
    const navigate = useNavigate()
    const [articles, setArticles] = React.useState([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},]);
    const [nbPages, setNbPages] = React.useState(1);
    const searchedWord = useSelector((state) => state.filters.searched);
    const searchedCategorie = useSelector((state) => state.filters.category);
    const searchedManufacturer = useSelector((state) => state.filters.manufactor);

    const page = useParams()
    let currentPage = page.page ? page.page : 1
    const nextPage = (isMore)=>{
        if(isMore){
            if(nbPages>currentPage)
                currentPage++
        } else{
            if(currentPage>1)
                currentPage--
        }
        navigate(`/boutique/${currentPage}`);
    }
    
    React.useEffect(()=>{
        if(searchedWord){
            fetch(`https://stodac.fr/api/stuff/name/${searchedWord}/4`)
            .then(response => response.json())
            .then(data => setArticles(data))
        }
    },[searchedWord])


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
            load(0)
        }
    },[searchedCategorie, searchedManufacturer])


    
    const load = (start)=>{
        fetch(`https://stodac.fr/api/stuff/all/20/${start}`)
        .then(response => response.json())
        .then( data => setArticles(data))
        .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));
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

            load((currentPage-1) * 20);
            
        }
            fetch('https://stodac.fr/api/stuff/count/')
            .then(response => response.json())
            .then( data => setNbPages(data.nb / 20))
            .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));
            
    }, [])

    
    return <>
          <Helmet>
            <title>
                Boutique | Stodac : Vente d'accessoires pour poêles à granulés 
            </title>
            <meta
                name="description"
                content="Vous recherchez des pièces pour votre poêle ? Rendez vous sur stodac.fr, spécialiste dans vente d'accessoires et pièces détachées pour poêles à granulés de bois."
            />
          </Helmet>
    <main>
            <Filters/>
        <section className="store-wrapper">
        {
            articles.length > 0 ? 

            articles.map((article, index)=>{
                return <Article display="boutique" key={index} data={article}/>
            })
            
            :
            
            <h1>Aucun article trouvé</h1>
        }
        </section>

        <section className="load">
            <Button type="page-select" color="" value={currentPage} callBack={nextPage} maxValue={Math.floor(nbPages) + 1}/> 
        </section>

        </main>
        </>
}

export default Boutique