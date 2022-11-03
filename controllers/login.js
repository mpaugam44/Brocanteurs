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