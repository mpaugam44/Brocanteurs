import {useState,useEffect, Fragment} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import { LOGIN, ADMIN } from "../config/constante.js"
import { NavLink } from "react-router-dom";


const GetCategorie   = () => {
    
    const [articles, setArticles] = useState([]);
    const [categorieId, setCategorieId] = useState("")
    
    useEffect(() => {
        axios.get(`${BASE_URL}/categorie/${categorieId}`)
        .then((res) => {
            
            if (res.data.response === true) {
                setArticles(res.data.articles)
                console.log(articles)
            } else {
               //echec
            }
        })
        .catch((err) =>{
            console.log(err);
        })
    },[])
    
    
    
    return (
            <div>
            </div>
    )
}

export default GetCategorie ;