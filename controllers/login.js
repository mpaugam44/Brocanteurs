/*import bcrypt from 'bcrypt';
import pool from '../config/database.js';


const connexionSubmit = (req,res) => {
    let getPasswordSQL = "SELECT password,role_id,id FROM users WHERE email = ?";
    
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
                    const id = user[0].id
                    req.session.admin = admin
                    req.session.isLogged = true
                    res.json({response:true, admin, name, id});
                }
            });
        }
        else {
            console.log(6)
            res.json({response:false, message:msgError});
        }
    });
};

export default connexionSubmit;*/
import bcrypt from 'bcrypt';
import {asyncQuery} from '../config/database.js';
import {generateToken} from "../controllers/token.js"

const getUserData = async (email) => {
    let getUserSQL = "SELECT password,role_id,id FROM users WHERE email = ?";
    const userDataSQL = await asyncQuery(getUserSQL,[email])
    
    return userDataSQL[0]
}


const generateResponse = async (userDataSQL) => {
    const admin = userDataSQL.role_id === 1 
    const user = true 
    const name = userDataSQL.email
    const id = userDataSQL.id
    const userData = { 
        user,admin,id,name
    }
    const token = await generateToken(userData)
    
    return {response:true, user,admin,id,name, token}
}

const connexionSubmit = async (req, res) => {
    const {password, email} = req.body
    const failJson = {response:false, message:"identifiant ou mot de passe incorrect"}
    const userDataSQL = await getUserData(email)
    console.log(userDataSQL)
    const passwordMatch = userDataSQL ? await bcrypt.compare(password, userDataSQL.password) : null
    const response = (userDataSQL && passwordMatch) ? await generateResponse(userDataSQL, passwordMatch): failJson
    
    res.json(response)
}

export default connexionSubmit;