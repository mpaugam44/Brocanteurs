import {pool} from '../config/database.js'
const host = "http://martinpaugam.sites.3wa.io:9001/";
const port = 9300;
const BASE_URL = `${host}:${port}`;


const  selectSubCategories = ( req, res) => {
    
    let sqlCategorie = 'SELECT categories.name, categories.id FROM categories'
    let sqlGenre = 'SELECT * FROM genres'
    let sqlDecennie = 'SELECT * FROM decennie'
    let sqlMarque = 'SELECT * FROM marque'
 
    pool.query(sqlCategorie , ( error, categories, fields)=> {
        if(error) throw error; 
        pool.query(sqlGenre , ( error, genres, fields)=> {
            if(error) throw error; 
            pool.query(sqlDecennie , ( error, decennie, fields)=> {
                if(error) throw error; 
                pool.query(sqlMarque , ( error, marque, fields)=> {
                    if(error) throw error; 
                    res.json ({response:true , categories, genres, decennie, marque})
                })
            })
        })    
    })
    
    
}

// Ici nous appelons les requêtes sql  nécessaires pour pouvoir générer la data de notre selectXcategories
// Puis on les pool.query pour autoriser une connexion entre le front et la bdd

export default selectSubCategories ;