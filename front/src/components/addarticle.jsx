import {useState, useContext} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import Selection from './selectXcategories.jsx'
import {useNavigate} from "react-router-dom";
import {ReducerContext} from "./reducer/reducer"
import {inputsLength} from "./inputLength/index.js"

const Addarticle = () => {
    
    const [state, dispatch] = useContext(ReducerContext)
    
    const [titre, setTitre] = useState("")
    const [description, setDescription] = useState("")
    const [prix, setPrix] = useState(0)
    const [categories, setCategories] = useState({
            categorie:"2",
            marque:"1",
            genre:"",
            decennie:"1",
            vinyle:"",
    })
    //on préremlit notre select via l'id de nos catégories
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();
    //on appelle nos const de redirection et de message pour setMsg les erreurs potentielles 
    const updateCat = (data) => {
        setCategories(data)
    }
    
    const submit = (e) => {
        e.preventDefault()
        const files = {...e.target.picture.files}
        
        const dataFile = new FormData();
       // on collecte chaque données de notre article dans une formulaire
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
        //on ajoute un par un les fichiers de notre formulaire dans un form data 
         
        if(!files[0]){
           setMsg("Veuillez fournir une image")
        }
        else{
            if(!inputsLength(titre,63)){
               setMsg("Votre titre est trop long")
            }else{ 
                if(!inputsLength(description,450)){
                    setMsg("Votre description est trop longue")
                }else{
                    if(!inputsLength(prix,7)){
                        setMsg("Votre prix est trop important") 
                    }
                    else{
                        
                        axios.post(`${BASE_URL}/addArticle`,dataFile)
                        .then((res) => {
                            if(res.data.response){
                                navigate("/articles")
                                
                            } else {
                                setMsg(res.data.msg)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                        
                    }    
                }    
                
            }  
            
        }            
    }
    
    // On vérifie si les données du formulaire sont conforme si oui on les orienter vers notre back end avec axios.post
    
   
    return (
        <form className="add_container" onSubmit={submit} encType="multipart/form-data">
            
            <label className="label_uniform">
                Titre
                <input type='text' value={titre} onChange={(e) => setTitre(e.target.value)} required/>
            </label>
            <label>
                
                <textarea type='text' placeholder="Veuillez ajouter votre description" value={description} onChange={(e) => setDescription(e.target.value)} required> </textarea>
            </label>
            <div className="label_uniform">
                <i>€</i>
                <input type="number" value={prix} placeholder="0.00" onChange={(e) => setPrix(e.target.value)} required /> 
            </div>
                 
            <label className="label_uniform">
                Photo
                <input  type='file' name='picture' required/>
            </label>
            <Selection updateForm={updateCat} />
            
            <input className="add_product" type='submit' value='Ajouter votre produit' />
            

            
        </form>
                               
    )
}

export default Addarticle;