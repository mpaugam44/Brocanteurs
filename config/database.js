import mysql from "mysql";

let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "martinpaugam", // identifiant BDD
    password: "d6b13b22ce8a2038b14ff1cd36f9b86b", // le password
    database: "martinpaugam_brocante" // nom de la base de donnée
});


export default pool;