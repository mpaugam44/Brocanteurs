import pool from '../index.js'
import formidable from 'formidable'
import fs from 'fs'

const host = "http://http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;

const modifArticle = (req, res) => {
    
    const form = formidable({keepExtensions: true});
    const {id} = req.params;
    
    let updatArticle = 'UPDATE articles SET title = ?, date = ?, description= ?, categorie_id= ?, id_marque= ?, id_vinyle = ?, price = ? WHERE articles.id = ? '
   // let selectPictureUrl = ' SELECT url FROM pictures WHERE article_id'
     
}

export {modifArticle}