import fs from 'fs'
//import formidable from 'formidable'
import pool from '../config/database.js'

const host = "http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;


const  selectSubcategories = ( req, res) => {
    
    let selectXcategories = 'SELECT categories.name,vinyle.id FROM categories JOIN vinyle ON vinyle.id = categories.vinyle_id'
 
    pool.query(selectXcategories , ( error, categories, fields)=> {
        if(error) throw error; 
        res.json ('addarticle.jsx', {
        categories
        })
    })
    
    
}