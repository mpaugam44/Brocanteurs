import {pool} from '../config/database.js'
import formidable from 'formidable'
import fs from 'fs'


const host = "http://http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;


const deleteArticle = (req, res) => {
    const {id} = req.params;
    
  
    let deleteCom = 'DELETE FROM commentaire WHERE article_id = ? '
    let deletePicture = 'DELETE FROM pictures WHERE article_id = ? '
    let deleteArt = 'DELETE FROM articles WHERE id = ?'
    
    pool.query(deleteCom, [id],(error, com, fields) => {
            if (error) throw error;
            
            
            pool.query(deletePicture, [id],(error, url, fields) => {
              if (error) throw error;
              const oldPic = 'public/img/' + req.body.picture
              
                fs.unlink (oldPic,(err) =>{
                    if (err) throw err;
                    
                    pool.query(deleteArt ,[id] , (error, article, fields) => {
                        if (error) throw error;
                         
                         res.json ({response:true})
                        
                    })
                        
            })
        })
    })
}


export {deleteArticle}