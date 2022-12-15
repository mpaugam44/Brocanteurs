import {useState,useEffect, Fragment} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import { NavLink, useLocation} from "react-router-dom";


const GetCategorie   = () => {
    
    const [articles, setArticles] = useState([]);
    
    
    
    
    const path = useLocation();

    const getParams = () => {
        // console.log(path)
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
    
    
        
    return (
            
             <Fragment>
                <div className="articles_container">
                    {articles[0] && articles.map((e,i) => 
                        <div key={i}>
                            <NavLink to = {`/articledetails/${e.id}`}>
                            Voir details
                            </NavLink>
                                <div>Titre:{e.title}</div>
                                <div className="image_article">Photo:
                                <img  src={`http://martinpaugam.sites.3wa.io:9300/img/${e.url}`} />
                                </div>
                                <div>date:{e.date}</div>
                                <div>price:{e.price} €</div>
                        </div>
                    )}
                </div>
            </Fragment>
            
            
    )
}

export default GetCategorie ;