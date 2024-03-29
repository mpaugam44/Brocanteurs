import {useEffect, useState, Fragment, useContext} from "react"
import BASE_URL from "../config.js"
import AddComs from "./addcom"
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import AllComs from './coms'
import {ReducerContext} from "./reducer/reducer"
import { NavLink } from "react-router-dom";

const ArticleDetails = () =>{
    const [state, dispatch] = useContext(ReducerContext)
    
    const [articleId, setArticleId] =useState(null)
    const [article, setArticle] = useState ({})
    const [ picture, setPicture] = useState ("")
    const [commentaire, setCommentaire] = useState ([])
   
   
    useEffect(() => {
        
        getParams()
    } ,[])
    // on appelle notre fonction getParams pour aller prendre l'id de l'article au rafraichissment de la page
    
    useEffect(() => {
        if(articleId) {
            getInfos()
            
        }  
    }, [articleId]) 

    const path = useLocation();

    const getParams = () => {
       
        const pathTable = path.pathname.split('/');
        // split des éléments de l'url pour les mettre dans un tableau
        const id = pathTable[pathTable.length-1];
        // dernier élément du tableau grâce à length-1
        setArticleId(id);
        // capacité grâce à setArticleId d'aller modifier l'id
        
    }
    
    
    const getInfos = () => {
        
        axios.get(`${BASE_URL}/articledetails/${articleId}`)
        // ce get ne sert qu'à aller chercher notre articleId et ce qu'il contient
        .then((res) => {
            if(res.data.response){
                
                setArticle(res.data.article[0])
                setPicture(res.data.url[0].url)
                setCommentaire(res.data.commentaire)
                //on fait le .url[0].url pour aller chercher le premier url
                
                // on va chercher le setArticle car le setArticleId est déjà chargé par la fonction getParams
                
            }
        })
        .catch((err) => {
            console.log(err)
        })
        
    } 
    // à chaque ouverture de page on aura un rafraichissement auto de l'article
    
    // Une fois qu'on a notre id on appelle notre requête sql via getInfos pour pouvoir chercher les details de l'article correspondant à l'id
    
    


    
    
     return (
    <Fragment>
 
            <div className="details_container">
               <div className="title_article">{article.title}</div>
                <div  className="image_article_details">{article.pictures}
                { picture && <img  alt={`${article.title} Image d'article`} src={`http://martinpaugam.sites.3wa.io:9300/img/${picture}`} />}
                </div>
                <div className="text_article">
                    <div>{article.date}</div>
                    <div className="description_container">Description: {article.description}</div>
                    <div>{article.categories_name}</div>
                    <div>{article.marque_name}</div>
                    {article.id_vinyle && 
                    <div>{article.id_vinyle ===1 ? "33 RPM" : "45 RPM" } </div> }
                    <div>{article.genre_name}</div>
                    <div>{article.price} €</div>
                    <div>Decennies:{article.decennie_date}</div>
                </div>    
            </div>
            
            {state.login &&
            <Fragment>
                <AddComs />
                
                <AllComs commentaire={commentaire} user_id={article.user_id} />
                
                { (state.userid === article.user_id || state.admin) && 
                <NavLink  title="Redirection vers page modification et suppression"className={"multiple_redirect"} to = {`/modifyArticle/${article.id}`}>
                    Modifier/Supprimer article
                </NavLink>
                }
            </Fragment>
            
            }
    </Fragment>
    )
    
    
}

export  default ArticleDetails



   