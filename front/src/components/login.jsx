/*import {useState, useContext} from "react"
import axios from "axios"
import BASE_URL from "../config.js"
import { useNavigate } from "react-router-dom";
import { ReducerContext } from "./reducer/reducer.jsx";
import { LOGIN, ADMIN } from "../config/constante.js"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const[state, dispatch] = useContext(ReducerContext)
    
    const navigate = useNavigate();

    
    const submit = (e) => {
        e.preventDefault();
        // toujours au début de la fonction et non à la fin 
        const dataUser = {
            email,
            password
        };
        axios.post(`${BASE_URL}/login`, dataUser)
        .then((res) => {
            if(res.data.response){
                dispatch({type:LOGIN, payload:res.data.id})
                res.data.admin && dispatch({type:ADMIN})
                navigate("/",{replace:true})
            } 
            else {
                console.log(res.data.message)
            }
        })
        .catch((err) => {
            console.log(err);
            //window.alert(res.data.message)
        })
    };
    
    return(
        <div>
        <h2>S'identifier</h2>
        <form onSubmit={submit}>
            <label> 
             Email 
             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label> 
             Password
             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="valider"/>
        </form>
        </div>
        
    );
}

export default Login;*/

import { useState, useContext } from 'react';
import axios from 'axios';
import BASE_URL from '../config/Api';
import { useNavigate } from "react-router-dom";
import { ReducerContext } from "./reducer/reducer";
import { LOGIN, ADMIN } from '../config/constante'

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, dispatch] = useContext(ReducerContext)
    
    const navigate = useNavigate();
    
    const submit = (e) => {
        const dataUser = {
            email,
            password
        };
        
        e.preventDefault();
        axios.post(`${BASE_URL}/login`, dataUser)
        .then((res) => {
            // si tout ce passe bien :
            if(res.data.response) {
                localStorage.setItem('jwtToken', res.data.token)
                axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
                dispatch({type:LOGIN, payload:res.data.id})
                res.data.admin && dispatch({type:ADMIN})
                navigate("/")
            } else {
                window.alert(res.data.message)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };
    return (
        <div>
            <h2>Formulaire de connexion</h2>
            <form onSubmit={submit}>
                <label>Mail : </label>
                <input type="mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <label>Password : </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                <input type="submit" value="valider"/>
            </form>
        </div>
    );
};

export default Login;