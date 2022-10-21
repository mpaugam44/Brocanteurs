import {useState,useEffect, Fragment} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import { LOGIN, ADMIN } from "../config/constante.js"




const AllComs = ({commentaire}) => {
    
    const[coms, setComs] = useState(commentaire);
    
     useEffect(() => {
         setComs(commentaire)
     },[commentaire])
  
    
    return (
        <Fragment>
            {coms[0] && coms.map((e,i) => 
                <div  style={{border:'yellow 1px solid'}} key={i}>
                   
                    <div>article_id:{e.article_id}</div>
                    <div>name:{e.name}</div>
                    <div>description:{e.description}</div>
                    <div>date:{e.date}</div>
                    <div>email:{e.email}</div>
                </div>
            )}
        </Fragment>

    )
}


export default AllComs;