import React from "react";
import Article from "../components/modules/article";
// import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";


const ArticlePage = () => {
    //const articles = useSelector((state) => state.articles.articles);
    const articleID = useParams()._id;
    const [article, setArticle] = React.useState({});

    React.useEffect(()=>{

        fetch(`https://stodac.fr/api/stuff/product/${articleID}`)
        .then(response => response.json())
        .then(data => setArticle(data[0]))
        .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));
        
    },[])


    return <>
            <Helmet>
                <title>
                    {`${article.name}`} | Stodac : Vente d'accessoires pour poêles à granulés
                </title>
                <meta
                    name="description"
                    content={`${article.description}`}
                />
            </Helmet>
        <Article display="fullPage" data={article}/>
    </>
}

export default ArticlePage