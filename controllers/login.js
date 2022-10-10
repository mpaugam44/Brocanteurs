import bcrypt from 'bcrypt';
import pool from '../config/database.js';


const connexionSubmit = (req,res) => {
    let getPasswordSQL = "SELECT password,role_id FROM users WHERE email = ?";
    
    const msgError = "identifiant ou mot de passe incorrect"
    
    pool.query(getPasswordSQL, [req.body.email], (error, user, fields) => {
        if (error) throw error;
        console.log(1)
        if(user[0]) {
        console.log(2)
    // on crypte nos inputs de mdp via le bcrypt.compare en comparant justement le mdp écrit dans
    // l'input et celui enregistré dans la bdd
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if (err) throw err;
                console.log(3)
                if(result === false) {
                    console.log(4)
                    res.json({response:false, message:msgError});
                } else {
                    console.log(5)
                    
    // installation des sessions admin et name avec les roles id et les emails pour le back 

                    const admin = user[0].role_id === 1 
                    const name = user[0].email
                    req.session.admin = admin
                    req.session.isLogged = true
                    res.json({response:true, admin, name});
                }
            });
        }
        else {
            console.log(6)
            res.json({response:false, message:msgError});
        }
    });
};

export default connexionSubmit;