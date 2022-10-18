import {useState, useContext} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import Selection from './selectXcategories.jsx'
import {ReducerContext} from "./reducer/reducer"

const Addarticle = () => {
    
    const [state, dispatch] = useContext(ReducerContext)
    
    const [titre, setTitre] = useState("")
    const [description, setDescription] = useState("")
    const [prix, setPrix] = useState(0)
    const [categories, setCategories] = useState({})
    
    
    const updateCat = (data) => {
        setCategories(data)
    }
    
    const submit = (e) => {
        e.preventDefault()
        const files = {...e.target.avatar.files}
        // trouver le moyen de dégager avatar 
        const dataFile = new FormData();
        dataFile.append('files', files[0], files[0].name)
        dataFile.append('titre', titre)
        dataFile.append('description', description)
        
        categories.categorie && dataFile.append('categories', categories.categorie)
        categories.marque && dataFile.append('marque', categories.marque)
        categories.genre && dataFile.append('genre', categories.genre)
        categories.decennie && dataFile.append('decennie', categories.decennie)
        categories.vinyle && dataFile.append('vinyle', categories.vinyle)
        dataFile.append('userid', state.userid)
        dataFile.append('prix', prix)
        //on ajoute un par un les fichiers de notre front pour les orienter vers notre bdd via notre back end 
        axios.post(`${BASE_URL}/addArticle`,dataFile)
        .then((res) => {
            if(res.data.response){
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
    
   
    return (
        <form onSubmit={submit} encType="multipart/form-data">
            <label>
                Titre
                <input type='text' value={titre} onChange={(e) => setTitre(e.target.value)} />
            </label>
            <label>
                Description
                <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Prix
                <input type='number' value={prix} onChange={(e) => setPrix(e.target.value)} />
            </label>
            <label>
                Photo
                <input type='file' name='avatar'/>
            </label>
            <Selection updateForm={updateCat} />
            
            <input type='submit' value='Ajouter votre produit' />
        </form>
                               
    )
}

export default Addarticle;