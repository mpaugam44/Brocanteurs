import fs from 'fs'
import {pool} from '../config/database.js'

const host = "http://http://martinpaugam.sites.3wa.io:9001/"
const port = 9300
const BASE_URL = `${host}:${port}`

const allCatArticles = (req, res) =>{
    const {id} = req.params

    let SelectionCat = 'SELECT * from articles WHERE categorie_id = ? '
    
    pool.query( SelectionCat,[id],( error, articles, fields) => {
        res.json({response:true,
        articles    
        })
        
    })    
}


export {allCatArticles} ;