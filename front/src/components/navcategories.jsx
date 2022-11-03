import {Fragment} from 'react'
import BASE_URL from "../config.js"
import { LOGIN, ADMIN } from "../config/constante.js"
import { NavLink } from "react-router-dom";


const Navcategorie = () => {
    
    return(
    <nav>
    <NavLink to ="categorie/2">
        Enceintes
    </NavLink>
    <NavLink to ="categorie/Ampli/3">
        Ampli
    </NavLink>
    <NavLink to ="categorie/Tournedisque/4">
        Tournedisque
    </NavLink>
    <NavLink to ="categorie/Vinyles/5">
        Vinyles
    </NavLink>
    </nav>
    
    )
    
}

export default Navcategorie;