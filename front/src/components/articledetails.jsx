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
    // on appelle notre fonction getParams pour aller choper l'id de l'article au rafraichissment de la page
    
    useEffect(() => {
        if(articleId) {
            getInfos()
            // console.log(articleId)
        }  
    }, [articleId]) 

    const path = useLocation();

    const getParams = () => {
        // console.log(path)
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
                 console.log(res.data)
                setArticle(res.data.article[0])
                setPicture(res.data.url[0].url)
                setCommentaire(res.data.commentaire)
                //on fait le .url[0].url pour aller chercher le premier url
                
                // on va chercher le setArticle car le setArticleId est déjà chargé par la fonction getParams
                
            } else {
                console.log(res.data.message)
            
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .then(() => {
           
        })
    } 
    // à chaque ouverture de page on aura un rafraichissement auto de l'article
    
    // Une fois qu'on a notre id on appelle notre requête sql via getInfos pour pouvoir chercher les details de l'article correspondant à l'id
    
    


    
    
     return (
    <Fragment>
 
            <div  style={{border:'orange 1px solid'}} >
               <div>titre:{article.title}</div>
                <div>photo:{article.pictures}
                { picture && <img src={`http://martinpaugam.sites.3wa.io:9300/img/${picture}`} />}
                </div>
                <div>date:{article.date}</div>
                <div>description:{article.description}</div>
                <div>categories:{article.categorie_id}</div>
                <div>marque:{article.id_marque}</div>
                {article.id_vinyle && 
                <div>vinyle:{article.id_vinyle ===1 ? "33 RPM" : "45 RPM" } </div> }
                <div>genre:{article.genre_ID}</div>
                <div>price:{article.price}</div>
                <div>decennies:{article.decennie_ID}</div>
            </div>
            
            {state.login &&
            <Fragment>
                <AddComs />
                <AllComs commentaire={commentaire} user_id={article.user_id} />
                { (state.userid === article.user_id || state.admin) && 
                <NavLink to = {`/modifyArticle/${article.id}`}>
                    Modifier/Supprimer article
                </NavLink>
                }
            </Fragment>
            
            }
    </Fragment>
    )
    
    
}

export  default ArticleDetails



   