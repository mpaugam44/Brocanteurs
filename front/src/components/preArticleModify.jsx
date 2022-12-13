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
           
            
    </Fragment>
    )
    
    
}

export default PreModify;