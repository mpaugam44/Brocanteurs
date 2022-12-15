import {Fragment, useEffect, useContext} from 'react'
import BASE_URL from "../config.js"
import { LOGIN, ADMIN } from "../config/constante.js"
import { NavLink } from "react-router-dom";



const NavCategorie = () => {
    
    
    return(
    <Fragment>
       
            <li className="navbar_item">
                <NavLink className="link" to ="categorie/2">
                    Enceintes
                </NavLink>
            </li>    
            <li className="navbar_item">
                <NavLink className="link" to ="categorie/3">
                    Ampli
                </NavLink>
            </li> 
            <li className="navbar_item">
                <NavLink className="link" to ="categorie/4">
                Tournedisque
            </NavLink>
            </li>
            <li className="navbar_item">
                <NavLink className="link" to ="categorie/5">
                    Vinyles
                </NavLink>
            </li>
    </Fragment>
    )
    
}

export default NavCategorie;