import fs from 'fs'
import {pool} from '../config/database.js'

const host = "http://http://martinpaugam.sites.3wa.io:9001/"
const port = 9300
const BASE_URL = `${host}:${port}`

const allArticlesFromCat = (req, res) =>{
    const {id} = req.params

    let SelectionCat = 'SELECT articles.*,DATE_FORMAT(articles.date, "%d/%m/%Y %H:%i") AS date,pictures.url FROM articles JOIN pictures ON pictures.article_id = articles.id WHERE categorie_id = ? '
    
    pool.query( SelectionCat,[id],( error, articles, fields) => {
        res.json({response:true,
        articles    
        })
        
    })    
}


export {allArticlesFromCat} ;