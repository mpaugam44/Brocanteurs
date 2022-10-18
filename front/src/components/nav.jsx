import { NavLink } from "react-router-dom";
import { ReducerContext } from "./reducer/reducer.jsx";
import {useContext, Fragment, useEffect} from "react"

const Nav = (props) => {
 const [state, dispatch] = useContext(ReducerContext)
 
  const checkIsactive = ({ isActive }) => {
    return {
      display: "block",
      margin: "1rem 0",
      color: isActive ? "orange" : "",
      
      
    };
  };
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            HOME
          </NavLink>
        </li>
        {!state.login &&
        <Fragment>
          <li>
              <NavLink to="/register">
              REGISTER
              </NavLink>
          </li>
          <li>
            <NavLink to="/login">
              LOGIN
            </NavLink>
          </li>
          <li>
            <NavLink to="/article">
              Articles
            </NavLink>
          </li>
          
          
        </Fragment>
        }
        {state.login && 
          <Fragment>
            <li>
              <NavLink to="/profil">
                PROFIL
              </NavLink>
            </li>
            <li>
            <NavLink to="/selectXcategories">
              SELECTION
            </NavLink>
          </li>
          <li>
            <NavLink to="/addArticle">
              Addarticle
            </NavLink>
          </li>
          <li>
              <NavLink to="/logout">
                LOGOUT
              </NavLink>
            </li>
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
