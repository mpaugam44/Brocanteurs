import {useState,useEffect, Fragment} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import { NavLink, useLocation} from "react-router-dom";


const GetCategorie   = () => {
    
    const [articles, setArticles] = useState([]);
    
    
    
    
    const path = useLocation();

    const getParams = () => {
        
        const pathTable = path.pathname.split('/');
        // split des éléments de l'url pour les mettre dans un tableau
        const id = pathTable[pathTable.length-1];
        // dernier élément du tableau grâce à length-1
        return id ;
        
        
    }
    
    // à l'ouverture de page et de nav  url entre les catégories, on cherche cet id grâce à get params
    // et il va chercher les data de chaque articles pour chaque catégories
    useEffect(() => {
        
        
        const categorieId =  getParams()
        
        axios.get(`${BASE_URL}/categorie/${categorieId}`)
        .then((res) => {
            
            if (res.data.response === true) {
                setArticles(res.data.articles)
                
                
            } else {
               //echec
            }
        })
        .catch((err) =>{
            console.log(err);
        })
        
    },[path.pathname])   
    
    // On va chercher tout les articles correspondant à une catégorie donnée via l'url soit le path.pathname.
        
    return(
            
             <Fragment>
                <div className="articles_container">
                    {articles[0] && articles.map((e,i) => 
                        <div className="article_container" key={i}>
                            <div className="title_article">{e.title}</div>
                            <div className="image_article">
                            <img alt={`${articles.title} Image d'article`} src={`http://martinpaugam.sites.3wa.io:9300/img/${e.url}`} />
                            </div>
                            <div className="text_article">{e.date}</div>
                            <div className="text_article">{e.price} €</div>
                             <NavLink to = {`/articledetails/${e.id}`}>
                            Voir details
                            </NavLink>
                        </div>
                    )}
                </div>
            </Fragment>
            
            
    )
}

export default GetCategorie ;