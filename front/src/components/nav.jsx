import { NavLink } from "react-router-dom";
import {useContext, Fragment, useEffect, useState} from "react"
import { ReducerContext } from "./reducer/reducer";
import Navcategorie from "./navcategories"
import BASE_URL from '../config/Api';
import {LOGIN,ADMIN} from '../config/constante.js';
import axios from 'axios';



const Nav = (props) => {
  
  const [state, dispatch] = useContext(ReducerContext)
  
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
  
  
  
  return (
    <nav className="navbar">
      
        <ul>
          
          {!state.login &&
          <Fragment>
            <li>
              <NavLink className="link" to="/">
                La Brocante du flux
              </NavLink>
            </li>
            <li>
                <NavLink className="link" to="/register">
                Register
                </NavLink>
            </li>
            <li>
              <NavLink className="link" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className= "link" to="/articles">
                Articles
              </NavLink>
            </li>
            
           
            
            
          </Fragment>
          }
          {state.login && 
            <Fragment>
              <li>
                <NavLink to="/">
                La Brocante du flux
                </NavLink>
              </li>
              <li>
                <NavLink to="/profil">
                  PROFIL
                </NavLink>
              </li>
            <li>
              <NavLink to="/addArticle">
                ADDARTICLE
              </NavLink>
            </li>
             <li>
              <NavLink to="/articles">
                ARTICLES
              </NavLink>
            </li>
             
            <li>
                <NavLink to="/logout">
                  LOGOUT
                </NavLink>
              </li>
               <Navcategorie/>
            </Fragment>
          }
          {state.admin && 
            <li>
              <NavLink to="/admin">
                ADMIN
              </NavLink>
            </li>
          }
        </ul>
       
    </nav>
  );
};

export default Nav;
