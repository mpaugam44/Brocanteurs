import fs from 'fs'
import {pool} from '../config/database.js'


const host = "http://http://martinpaugam.sites.3wa.io:9001/"
const port = 9300
const BASE_URL = `${host}:${port}`



const articleDetails = (req, res) => {
     const {id} = req.params; 
     let thisArticle = ' SELECT * FROM articles WHERE id = ?'
     let getUrl = 'SELECT url FROM pictures WHERE article_id = ? '
     let getComs = 'SELECT * FROM commentaire WHERE article_id = ?  '
     pool.query(thisArticle, [id],  ( err, article, fields) => {
         //on doit spécifier ce qu'on va chercher dans notre pool.query
         if(err) throw err 
         pool.query(getUrl, [id],(err,url,fields)=> {
         // requête pour aller chercher l'url  de pictures dans notre bdd
             if(err) throw err
                 pool.query(getComs, [id],(err,commentaire,fields)=> {
                     if(err) throw err
                
                 res.json({response:true,article,url,commentaire})
                
                 })    
        
         
         })
        
     })
    
}   


const AddComs = (req, res) => {
    
    const {id} = req.params;
    let newComment = 'INSERT INTO commentaire (article_id, description, date, name, email ) VALUES ( ?, ?, ?, ?, ?) '
    // requête pour aller insérer le commentaire dans la BDD
    const params = [id , req.body.description, new Date(), req.body.name, req.body.email];
    pool.query(newComment, params, (error, commentaires, fields) =>{
        if(error) throw error
        res.json({response:true})
    })
    
}

  

export {articleDetails , AddComs}