import {useState,useEffect, Fragment,useContext} from 'react'
import {ReducerContext} from "./reducer/reducer" 

const AllComs = ({commentaire, user_id}) => {
    
    const[coms, setComs] = useState(commentaire);
    const [state, dispatch] = useContext(ReducerContext)
    
    useEffect(() => {
         setComs(commentaire)
    },[commentaire])
     
// On appelle notre const avec notre useState commentaire et notre useContext pour state 
  
    return (
        <Fragment>
            {coms[0] && coms.map((e,i) => 
                <div className="coms_container" key={i}>
                    <div>{e.name}</div>
                    <div className="description_container">Description:{e.description}</div>
                    <div>{e.date}</div>
                {state.userid === user_id &&
                    <div>Email:{e.email}</div>
                }
                </div>
            )}
        </Fragment>

    )
}
// On return les infos que l'on souhaite et on n'affiche l'email seulement au state.userid  si c'est celui qui a posté l'article.

export default AllComs;