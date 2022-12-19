import {pool ,asyncQuery } from '../config/database.js'

const host = "http://http://martinpaugam.sites.3wa.io:9001/"
const port = 9300
const BASE_URL = `${host}:${port}`

const articleDetails = async(req, res) => {
    const {id} = req.params; 
    
    let thisArticle = 'SELECT articles.*, DATE_FORMAT(articles.date, "%d/%m/%Y") AS date, categories.name AS categories_name, decennie.date AS decennie_date FROM articles JOIN categories ON categorie_id = categories.id JOIN decennie ON decennie_ID = decennie.id WHERE articles.id = ?'
    
    let getUrl = 'SELECT url FROM pictures WHERE article_id = ? '
    let getComs = 'SELECT *,DATE_FORMAT(commentaire.date, "%d/%m/%Y") AS date FROM commentaire WHERE article_id = ?  '
    
    const article = await asyncQuery (thisArticle , [id])
    const url = await asyncQuery ( getUrl , [id])
    const commentaire = await asyncQuery ( getComs,[id] )
    const articleVinyle = await getVinyle(article)
    const articleGenre = await getGenre(articleVinyle)
    const articleMarque = await getMarque(articleGenre)
    
      res.json({response:true,article:articleMarque, commentaire, url})
        
                    
}  


const getVinyle = async (data) => {
    
    let getVinyleName ='SELECT name  FROM vinyle WHERE id = ? '
    if(data[0].id_vinyle){
        const vinyle = await  asyncQuery (getVinyleName ,[data[0].id_vinyle])
       
            return [{...data[0], vinyle_name:vinyle[0].name}]
    
    }else{
        return data
    }
    
    
    
}

const getGenre= async (data) => {
    let getGenreName = 'SELECT name  FROM genres WHERE id = ?'
    if(data[0].genre_ID){
        const genre = await asyncQuery( getGenreName ,[data[0].genre_ID] )
       
            return [{...data[0],genre_name:genre[0].name}]
    
    }else{
        return data
    }
    
    
    
}

const getMarque = async (data) => {
    
    
    let getMarqueName  = 'SELECT name FROM marque WHERE id = ?'
   
    if(data[0].id_marque){
            const marque =  await asyncQuery( getMarqueName , [data[0].id_marque] )
             return [{...data[0],marque_name:marque[0].name}]
             
    }else{
        
        return data
    }
    
}


const AddComs = (req, res) => {
    
    const {id} = req.params;
    let newComment = 'INSERT INTO commentaire (article_id, description, date, name, email ) VALUES ( ?, ?, ?, ?, ?) '
    // requête pour aller insérer le commentaire dans la BDD
    const params = [id , req.body.description, new Date(), req.body.name, req.body.email];
    pool.query(newComment, params, (error, commentaires, fields) =>{
        if(error) throw error
        res.json({response:true})
    })
    
}

  
  
  //Dans ce controller on récupère toutes les infos de l'article que l'on souhaite pour accéder à ses informations en détails 
  // Grâce à notre const asyncquery , on peut de façon asynchrone récupérer chaque informations de l'article l'une après l'autre.
  //Puis nous ajoutons dans la base de données les valeurs de ce qui a été rédigé dans le commentaire par l'utlisateur.

export {articleDetails , AddComs}