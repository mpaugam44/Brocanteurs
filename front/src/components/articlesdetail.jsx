import Addarticle from "/addArticle.jsx"
import {useEffect, useContext, useState} from "react"
import BASE_URL from "../config.js"
import axios from 'axios'
import Selection from './selectXcategories.jsx'
import {ReducerContext} from "./reducer/reducer"
import {useLocation} from 'react-router-dom'
  
  
 
    
const ArticleDetail = () =>{
    
    const[articleId, setArticleId] = useState ({});
    //const [article, setArticle] = useState ({});
    const [state, dispatch] = useContext(ReducerContext)
    
    const [titre, setTitre] = useState("")
    const [description, setDescription] = useState("")
    const [prix, setPrix] = useState(0)
    const [categories, setCategories] = useState({})
    const pictures = {...e.target.photos.files};
    const dataArticle = {
            titre
            categories
            description
            prix
            pictures
    }        
            
    
     
    /*
      */
      
    //   const path = useLocation();

    // const getParams = () => {
    //     const pathTable = path.pathid.split('/');
    //     const id = pathTable[pathTable.length-1];
    //     setArticleId(id);
    // }
    //
    
    useEffect = () => {
        axios.get(`${BASE_URL}/addArticle`,dataFile)
        .then((res) => {
            if(res.data.response){
                // success
            } else {
                // echec
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .then(() => {
            setDescription("")
            setTitre("")
            setPrix("")
            setCategories ("")
            setDescription ("")
            setPicture ("")
        })
    } ,[]
    
    return(
        
        <div>
        </div>
        
        
        
    )
    
    
}