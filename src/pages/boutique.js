import React from "react";
import Article from "../components/modules/article.jsx"
import "../assets/styles/components/pages/boutique.scss"

const Boutique = ()=>{
    const [articles, setArticles] = React.useState([{}])

    React.useEffect(()=>{
        fetch('https://stodac.fr/api/stuff/all/20/0')
        .then(response => response.json())
        .then( data => setArticles(data))
        .catch(error => console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message));
    }, [])
      

    return <main>
        <section className="store-wrapper">
        {
            articles.map((article, index)=>{
                return <Article key={index} data={article}/>
            })
        }
        </section>
        </main>
}

export default Boutique