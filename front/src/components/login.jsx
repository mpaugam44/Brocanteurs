
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
                <input type="email" value={email}  required onChange={(e) => setEmail(e.target.value)} />
                
                <label>Password : </label>
                <input type="password" value={password} required  onChange={(e) => setPassword(e.target.value)}/>
                
                <input type="submit" value="valider"/>
            </form>
        </div>
    );
};

export default Login;