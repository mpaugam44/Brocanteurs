import {useEffect, useContext} from "react"
import { ReducerContext } from "./reducer/reducer";
import {LOGOUT} from '../config/constante'
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Logout = () => {
    const [state, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
        dispatch({type:LOGOUT}) 
        navigate("/")
    },[])
};

// Ici au onClick de Logout, on va supprimer le token de la session en ma fermant 
// on est redirigé ver la Home
export default Logout;