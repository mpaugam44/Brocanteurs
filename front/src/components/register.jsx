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
        if(!inputsLength(email,255)|| !inputsLength(password,255)){ 
            SetMessagerr("La longueur des champs n'est pas respectée") 
        }
        else{
            if(!checkRegExEmail(email)){
            SetMessagerr("L'email n'est pas au format requit")    
            }
            else{
                if(!checkRegExPassword(password)){
                    SetMessagerr("Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial")    
                }
                else{
                
                    axios.post(`${BASE_URL}/register`, data)
                    .then((res) => {
                       
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
    
    // Nous configurons à l'intérieur de notre submit toutes les gestions d'erreurs de nos input pour l'inscription de nos utilisateurs
    // Ces mêmes verifications appelés checkRegex sont appelés via notre  composant dans l'index.js placé dans l'inputLength
    // Grâce à nos multiples conditions, la contenance des inputs est vérifiés puis envoyé à la base de données via l'axios.post
    return (
      <div className="inscription_container">
      <h2 className="title_form">Inscription</h2>
      { messagerr !== "" && 
      <p>{messagerr}</p>
      }
        <form className ="form_container" onSubmit= {submit}>
            <label>
                Email:
                <input className="input_co" type='email' value={email} required  onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Password:
                <input className="input_co" type='password' auto-complete="new-password" value={password}  required onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Valider"/>
        </form>
      </div>  
    )
    
}    

export default Register  ;