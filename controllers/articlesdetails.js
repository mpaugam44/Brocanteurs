import fs from 'fs'
import pool from '../config/database.js'


const host = "http://http://martinpaugam.sites.3wa.io:9001/"
const port = 9300
const BASE_URL = `${host}:${port}`



const detailShow = (req, res) => {
    
    let sql = 'SELECT title, description FROM articles WHERE id = ?';
    
}    


export default detailShow