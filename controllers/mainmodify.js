import pool from '../index.js'
import formidable from 'formidable'
import fs from 'fs'

const host = "http://juliengodard.sites.3wa.io";
const port = 9300;
const BASE_URL = `${host}:${port}`;

/*const ModifForm = (req, res) => {
    const {id} =  req.params;
    let thisArticle = `SELECT *, categories.id FROM articles JOIN articles_categories ON articles.id = articles_categories.article_id JOIN categories ON articles_categories.categorie_id= categories.id WHERE articles.id = ?`
    let allCategories = `SELECT * FROM categories`;
   
        pool.query(thisArticle, [id],(error, article, fields) => {
            if (error) throw error;
            console.log(article)
            pool.query(allCategories, (error, categories, fields) => {
                if (error) throw error
                res.json('mainmodify.jsx', {
                base_url: BASE_URL,
                article: article[0],
                categories
                })
            })
    })
}*/

//export...