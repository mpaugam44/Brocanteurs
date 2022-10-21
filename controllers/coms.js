import fs from 'fs'
import pool from '../config/database.js'
const host = "http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;


const showComs = ( req, res) => {
    const {id} = req.params; 
    let thisCom = ' SELECT * FROM commentaire WHERE article_id = ? '
    
    pool.query( thisCom, [id],( error, commentaire, fields) => {
    
        console.log(commentaire)
        res.json({response:true,commentaire})
        
    })
    
}

export {showComs};
