import {React, useState, useEffect, useContext, Fragment} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import PreModify from "./preArticleModify.jsx"
import Selection from './selectXcategories.jsx'
import DeleteArt from './deletearticle.jsx'
import {ReducerContext} from "./reducer/reducer"
import {useNavigate} from "react-router-dom";

const ModifyArt = () => {
    
    const [state, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate();
    const [select, setSelect] = useState({})
    const [articleId, setArticleId] =useState(null)
    const [article, setArticle] = useState ({
        title:"",
        description:"",
        price:"",
        decennies :"",
        vinyle : "",
        marque : "",
        categories : "",
        date : "",
        pictures : "",
        genre : "",
        user_id :""
        
    })
    const [ picture, setPicture] = useState ("")
    
     const updateCat = (data) => {
        setSelect(data)
    }
    
    const updateArticleId = (data) => {
        setArticleId(data)
    }
    
    const updateArticle = (data) => {
        console.log(data)
        const newData = {
            title:data.title,
            description:data.description,
            price:data.price,
            decennies: data.decennie_ID ? data.decennie_ID.toString() : "",
            vinyle : data.id_vinyle,
            marque : data.id_marque,
            categories : data.categorie_id,
            date : data.date,
            genre: data.genre_ID ? data.genre_ID.toString() : "",
            user_id: data.user_id
        }
        const dataForSelect = {
            categorie:data.categorie_id ? data.categorie_id.toString() : "",
            marque:data.id_marque ? data.id_marque.toString() : "",
            genre:data.genre_ID ? data.genre_ID.toString() : "",
            decennie:data.decennie_ID ? data.decennie_ID.toString() : "",
            vinyle:data.id_vinyle ? data.id_vinyle.toString() : "",
        }
        setSelect(dataForSelect)
        setArticle(newData)
        
    }
    
    const updatePicture = (data) => {
        setPicture(data)
    }
        const modifySubmit = (e) => {
            e.preventDefault()
            const files = {...e.target.picture.files}
        
            const dataFile = new FormData();
            dataFile.append('files', files[0])
            dataFile.append('title', article.title)
            dataFile.append('description',article.description)
            select.categorie && dataFile.append('categorie_id', select.categorie)
            select.marque && dataFile.append('marque_id', select.marque)
            select.genre && dataFile.append('genre', select.genre)
            select.decennie && dataFile.append('decennie', select.decennie)
            select.vinyle && dataFile.append('vinyle_id', select.vinyle)
            dataFile.append('userid', state.userid)
            dataFile.append('price', article.price)
        //on ajoute un par un les fichiers de notre front pour les orienter vers notre bdd via notre back end 
            axios.post(`${BASE_URL}/modifyArticle/${articleId}`,dataFile)
            .then((res) => {
                if(res.data.response){
                    navigate(`/articledetails/${articleId}`)
                // success
                } else {
                // echec
                }
            })
            .catch((err) => {
            console.log(err)
            })
        
        }
    
        useEffect (()=>{
        
        })
    
    return (
        <Fragment>
        {console.log(article)}
            
                
                
            <PreModify articleId ={articleId} article={article} picture={picture} updateArticleId={updateArticleId}  updateArticle={updateArticle} updatePicture={updatePicture} />
            {state.userid === article.user_id &&
                <form onSubmit={modifySubmit} encType="multipart/form-data">
        
                    <label>
                        Titre
                        <input type='text' value={article.title} required onChange={(e) => setArticle({...article,title:e.target.value})} />
                    </label>
                    <label>
                        Description
                        <input type='text' value={article.description} required onChange={(e) => setArticle({...article,description:e.target.value})} />
                    </label>
                    <label>
                        Prix
                        <input type='number' value={article.price} required onChange={(e) => setArticle({...article,price:e.target.value})} />
                    </label>
                    <label>
                        Photo
                        <input type='file' name='picture' required/>
                    </label>
                    
                    { select.categorie && <Selection updateForm={updateCat} value={select}/> }
                    
                    <input type='submit' value='Ajouter vos modifications' />
                </form>
                            
            }
                <DeleteArt articleId ={articleId} picture={picture}/>                
    
        </Fragment>
        
    )
}

export default ModifyArt;
