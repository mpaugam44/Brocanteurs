import {useEffect, useState, Fragment} from "react"
import BASE_URL from "../config.js"
import axios from 'axios'
import {useLocation} from 'react-router-dom'

const PreModify = (props) =>{
    
    useEffect(() => {
        getParams()
    } ,[])
    // on appelle notre fonction getParams pour aller choper l'id de l'article au rafraichissment de la page
    
    useEffect(() => {
        if(props.articleId) {
            getInfos()
            
        }  
    }, [props.articleId]) 

    const path = useLocation();

    const getParams = () => {
        // console.log(path)
        const pathTable = path.pathname.split('/');
        // split des éléments de l'url pour les mettre dans un tableau
        const id = pathTable[pathTable.length-1];
        // dernier élément du tableau grâce à length-1
        props.updateArticleId(id);
        // capacité grâce à setArticleId d'aller modifier l'id
        
    }
    
    
    const getInfos = () => {
        
        axios.get(`${BASE_URL}/articledetails/${props.articleId}`)
        
        // ce get ne sert qu'à aller chercher notre articleId et ce qu'il contient
        .then((res) => {
            if(res.data.response){
            
                props.updateArticle(res.data.article[0])
                props.updatePicture(res.data.url[0].url)
               
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
               <div>titre:{props.article.title}</div>
                <div>photo:{props.article.pictures}
                {props.picture && <img src={`http://martinpaugam.sites.3wa.io:9300/img/${props.picture}`} />}
                </div>
                <div>date:{props.article.date}</div>
                <div>description:{props.article.description}</div>
                <div>categories:{props.article.categories}</div>
                <div>marque:{props.article.marque}</div>
                <div>vinyle:{props.article.vinyle}</div>
                <div>price:{props.article.price}</div>
                <div>genre:{props.article.genre}</div>
                <div>decennie:{props.article.decennies}</div>
             
            </div>
            
    </Fragment>
    )
    
    
}

export default PreModify;