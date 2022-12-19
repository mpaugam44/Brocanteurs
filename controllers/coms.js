import fs from 'fs'
import {pool} from '../config/database.js'
const host = "http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;


const showComs = ( req, res) => {
    const {id} = req.params; 
    let thisCom = ' SELECT *, DATE_FORMAT(commentaire.date, "%d/%m/%Y") AS date FROM commentaire WHERE article_id = ? '
    
    pool.query( thisCom, [id],( error, commentaire, fields) => {
    
        res.json({response:true,commentaire})
        
    })
    
}

//On sélectionne tout les infos du commentaire qui correspond à l'id de l'article dans lequel on se trouve.

export {showComs};
