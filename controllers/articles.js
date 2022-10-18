import fs from 'fs'
import pool from '../config/database.js'
const host = "http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;


const showArticle = ( req, res) => {
    const {id} = req.params; 
    let thisArticle = ' SELECT * FROM articles'
    
    pool.query( thisArticle, ( error, article, fields) => {
        
        res.json({response:true,article})
        
    })
    
}

export {showArticle};