import {useState, useContext, useEffect} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import Selection from './selectXcategories.jsx'
import {useNavigate} from "react-router-dom";
import {ReducerContext} from "./reducer/reducer"

const Addarticle = () => {
    
    const [state, dispatch] = useContext(ReducerContext)
    
    const [titre, setTitre] = useState("")
    const [description, setDescription] = useState("")
    const [prix, setPrix] = useState(0)
    const [categories, setCategories] = useState({})
     const navigate = useNavigate();
    
    const updateCat = (data) => {
        setCategories(data)
    }
    
    const submit = (e) => {
        e.preventDefault()
        const files = {...e.target.picture.files}
        
        const dataFile = new FormData();
        
        dataFile.append('files', files[0])
        dataFile.append('titre', titre)
        dataFile.append('description', description)
        categories.categorie && dataFile.append('categories', categories.categorie)
        categories.marque && dataFile.append('marque', categories.marque)
        categories.genre && dataFile.append('genre_ID', categories.genre)
        categories.decennie && dataFile.append('decennie_ID', categories.decennie)
        categories.vinyle && dataFile.append('vinyle', categories.vinyle)
        dataFile.append('userid', state.userid)
        dataFile.append('prix', prix)
        //on ajoute un par un les fichiers de notre front pour les orienter vers notre bdd via notre back end 
        axios.post(`${BASE_URL}/addArticle`,dataFile)
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
            setDescription("")
            setTitre("")
        })
        
    }
    
    useEffect(()=> {
        console.log(categories)
    })
   
    return (
        <form onSubmit={submit} encType="multipart/form-data">
            
            <label>
                Titre
                <input type='text' value={titre} onChange={(e) => setTitre(e.target.value)} required/>
            </label>
            <label>
                Description
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
                Prix
                <input type='number' value={prix} onChange={(e) => setPrix(e.target.value)} required />
            </label>
            <label>
                Photo
                <input type='file' name='picture' required/>
            </label>
            <Selection updateForm={updateCat} />
            
            <input type='submit' value='Ajouter votre produit' />
        </form>
                               
    )
}

export default Addarticle;