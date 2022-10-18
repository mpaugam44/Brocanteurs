import fs from 'fs'
import pool from '../config/database.js'


const host = "http://http://martinpaugam.sites.3wa.io:9001/"
const port = 9300
const BASE_URL = `${host}:${port}`



const ArticlesDetails = (req, res) => {
    
   
    // let  artDetails = ' SELECT date, title, description, categorie_id, id_marque, id_vinyle , price FROM articles WHERE id = ( ?)  '
    
    //let 
}    


const AddComs = (req, res) => {
    
    
    
    
}



export {ArticlesDetails, AddComs}