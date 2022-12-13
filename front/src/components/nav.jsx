import { NavLink, useLocation} from "react-router-dom";
import {useContext, Fragment, useEffect, useState } from "react"
import { ReducerContext } from "./reducer/reducer";
import Navcategorie from "./navcategories"
import BASE_URL from '../config/Api';
import {LOGIN,ADMIN} from '../config/constante.js';
import axios from 'axios';
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";




const Nav = (props) => {
  
  const [state, dispatch] = useContext(ReducerContext)
  const path = useLocation();
  
  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    if(!state.login && token){
      axios.post(`${BASE_URL}/isLogged`,{token})
      .then((res) => {
        if(res.data.token){
          axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
        }
        res.data.response && dispatch({type:LOGIN, payload:res.data.id})
        res.data.admin && dispatch({type:ADMIN})
      })
      .catch((err) => {
        console.log(err)
      })
    }
  })
  
  
  const [menu,setMenu] = useState(false);
  
  useEffect (() =>  {
    
    setMenu(false)
    
  },[path])
  
  
  
  
  
  
  
  
  
  return (
    
    <header> 
      <div className="navbar_NAME">
          <NavLink className="link" to="/">
              La Brocante du flux
          </NavLink>
      </div>
      <nav className={menu ? "navbar": "hidden"}>
          
        <ul className="navbar_links">
              
          {!state.login &&
            <Fragment>
             
              <li className="navbar_item">
                  <NavLink className="link" to="/register">
                  Register
                  </NavLink>
              </li>
              <li className="navbar_item">
                <NavLink className="link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="navbar_item">
                <NavLink className= "link" to="/articles">
                  Articles
                </NavLink>
              </li>
              
            </Fragment>
            }
            {state.login && 
              <Fragment>
                <li className="navbar_item">
                  <NavLink className ="link" to="/profil">
                    Profil
                  </NavLink>
                </li>
              <li className="navbar_item">
                <NavLink  className ="link" to="/addArticle">
                  Ajout d'article
                </NavLink>
              </li>
                 <li className="navbar_item">
                  <NavLink className ="link" to="/articles">
                    Articles
                  </NavLink>
                </li>
                <Navcategorie/> 
                <li className="navbar_item">
                    <NavLink className ="link" to="/logout">
                      Deconnexion
                    </NavLink>
                  </li>
                   
                </Fragment>
              }
              {state.admin && 
                <li className="navbar_item">
                  <NavLink  className ="navbar_link" to="/admin">
                    ADMIN
                  </NavLink>
                </li>
              }
            </ul>
           
        </nav>
         <button className ="navbar_button" onClick={()=>setMenu(!menu) } >
              Menu
            </button>
    </header>  
  );
};

/*onClick={()=>menu ? <AiOutlineMenu/> : <AiOutlineClose/> }*/

export default Nav;
