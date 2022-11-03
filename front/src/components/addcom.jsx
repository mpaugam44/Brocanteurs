import {useState, useContext} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import {ReducerContext} from "./reducer/reducer"
import {useParams} from 'react-router-dom'
import {useNavigate} from "react-router-dom";

const AddComs = () => {
    const params = useParams()
    
    const [state, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate();
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState ("")
    // on nomme les states dont on a besoin dans notre espace commentaire
    
    
    const submit = (e) => {
        e.preventDefault()
        //on ajoute un par un les fichiers de notre front pour les orienter vers notre bdd via notre back end
        
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
        .then(() => {
        
        })
    }    
    
    return(
    <form onSubmit={submit} encType="multipart/form-data">
            <label>
                Name
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Votre commentaire
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
               Email
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
           
            <input type='submit' value='Ajouter votre commentaire' />
        </form>
    )
    
}

export default AddComs;