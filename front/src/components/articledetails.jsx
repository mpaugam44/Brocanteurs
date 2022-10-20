import {useEffect, useState, Fragment} from "react"
import BASE_URL from "../config.js"
import AddComs from "./addcom"
import axios from 'axios'
import {useLocation} from 'react-router-dom'

const ArticleDetails = () =>{
    
    const [articleId, setArticleId] =useState(null)
    const [article, setArticle] = useState ({})
    const [ picture, setPicture] = useState ("")
    // pour appeller notre url
    
    // on appelle les infos venant de notre requête sql 
    useEffect(() => {
        getParams()
    } ,[])
    // on appelle notre fonction getParams pour aller choper l'id de l'article au rafraichissment de la page
    
    useEffect(() => {
        if(articleId) {
            getInfos()
            console.log(articleId)
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
        // console.log(articleId)
        axios.get(`${BASE_URL}/articledetails/${articleId}`)
        
        // ce get ne sert qu'à aller chercher notre articleId et ce qu'il contient
        .then((res) => {
            if(res.data.response){
                /*
                res.data = {
                    "response":true,
                    "article":[
                        {"id":3,"title":"","date":"2022-10-13T00:00:00.000Z","description":"","categorie_id":4,"id_marque":8,"id_vinyle":null,"price":3}
                    ]
                }
                */
                setArticle(res.data.article[0])
                setPicture(res.data.url[0].url)
                //on fait le .url[0].url pour aller chercher le premier url
                console.log(res.data)
                
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
    
    useEffect(()=>{
        //console.log(article)
    })
    // à chaque ouverture de page on aura un rafraichissement auto de l'article
    

    // Une fois qu'on a notre id on appelle notre requête sql via getInfos pour pouvoir chercher les details de l'article correspondant à l'id
    
     return (
    <Fragment>
            <div  style={{border:'orange 1px solid'}} >
               <div>titre:{article.title}</div>
                <div>photo:{article.pictures}
                <img src={`http://martinpaugam.sites.3wa.io:9300/img/${picture}`} />
                </div>
                <div>date:{article.date}</div>
                <div>description:{article.description}</div>
                <div>categories:{article.categories}</div>
                <div>marque:{article.marque}</div>
                <div>vinyle:{article.vinyle}</div>
                <div>price:{article.price}</div>
                <div>decennies:{article.decennies}</div>
            </div>
            <AddComs />
    </Fragment>
    )
    
    
}

export  default ArticleDetails



//   