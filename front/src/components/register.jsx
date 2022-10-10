import {useState} from "react"
import axios from "axios"
import BASE_URL from '../config.js'
import {useNavigate} from "react-router-dom";
import {inputsLength} from '../components/inputLength/index.js'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
   
    const submit = (e) => {
        e.preventDefault();
        const data = {
            email, 
            password
        
        };
        if(inputsLength([email,password])){
//condition de la longueur d'input venant de notre fonction dans le back qui est importé via le front et notre dossier inputLength
            axios.post(`${BASE_URL}/register`, data)
            .then((res) => {
                console.log(res);
                if(res.data.response === true) {
                    navigate("/login")
                } 
                else {
                    window.alert("e-mail déjà utilisé")
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    };

    
    
    
    return (
      <div>
      <h2>Inscription</h2>
        <form onSubmit= {submit}>
            <label>
                Email:
                <input type='mail' value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="valider"/>
        </form>
      </div>  
    )
    
}    

export default Register  ;