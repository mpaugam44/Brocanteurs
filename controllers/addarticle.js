import fs from 'fs'
import formidable from 'formidable'
import {pool} from '../config/database.js'
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

const checkAcceptedExtensions = (file) => {
	const type = file.mimetype.split('/').pop()
	const accepted = ['jpeg', 'jpg', 'png', 'gif']
	if (accepted.includes(type)) {
	    return true
	}
	return false
}

const addArticle = (req, res) => {

    const form = formidable({keepExtensions: true});
    /*
    1) ajouter l'article en BDD
    2) recuperer l'id de l'article 
    3) ajouter les images en BDD
    */
    form.parse(req, (err, fields, files) => {
           console.log(fields) 
        const sqlCreatArticle = 'INSERT INTO articles (title,date,description,categorie_id,id_marque,id_vinyle,price,user_id,decennie_ID,genre_ID) VALUES (?,?,?,?,?,?,?,?,?,?)'
        const paramsSqlCreatArticle = [fields.titre,new Date(),fields.description,fields.categories,fields.marque,fields.vinyle,fields.prix,fields.userid,fields.decennie_ID,fields.genre_ID]
        pool.query(sqlCreatArticle,paramsSqlCreatArticle,(error, result) => {
            if (error) throw error;
            const sqlGetID = 'SELECT id from articles ORDER BY id DESC LIMIT 1'
            pool.query(sqlGetID,(error, articleId) => {
                if (error) throw error;
                let newFilename = files.files.newFilename;
                let oldPath = files.files.filepath;
                let newPath = `public/img/${newFilename}`;
                const file = files.files
                if(files.originalFilename !== ''){
                    if(checkAcceptedExtensions(file)){
                        const sqlAddImage = 'INSERT INTO pictures (url,caption,article_id) VALUE (?,?,?)'
                        const paramsImg = [newFilename,fields.titre,articleId[0].id]
                        pool.query(sqlAddImage,paramsImg,(error, articleId) => {
                            if (err) throw err;
                            fs.copyFile(oldPath, newPath, (err) => {
                                if (err) throw err;
                                res.json({response:true})
                            })
                        })
                    }
                }
            })
        })
    
    
    
    
    
     
        
    
        
    })
    
    
    
    
}


export {showForm, addArticle};
