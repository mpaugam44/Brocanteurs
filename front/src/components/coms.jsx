import {useState,useEffect, Fragment,useContext} from 'react'
import BASE_URL from "../config.js"
import { LOGIN, ADMIN } from "../config/constante.js"
import {ReducerContext} from "./reducer/reducer" 

const AllComs = ({commentaire, user_id}) => {
    
    const[coms, setComs] = useState(commentaire);
    const [state, dispatch] = useContext(ReducerContext)
    
    useEffect(() => {
         setComs(commentaire)
    },[commentaire])
     

    return (
        <Fragment>
            {coms[0] && coms.map((e,i) => 
                <div  style={{border:'yellow 1px solid'}} key={i}>
                   
                   
                    <div>name:{e.name}</div>
                    <div>description:{e.description}</div>
                    <div>date:{e.date}</div>
                {state.userid === user_id &&
                    <div>email:{e.email}</div>
                }
                </div>
            )}
        </Fragment>

    )
}

export default AllComs;