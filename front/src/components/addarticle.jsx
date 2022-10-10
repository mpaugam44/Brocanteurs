import {useEffect, Fragment, useState} from 'react'
import BASE_URL from "../config.js"
import axios from 'axios'


const Addarticle =() => {
    const [categories , setCategories] = useState([]);
    const [genres, setGenres] = useState ([]);
    const [decennies , setDecennies] = useState([]);
    const [marques , setMarques] = useState([]);
    const [vinyle, setVinyle] = useState([]);
    
    
    const addNewart = (e) => {
        e.preventDefault()
        console.log(e.target.categories)
        
    
    /*const form = new FormData();
    form.append('categories', e.target.categories);
    form.append ('genres', e.target.genres);
    form.append ('decennies', e.target.decennies);
    form.append ('marques', e.target.marques);
    form.append('vinyle', e.target.vinyle);*/
    
    
    }
    
    
    
    return(
    <div>    
        <h2>Ajout d'articles</h2>
        
        
        
    </div>    
    )
    
}

export default Addarticle;