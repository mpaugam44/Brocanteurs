import {generateToken, verifyToken} from './token.js'

const isLogged = async (req,res) => {
    const userData = await verifyToken(req.body.token)
    if(userData){
        const token = await generateToken(userData)
        res.json({response:true, ...userData, token})
    } else {
        res.json({response:false})
    }
};

// on appelle ce controller dans le axios.post de la nav pour regénérer un token 
// qui valide la session après rafraichissement de la page 

export { isLogged};