import fs from 'fs'
import {pool} from '../config/database.js'

const host = "http://http://martinpaugam.sites.3wa.io:9001/"
const port = 9300
const BASE_URL = `${host}:${port}`

const navCat = (res,req) => {
     let getCategories = 'SELECT * FROM categories';
     
     pool.query(getCategories,(error, categories, fields) => {
        if (error) throw error;
        res.json({response:true,
        categories
       })
    })
    
    
}

export {navCat}