import {useContext, useEffect, Fragment} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ReducerContext } from "./reducer/reducer";
import { userPath, adminPath } from '../config/path.js'

const Middleware = ({children}) => {
    const [state, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate();

    const location = useLocation()
    const currentPath = location.pathname

    useEffect(() => {
        if(userPath.includes(currentPath)){
            if(!state.login){
                navigate('/')
            }
        }

        if(adminPath.includes(currentPath)){
            if(!state.admin){
                navigate('/')
            }
        }
    }, [currentPath]);

    return(
        <Fragment>
            {children}
        </Fragment>
    )
}


// Une sécurité d'accès aux urls user ou à ceux de l'admin en vérifiant la bonne url.

export default Middleware;