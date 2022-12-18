import {useState, useContext} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import {ReducerContext} from "./reducer/reducer"
import {useParams} from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import {inputsLength} from "./inputLength/index.js"

const AddComs = () => {
    const params = useParams()
    
    const [state, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate();
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState ("")
    const [msg,setMsg] = useState("")
    // on nomme les states dont on a besoin dans notre espace commentaire
    
    
    const submit = (e) => {
        e.preventDefault()
        //on ajoute un par un les fichiers de notre front pour les orienter vers notre bdd via notre back end
        
        if(!inputsLength(name,63)){
            setMsg("Votre nom est trop long")
        }else{ 
            if(!inputsLength(description,450)){
                setMsg("Votre description est trop longue")
            }else{
                if(!inputsLength(email,255)){
                   setMsg("Votre email est trop long") 
                }
                else{
        
                    axios.post(`${BASE_URL}/addComs/${params.id}`,{name,description,email,userid:state.userid})
                    .then((res) => {
                        if(res.data.response){
                           navigate("/articles")
                            // success
                        } else {
                            // echec
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    
                }
            }
        }    
    }
    // On envoit toutes les infos du commentaire vers la bdd et sa table. 
    
    return(
            <div className="addcom_container">
                <form onSubmit={submit} encType="multipart/form-data">
                        <label className="label_uniform">
                            Name
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                        </label>
                        <textarea type='text'placeholder="Veuillez ajouter votre commentaire" value={description} onChange={(e) => setDescription(e.target.value)} required >
                        </textarea>
                        
                        <label className="label_uniform">
                           Email
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </label>
                        <input type='submit' value='Ajouter votre commentaire' />
                        { msg !== ""  && <p> {msg} </p> }
                </form>
            </div>   
    )
    
}

export default AddComs;