import {useState,useEffect, Fragment} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
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
            <div className="articles_container">
                {articles[0] && articles.map((e,i) => 
                    <div key={i} className="article_container">
                        <div className="title_article">{e.title}</div>
                        <div className="image_article" >
                        <img alt={`${articles.title} Image d'article`} src={`http://martinpaugam.sites.3wa.io:9300/img/${e.url}`} />
                        </div>
                        <div className="text_article">{e.date}</div>
                        <div className="text_article"> {e.price}€</div>
                        <NavLink  to = {`/articledetails/${e.id}`}>
                        Voir details
                        </NavLink>
                    </div>
                )}
            </div>
        </Fragment>
    )
    
    
}

export default ShowArticles ;