import fs from 'fs'
import formidable from 'formidable'
import pool from '../config/database.js'
const host = "http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;



/*const getSelectedCategories = ( req, res) => {
    let sql1 = ' INSERT categories.name, categorie_id into articles.id WHERE value (?, ? ) JOIN * FROM genres JOIN * FROM decennie JOIN * FROM marque'
    
    pool.query (sql1 , (error, categories, fields) => {
        if (error) throw error ; 
        res.json ('')
    })
    
    
}*/


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
        
        const sqlCreatArticle = 'INSERT INTO articles (title,date,description,categorie_id,id_marque,id_vinyle,price) VALUES (?,?,?,?,?,?,?)'
        const paramsSqlCreatArticle = [fields.titre,new Date(),fields.description,fields.categories,fields.marque,fields.vinyle,fields.prix]
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
    
    
    
    //let newArticle = 'INSERT INTO articles ( title, description, date) VALUES (?,?,?)'
    //let newCategorie = 'INSERT INTO articles_categories (article_id, categorie_id) VALUES((SELECT articles.id FROM articles WHERE articles.id =(SELECT(articles.id) FROM articles)), ?)'
    //requête pas forcément focntionelle
    //let newPictures = 'INSERT INTO articles( url, caption,articles_id) VALUES ( ?,?,?) '

    // form.parse(req, function (err, fields, files) {
    //Méthode parse afin de récupérer les données qui proviennent du formulaire
    //Besoin en premier argument de la requête et elle renvoit une callback avec le contenu du formulaire 
    // if (err) throw err;
    
   /* let newFilname = files.articles_id.newFilename
    let oldpath = files.articles_id.oldpath
    let newpath = 'public/img/'*/
    
     
        
    
        
    })
    
    
    
    
}


export {showForm, addArticle};
