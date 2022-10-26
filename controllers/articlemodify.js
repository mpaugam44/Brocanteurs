import {pool} from '../config/database.js'
import formidable from 'formidable'
import fs from 'fs'

const host = "http://http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;

const modifyArticle = (req, res) => {
    
    const form = formidable({keepExtensions: true});
    const {id} = req.params;
    
    let updateArticle = 'UPDATE articles SET title = ?, date = ?, description= ?, categorie_id= ?, id_marque= ?, id_vinyle = ?, price = ?, decennie_ID = ?, genre_ID = ?  WHERE articles.id = ? '
    let selectPictureUrl = 'SELECT url FROM pictures WHERE article_id = ? '
    let updatePicture = 'UPDATE pictures SET url= ?  WHERE article_id = ? '
    
    form.parse(req, (err, fields, files) => {
    
        if (err) throw err;
       // let newFileName = files.files.oldPath
        
        const newTitle = fields.title;
        const newDate = new Date (); 
        const newDescription = fields.description;
        const newCategorie = fields.categorie_id
        const newMarque = fields.marque_id
        const newVinyle = fields.vinyle_id
        const newPrice = fields.price
        const newGenre = fields.genre
        const newDecennie = fields.decennie
        let newFileName = files.files.newFileName;
        
        
        
        
        pool.query(updateArticle,[newTitle, newDate, newDescription, newCategorie, newMarque, newVinyle, newPrice, newDecennie, newGenre, id ], (error, article, fields) => {
            if (error) throw error;
            console.log(newFileName)
            if (files.files.originalFilename === ''|| !files.files.originalFilename){
            
            res.json({response:true})
            }
            else{
                 
                
                
                pool.query(selectPictureUrl,[id], (error, oldUrl, fields) => {
                    if (error) throw error;
                        
                    const oldUrlPath = 'public/img/'+ oldUrl[0].url;  
                    
                    pool.query(updatePicture, [newFileName, id],(error, newUrl, fields) => {
                        if (error) throw error;
                           
                        const newUrlPath = 'public/img/'+ newUrl[0].url;  
                         
                         
                        fs.copyFile(oldUrlPath, newUrlPath, (err)=> {
                            if (err) throw err;
                        
                            if (newUrl[0].url !== null){
                                fs.unlink(oldUrlPath, (err) => {
                                    if (err) throw err;
                                    res.json ({response:true})
                                })
                            } 
                           
                        })
                        
                        
                    })
                    
                })
            }
        
                
        })
        
            
        
            
              
                    
    })                 
                   
                
}


    



export {modifyArticle} ;