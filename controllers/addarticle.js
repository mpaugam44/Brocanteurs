import fs from 'fs'
import formidable from 'formidable'
import pool from '../config/database.js'
const host = "http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;
const form = formidable();
//Dans la route de type post qui traitera de la soumission du formulaire, on appelle le composant formidable comme ceci
const showForm = (req, res) => {
    
    let selectCategories = 'SELECT * FROM categories';
    
    pool.query(selectCategories,(error, categories, fields) => {
        if (error) throw error;
        res.json('addarticle.jsx', {
        base_url: BASE_URL,
        categories
        })
    })
}


const addArticle = (req, res) => {
    
    //let newArticle = 'INSERT INTO articles ( title, description, date) VALUES (?,?,?)'
    //let newCategorie = 'INSERT INTO articles_categories (article_id, categorie_id) VALUES((SELECT articles.id FROM articles WHERE articles.id =(SELECT(articles.id) FROM articles)), ?)'
    //requête pas forcément focntionelle
    //let newPictures = 'INSERT INTO articles( url, caption,articles_id) VALUES ( ?,?,?) '

    form.parse(req, function (err, fields, files) {
    //Méthode parse afin de récupérer les données qui proviennent du formulaire
    //Besoin en premier argument de la requête et elle renvoit une callback avec le contenu du formulaire 
    if (err) throw err;
    
   /* let newFilname = files.articles_id.newFilename
    let oldpath = files.articles_id.oldpath
    let newpath = 'public/img/'*/
    
     
        
    
        
    })
    
    
    
    
}


export {showForm, addArticle};
