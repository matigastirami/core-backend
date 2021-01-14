import jwt from 'jsonwebtoken'
import config from 'config'

export default (req,res,next) => {
    var token = req.headers.authorization;

    jwt.verify(token, process.env.JWTSecret || config.get('JWTSecret'), function(err, decoded) {
        if(err){
            console.log(err)
            res.status(401).send({'message': 'Sesión expirada'})
        }
        else {
            req.body.user = decoded;
            next();
        }
    });
}