import {useState,useEffect, Fragment} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import { LOGIN, ADMIN } from "../config/constante.js"
import { NavLink } from "react-router-dom";

const ShowArticles = () => {
    
    const[articles, setArticles] = useState([]);
    
    useEffect(() => {
        axios.get(`${BASE_URL}/articles`)
        .then((res) => {
            if(res.data.response){
               setArticles(res.data.articles)
               
              console.log(res.data.articles)
            } 
            else {
                console.log(res.data.message)
            }
        })
        .catch((err) => {
            console.log(err);
        })   
    },[])
    
    
    return (
    <Fragment>
       
        {articles[0] && articles.map((e,i) => 
            <div style={{border:'red 1px solid'}} key={i}>
            <NavLink to = {`/articledetails/${e.id}`}>
            Voir details
            </NavLink>
               
               <div>Titre:{e.title}</div>
                <div>Photo:
                <img src={`http://martinpaugam.sites.3wa.io:9300/img/${e.url}`} />
                </div>
                <div>date:{e.date}</div>
               <div>price:{e.price}</div>
            </div>
        )}
    </Fragment>
    )
    
    
}

export default ShowArticles ;