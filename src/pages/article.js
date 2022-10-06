import React from "react";
import Article from "../components/modules/article";
// import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


const ArticlePage = () => {
    //const articles = useSelector((state) => state.articles.articles);
    const articleID = useParams()._id;
    const [article, setArticle] = React.useState({});


    // console.log(articles)
    // articles.forEach(element => {
    //     console.log(articles)
    //     if(element._id===articleID){
    //         setIsArticle(true);
    //     }
    // });
    React.useEffect(()=>{

        fetch(`https://stodac.fr/api/stuff/product/${articleID}`)
        .then(response => response.json())
        .then(data => setArticle(data[0]))
        .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));
        
    },[])


    return <Article display="boutique" data={article}/>
}

export default ArticlePage