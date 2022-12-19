import {Fragment} from 'react'
import { NavLink } from "react-router-dom";


// Ici nous appelons juste notre composant NavCategorie que nous allons elle même appeler dans la nav principale.
// Seulement à l'état de user conecté.
const NavCategorie = () => {
    

    
    
    return(
    <Fragment>
       
            <li className="navbar_item">
                <NavLink title="Redirection vers page Enceintes"className="link" to ="categorie/2">
                    Enceintes
                </NavLink>
            </li>    
            <li className="navbar_item">
                <NavLink title="Redirection vers page Amplis" className="link" to ="categorie/3">
                    Amplis
                </NavLink>
            </li> 
            <li className="navbar_item">
                <NavLink title="Redirection vers page Tournedisques"className="link" to ="categorie/4">
                Tournedisques
            </NavLink>
            </li>
            <li className="navbar_item">
                <NavLink title="Redirection vers page Vinyles" className="link" to ="categorie/5">
                    Vinyles
                </NavLink>
            </li>
    </Fragment>
    )
    
}

export default NavCategorie;