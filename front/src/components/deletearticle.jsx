// imports necessaires
// const avec states de ce qu'on veut delete
// const 


import {Fragment} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import { LOGIN, ADMIN } from "../config/constante.js"

const DeleteArt = (props) => {
    
   
   const onClick = (e) => {
        
        const picture = props.picture
        
        console.log(props)
        axios.post(`${BASE_URL}/DeleteArticle/${props.articleId}`,{picture} )
        .then((res) =>{
            if(res.data.response){
                // success
            } else {
                // echec
            }
        })
        .catch((err) => {
            console.log(err)
        
        })
        
            
    
    }
    
   return (
            <Fragment>       
                <div>
                    <button onClick={onClick}>
                        Supprimer Article                                          
                    </button>
                </div>
            </Fragment> 
    ) 
    
    
}

export default DeleteArt;