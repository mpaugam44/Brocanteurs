import {useState} from "react"
import axios from "axios"
import BASE_URL from '../config.js'
import {useNavigate} from "react-router-dom";
import {inputsLength,checkRegExPassword,checkRegExEmail} from '../components/inputLength/index.js'

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [messagerr , SetMessagerr] = useState("")
    
    const navigate = useNavigate();
   
    const submit = (e) => {
        e.preventDefault();
        const data = {
            email, 
            password,
            messagerr
        
        };
        if(!inputsLength([email,password])){ 
            SetMessagerr("La longueur des champs n'est pas respectée") 
        }
        else{
            if(!checkRegExEmail(email)){
            SetMessagerr("L'email n'est pas au format requit")    
            }
            else{
                if(!checkRegExPassword(password)){
                    SetMessagerr("Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spéciale")    
                }
                else{
                
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
            }
        }        
    };

    return (
      <div>
      <h2>Inscription</h2>
      { messagerr !== "" && 
      <p>{messagerr}</p>
      }
        <form className ="form_register" onSubmit= {submit}>
            <label>
                Email:
                <input className="input_register" type='email' value={email} required  onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input className="input_register" type='password' value={password}  required onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Valider"/>
        </form>
      </div>  
    )
    
}    

export default Register  ;