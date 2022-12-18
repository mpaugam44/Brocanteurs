import {Fragment} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import {useNavigate} from "react-router-dom";
const DeleteArt = (props) => {
    
 const navigate = useNavigate();
   
    const onClick = (e) => {
        
        const picture = props.picture
       
        console.log(props)
        axios.post(`${BASE_URL}/DeleteArticle/${props.articleId}`,{picture} )
        .then((res) =>{
            if(res.data.response){
                navigate("/articles")
                // success
            } else {
                // echec
            }
        })
        .catch((err) => {
            console.log(err)
        
        })
    }
    
    
// Ici nous appelons notre const Onclick dans le but delete l'article et ainsi de le faire disparaitre dans la bdd gra^ce au axios.post    
    
   return (
            <Fragment>       
                <div>
                    <button className="delete_article" onClick={onClick}>
                        Supprimer Article                                          
                    </button>
                </div>
            </Fragment> 
    ) 
}

export default DeleteArt;