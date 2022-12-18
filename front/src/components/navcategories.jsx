import {Fragment} from 'react'
import { NavLink } from "react-router-dom";


// Ici nous appelons juste notre composant NavCategorie que nous allons elle même appelerdans la nav principale.
// Seulement à l'état de user conecté.
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