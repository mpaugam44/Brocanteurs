import {pool} from '../config/database.js'
import formidable from 'formidable'
import {checkAcceptedExtensions} from'../components/checkExtension/index.js'
import fs from 'fs'

const host = "http://http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;

const modifyArticle = (req, res) => {
    
    const form = formidable({keepExtensions: true});
    const {id} = req.params;
    const maxSize = 6000000;
    const acceptedExt = ['jpeg', 'jpg', 'png', 'gif']
    
    
    form.parse(req, (err, fields, files) => {
          if (err) throw err;
    
        const newTitle = fields.title;
        const newDate = new Date (); 
        const newDescription = fields.description;
        const newCategorie = fields.categorie_id
        const newMarque = fields.marque_id
        const newVinyle = fields.vinyle_id
        const newPrice = fields.price
        const newGenre = fields.genre
        const newDecennie = fields.decennie
    
      
        const updateArticle = 'UPDATE articles SET title = ?, date = ?, description= ?, categorie_id= ?, id_marque= ?, id_vinyle = ?, price = ?, decennie_ID = ?, genre_ID = ?  WHERE articles.id = ? '
        const selectPictureUrl = 'SELECT url FROM pictures WHERE article_id = ? '
        const updatePicture = 'UPDATE pictures SET url= ?  WHERE article_id = ? '
        
        
        
        
        
        
        pool.query(updateArticle,[newTitle, newDate, newDescription, newCategorie, newMarque, newVinyle, newPrice, newDecennie, newGenre, id ],async (error, article, fields) => {
            if (error) throw error;
            
            if (!files.files){
                // files.files est undefined réponse true 
                res.json({response:true})
                
            } 
            else{ 
                // si files.files est définit alors on check l'extension
                const file = files.files  
                const extensionIsValid =  await checkAcceptedExtensions(file,acceptedExt)
                
                if(!extensionIsValid){
                    // si l'extension n'est pas bonne reponse false
                res.json({response:false,msg:'Veuillez respecter les formats jpg, jpeg, gif, png'})
                }
                else {
                    if(file.size > maxSize) {
                    res.json({response: false, msg: 'Le fichier ne doit pas dépasser 6 mo'}) 
                
            
                    }
                    else{
                        // si ext. est bonne on remplace cette image par une nouvelle
             
                        pool.query(selectPictureUrl,[id], (error, oldUrl, fields) => {
                            if (error) throw error;
                            // on selectionne l'url de la photo dans le public/img et la bbd   
                            const oldUrlPath = 'public/img/'+ oldUrl[0].url;  
                            const newFilename = files.files.newFilename;
                            
                            pool.query(updatePicture, [newFilename, id],(error, newUrl, fields) => {
                                if (error) throw error;
                                const newUrlPath = 'public/img/'+ newFilename;  
                                     
                                fs.copyFile(files.files.filepath, newUrlPath, (err)=> {
                                    if (err) throw err;
                                
                                    if (newFilename && oldUrl[0].url){
                                        fs.unlink(oldUrlPath, (err) => {
                                            if (err) throw err;
                                            console.log(oldUrl[0].url)
                                            res.json ({response:true})
                                        })
                                    } 
                                })
                            })
                        })
                    }
                }
            }
        })
    })                              
}


    



export {modifyArticle} ;