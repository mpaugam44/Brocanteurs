import fs from 'fs'
import formidable from 'formidable'
import {pool} from '../config/database.js'
import {checkAcceptedExtensions} from'../components/checkExtension/index.js'
const host = "http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;

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

    const form = formidable({keepExtensions: true});
    
    form.parse(req, async (err, fields, files) => {
        console.log(1)
        const newFilename = files.files.newFilename;
        const oldPath = files.files.filepath;
        const newPath = `public/img/${newFilename}`;
        const file = files.files   
        const extensionIsValid =  await checkAcceptedExtensions(file)
    //  On appelle une à une nos const qui nous permettent de placer nos nouveaux fichiers
    // Ainsi que les const qui nous permettent de check la viabilité du fichier par notre const de validation de l'extension
        if(file.originalFilename === ''){
            res.json({response:false,msg:'Veuillez fournir une image'})
        }  
        
        
        
        else {
                if(!extensionIsValid){
                res.json({response:false,msg:'Veuillez respecter les formats jpg, jpeg, gif, png'})
                }
                else{
                        
                    const sqlCreatArticle = 'INSERT INTO articles (title,date,description,categorie_id,id_marque,id_vinyle,price,user_id,decennie_ID,genre_ID) VALUES (?,?,?,?,?,?,?,?,?,?)'
                    console.log(2)
                    const paramsSqlCreatArticle = [fields.titre,new Date(),fields.description,fields.categories,fields.marque,fields.vinyle,fields.prix,fields.userid,fields.decennie_ID,fields.genre_ID]
                    console.log(3)
                    pool.query(sqlCreatArticle,paramsSqlCreatArticle,(error, result) => {
                        console.log(fields.categories)
                        if (error) throw error;
                        const sqlGetID = 'SELECT id from articles ORDER BY id DESC LIMIT 1'
                        pool.query(sqlGetID,(error, articleId) => {
                            if (error) throw error;
                            const sqlAddImage = 'INSERT INTO pictures (url,caption,article_id) VALUE (?,?,?)'
                                    const paramsImg = [newFilename,fields.titre,articleId[0].id]
                                    pool.query(sqlAddImage,paramsImg,(error, articleId) => {
                                        if (err) throw err;
                                        fs.copyFile(oldPath, newPath, (err) => {
                                            if (err) throw err;
                                                res.json({response:true})
                                        })
                                    })
                        })
                    })
                }
        }
                
    })
    
}


export {showForm, addArticle};
