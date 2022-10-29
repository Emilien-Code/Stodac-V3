import React from "react";
import Article from "../components/modules/article.jsx"
import Button from "../components/atoms/Button.jsx";
import "../assets/styles/components/pages/boutique.scss"
import { useSelector } from "react-redux";
import Filters from "../components/sections/filters.jsx";
import { useParams } from "react-router-dom";

const Boutique = ()=>{
    const [articles, setArticles] = React.useState([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},]);
    const [nbPages, setNbPages] = React.useState(1);
    const searchedWord = useSelector((state) => state.filters.searched);

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
        window.location.href = `/boutique/${currentPage}`;
    }
    
    React.useEffect(()=>{
        if(searchedWord){
            fetch(`https://stodac.fr/api/stuff/name/${searchedWord}/4`)
            .then(response => response.json())
            .then(data => setArticles(data))
        }
    },[searchedWord])
    
    const load = (start)=>{
        fetch(`https://stodac.fr/api/stuff/all/20/${start}`)
        .then(response => response.json())
        .then( data => setArticles(data))
        // .then(()=>dispatch(setPage({articles: articles, page: currentPage})))
        .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));
    }


    
    React.useEffect(()=>{
        load(currentPage ? (currentPage-1) * 20 : 0);

        fetch('https://stodac.fr/api/stuff/count/')
        .then(response => response.json())
        .then( data => setNbPages(data.nb / 20))
        .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));

    }, [])

    
    return <main>
            <Filters/>
        <section className="store-wrapper">
        {
            articles ? 

            articles.map((article, index)=>{
                return <Article display="boutique" key={index} data={article}/>
            })
            
            :
            
            <h1>Aucun article trouvé</h1>
        }
        </section>

        <section className="load">
            <Button type="page-select" color="" value={currentPage} callBack={nextPage} maxValue={nbPages}  />
        </section>

        </main>
}

export default Boutique