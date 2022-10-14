import Addarticle from "/addArticle.jsx"
import {useState, useContext} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import Selection from './selectXcategories.jsx'
import {ReducerContext} from "./reducer/reducer"
import {useLocation} from 'react-router-dom'
  
  
 
    
const showArticle = () =>{
    
    const[articleId, setArticleId] = useState ();
    const [article, setArticle] = useState ({});
      
    /*axios.get(`${BASE_URL}/addArticle`,dataFile)
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
        })
      */
      
      const path = useLocation();

    const getParams = () => {
        const pathTable = path.pathname.split('/');
        const name = pathTable[pathTable.length-1];
        setThisCategory(name);
    }
}