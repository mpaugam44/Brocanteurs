import { useState, useEffect, useContext, Fragment} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'
import Selection from './selectXcategories.jsx'
import DeleteArt from './deletearticle.jsx'
import {ReducerContext} from "./reducer/reducer"
import {useNavigate, useLocation} from "react-router-dom";
import {inputsLength} from "./inputLength/index.js"

const ModifyArt = () => {
    
    const [state, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate();
    const [msg, setMsg] = useState("")
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
    
    
   // On appelle un à un nos states dont on a besoin.
    const getParams = () => {
        // console.log(path)
        const pathTable = path.pathname.split('/');
        // split des éléments de l'url pour les mettre dans un tableau
        const id = pathTable[pathTable.length-1];
        // dernier élément du tableau grâce à length-1
        setArticleId(id);
        // capacité grâce à setArticleId d'aller modifier l'id
        
    }
      
    useEffect(() => {
        getParams()
    } ,[])
    // on appelle notre fonction getParams pour aller récupérer l'id de l'article au rafraichissment de la page
    
    useEffect(() => {
        if(articleId) {
            getInfos()
            
        }  
    }, [articleId]) 

    const path = useLocation();


//
    
    
    const getInfos = () => {
        
        axios.get(`${BASE_URL}/articledetails/${articleId}`)
        
        // ce get ne sert qu'à aller chercher notre articleId et ce qu'il contient
        .then((res) => {
            if(res.data.response){
            
                updateArticle(res.data.article[0])
                setPicture(res.data.url[0].url)
               
                //on fait le .url[0].url pour aller chercher le premier url
                // on va chercher le setArticle car le setArticleId est déjà chargé par la fonction getParams
                
            } else {
                console.log(res.data.message)
            
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .then(() => {
           
        })
    } 
     const updateCat = (data) => {
        setSelect(data)
    }
    
    //  Remplissage nécessaire imo ? 
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
    //On récupère les infos renvoyés pas le getInfos et on les met en formes pour povoir les récupérer
    //via le formulaire de modification en les mettant en format string dan ce même formulaire. 
    
    
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
        
        if(!inputsLength(article.title,63)){
            setMsg("Votre titre est trop long")
        }else{ 
            if(!inputsLength(article.description,450)){
                setMsg("Votre description est trop longue")
            }else{
                if(!inputsLength(article.price,7)){
                   setMsg("Votre prix est trop important") 
                }
                else{
    
                    axios.post(`${BASE_URL}/modifyArticle/${articleId}`,dataFile)
                    .then((res) => {
                        if(res.data.response){
                            navigate(`/articledetails/${articleId}`)
                        // success
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
          // On envoie les informations à la bdd pour les modifications réalisés via notre updatecat et notre modify submit et on appelle ens uite le rendu de la mise à jour de ces nouvelles data  
    
    return (
        <div className="modify_container">
        <Fragment>
        
       
           
            {state.userid === article.user_id &&
           
           <Fragment>
            <button className="return" onClick={() =>navigate(`/articledetails/${articleId}`)} > Retour à l'article </button> 
            
            
                <form onSubmit={modifySubmit} encType="multipart/form-data">
        
                    <label className="label_uniform">
                        Titre
                        <input type='text' value={article.title} required onChange={(e) => setArticle({...article,title:e.target.value})} />
                    </label>
                    <label>
                        
                         <textarea type='text' placeholder="Veuillez ajouter votre description" value={article.description}  onChange={(e) => setArticle({...article,description:e.target.value})} required >
                         </textarea>
                         
                    </label>
                    <label className="label_uniform">
                        Prix
                        <input type='number' value={article.price} required onChange={(e) => setArticle({...article,price:e.target.value})} />
                    </label>
                    <label className="label_uniform">
                        Photo
                        <input type='file' name='picture' />
                    </label>
                    
                    { select.categorie && <Selection updateForm={updateCat} value={select}/> }
                    
                    <input type='submit' value='Ajouter vos modifications' />
                    { msg !== ""  && <p> {msg} </p> }
                    
                    
                </form>
            </Fragment>
                                        
            }
                         
            <DeleteArt className="delete_article" articleId ={articleId} picture={picture}/>     
                
    
        </Fragment>
        </div>
        
    )
}

export default ModifyArt;
