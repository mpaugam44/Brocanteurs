import bcrypt from 'bcrypt';
import {pool} from '../config/database.js';
import {inputsLength} from '../components/inputLength/index.js'


const register = (req,res) => {
    
    const saltRounds = 10;
    let emailIsPresentSQL = "SELECT email FROM users WHERE email = ?"
    let AddUserSQL= "INSERT INTO users (email, password, role_id) VALUES (?, ?, 2)"
    
    if(inputsLength([req.body.email, req.body.password])){
       // on exprime la condition de la longueur des inputs via notre fonction qui provient
       // de notre inputLength/index.js
       // on a pas besoin de préciser la value pour req.body.email et req.body.password car elle st déjà expriméé dans la fonction
        pool.query(emailIsPresentSQL, [req.body.email], (error, user, fields) => {
            if (error) throw error;
            
            if(user[0]) {
                res.json({response:false, message:'Email déjà present'});
            } else {
                bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                    if(err) throw err;
                    
                    pool.query(AddUserSQL, [req.body.email, hash], (error, register, fields) => {
                        res.json({response:true});
                    });
                });
            }
        });
    } 
    else {
        res.json({response:false, msg:'champs trop long'});
    }
    
};

// Ici nous éxécutons les requêtes nécessaires pour ajouter un user à la bdd

export default register;