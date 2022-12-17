import {useState,useEffect, Fragment,useContext} from 'react'
import {ReducerContext} from "./reducer/reducer" 

const AllComs = ({commentaire, user_id}) => {
    
    const[coms, setComs] = useState(commentaire);
    const [state, dispatch] = useContext(ReducerContext)
    
    useEffect(() => {
         setComs(commentaire)
    },[commentaire])
     
/*    const verifId = () => {
       SetUserId(!userId) 
    } */
  
    return (
        <Fragment>
            {coms[0] && coms.map((e,i) => 
                <div className="coms_container" key={i}>
                    <div>Name:{e.name}</div>
                    <div>Description:{e.description}</div>
                    <div>Date:{e.date}</div>
                {state.userid === user_id &&
                    <div>Email:{e.email}</div>
                }
                </div>
            )}
        </Fragment>

    )
}

export default AllComs;