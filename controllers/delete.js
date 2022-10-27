//'DELETE FROM articles WHERE id = ? '
// 'DELETE FROM commentaire WHERE article_id = ?' 
// 'DELETE  FROM pictures WHERE article_id ? '

//pool.query [id]
//pool.query [article_id]
// pool.query [artilce_id]
// fs.unlink pour le picture et la suppression de la picture dans notre public/img




import {pool} from '../config/database.js'
import formidable from 'formidable'
import fs from 'fs'


const host = "http://http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;


const DeleteArticle = (req, res) => {
    const {id} = req.params;
    
  
    let deleteCom = 'DELETE FROM commentaire WHERE article_id = ? '
    let deletePicture = 'DELETE FROM pictures WHERE article_id = ? '
    let deleteArt = 'DELETE FROM articles WHERE id = ?'
    
    console.log(req.body)
    pool.query(deleteCom, [id],(error, com, fields) => {
            if (error) throw error;
            
            
            pool.query(deletePicture, [id],(error, url, fields) => {
              if (error) throw error;
              console.log(2)
              const oldPic = 'public/img/' + req.body.picture
              
                fs.unlink (oldPic,(err) =>{
                    if (err) throw err;
                    console.log(3)
                    
                    pool.query(deleteArt ,[id] , (error, article, fields) => {
                        if (error) throw error;
                         console.log(4)
                         res.json ({response:true})
                        console.log(5)
                    })
                        
            })
        })
    })
}


export {DeleteArticle}