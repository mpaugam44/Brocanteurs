import {pool} from '../config/database.js'
const host = "http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;


const showArticle = ( req, res) => {
    const {id} = req.params; 
    let thisArticles = ' SELECT articles.*, DATE_FORMAT(articles.date, "%d/%m/%Y") AS date,pictures.url FROM articles JOIN pictures ON pictures.article_id = articles.id'
    
    pool.query( thisArticles,( error, articles, fields) => {
        
        res.json({response:true,articles})
        
    })
    
}
//On selectionne chaque information de nos articles pour les appeler dans le front.
export {showArticle};