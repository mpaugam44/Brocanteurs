// Imports / const modify / states necessaires aux changements articles /const submit / axios post / 
// use effect pour les données de rafraichissment
// return avec input sur le detail article 


import {React, useState, useEffect, useContext, Fragment} from 'react'
import PreModify from "./preArticleModify.jsx"
import BASE_URL from "../config.js"
import axios from 'axios'
import Selection from './selectXcategories.jsx'
import {ReducerContext} from "./reducer/reducer"



const ModifyArt = () => {
    
    //const [state, dispatch] = useContext()
    
    const [state, dispatch] = useContext(ReducerContext)
    
   
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
        pictures : ""
        
    })
    const [ picture, setPicture] = useState ("")
    
     const updateCat = (data) => {
        setSelect(data)
    }
    
    const updateArticleId = (data) => {
        setArticleId(data)
    }
    
    const updateArticle = (data) => {
        const newData = {
            title:data.title,
            description:data.description,
            price:data.price,
            decennies :data.decennie_ID,
            vinyle : data.id_vinyle,
            marque : data.id_marque,
            categories : data.categorie_id,
            date : data.date,
            genre: data.genre_ID,
        }
        const dataForSelect = {
            categorie:data.categorie_id ? data.categorie_id.toString() : "",
            marque:data.id_marque ? data.id_marque.toString() : "",
            genre:data.genre_ID ? data.genre_ID.toString() : "",
            decennie:data.decennie_ID ? data.decennie_ID.toString() : "",
            vinyle:data.id_vinyle ? data.id_vinyle.toString() : "",
        }
        setSelect(dataForSelect)
        console.log(newData)
        setArticle(newData)
        
    }
    
    const updatePicture = (data) => {
        setPicture(data)
    }
        const modifySubmit = (e) => {
            e.preventDefault()
            console.log(e.target.picture.files)
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
                // success
            } else {
                // echec
            }
        })
        .catch((err) => {
            console.log(err)
        })
        
    }
    
    return (
        <Fragment>
            <PreModify articleId = {articleId} article={article} picture={picture} updateArticleId={updateArticleId}  updateArticle={updateArticle} updatePicture={updatePicture} />
            
        <form onSubmit={modifySubmit} encType="multipart/form-data">
            {console.log(state)}
            <label>
                Titre
                <input type='text' value={article.title} onChange={(e) => setArticle({...article,title:e.target.value})} />
            </label>
            <label>
                Description
                <input type='text' value={article.description} onChange={(e) => setArticle({...article,description:e.target.value})} />
            </label>
            <label>
                Prix
                <input type='number' value={article.price} onChange={(e) => setArticle({...article,price:e.target.value})} />
            </label>
            <label>
                Photo
                <input type='file' name='picture'/>
            </label>
            {console.log(select)}
            { select.categorie && <Selection updateForm={updateCat} value={select}/> }
            
            <input type='submit' value='Ajouter vos modifications' />
        </form>
                               
    
        </Fragment>
        
        )
    

}

export default ModifyArt;
