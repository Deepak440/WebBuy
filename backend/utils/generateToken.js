import jwt from 'jsonwebtoken';


// Pass the id as payload
const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET,{
        expiresIn : '30d'
    });

} 


export default generateToken;