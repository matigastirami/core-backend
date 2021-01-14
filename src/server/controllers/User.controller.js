import UserModel from '../models/User.model'
import jwt from 'jsonwebtoken';
import moment from 'moment';
import bcrypt from 'bcryptjs'
import config from 'config'

export default class UserController {
    static listUsers(req,res){
        UserModel.find(req.query)
            .exec()
            .then(
                docs => {
                    res.json(docs)
                },
                err => {
                    console.log(err)
                }
            )
    }

    static getUserInfo(req,res){
        var userID = req.query._id

        if(!userID) return res.status(400).send({'message': 'Debe enviar el id de usuario'})

        UserModel.findOne({_id: userID}, (err, user) => {
            if(err) return res.status(500).send({'message': 'No se pudo procesar la solicitud'})
            else{
                if(!user) return res.status(404).send({'message': 'No se pudo procesar la solicitud'})

                return res.status(200).send(user)
            }
        })
    }

    static createUser(req,res){
        let user = new UserModel();

        if(!req.body.username || req.body.username.trim() == "")
            return res.status(400).send({'message': 'Debe enviar el nombre de usuario'});
        if(!req.body.email || req.body.email.trim() == "")
            return res.status(400).send({'message': 'Debe enviar el email'});
        if(!req.body.password || req.body.password.trim() == "")
            return res.status(400).send({'message': 'Debe enviar la contraseña'});
        if(!req.body.appId || req.body.appId.trim() == "")
            return res.status(400).send({'message': 'Debe enviar el id de la app'});
        if(!req.body.roleId || req.body.roleId.trim() == "")
            return res.status(400).send({'message': 'Debe enviar id del rol'});
        if(!req.body.permissions || !Array.isArray(req.body.permissions))
            user.permissions = []

        user.username = req.body.username;
        user.email = req.body.email;
        user.appId = req.body.appId;
        user.roleId = req.body.roleId;
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.permissions = req.body.permissions;

        bcrypt.genSalt(10, (err, salt) => {
            if(err){
                console.log(err)
                return res.status(500).send({'message': 'Error al intentar generar el usuario'})
            }
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                user.password = hash

                user.save((err, doc) => {
                    if(err) {
                        console.log("Error en UserController.createUser", err)
                        if(err.code == 11000){
                            return res.status(400).send({'message': err.errmsg})
                        }
                        else
                            return res.status(500).send({'message': 'Internal server error'})
                    }
                    else{
                        return res.status(200).send({'message': 'Usuario creado con éxito', '_id': doc._id })
                    }
                })
            })
        })
    }

    static async getMyProfileInfo(req, res){
        if(!req.query._id){
            return res.status(400).send({'message': 'Debe ingresar el ID de usuario'})            
        }

        try{
            let queryResult = await UserModel
                .findOne({_id: req.query._id})
                .populate("appId")
                .populate("roleId")
                .exec();

            if(!queryResult){
                return res.status(404).send({ "err": true, "message": "No encontrado" });
            }

            var user = {};
            Object.assign(user, queryResult._doc)

            var permissions = [];
            permissions.push({
                app: user.appId,
                roles: [{
                    role: user.roleId
                }]
            });

            //console.log(permissions)

            user["permissions"] = permissions;

            delete user.appId;
            delete user.roleId;

            //console.log(user)

            return res.status(200).send(user);
        }
        catch(ex){
            return res.status(500).send({ "err": true, "message": ex })
        }        
    }

    static async addRoleToUser(req, res){
        if(!req.query._id){
            return res.status(400).send({'message': 'Debe ingresar el ID de usuario'})
        }

        let permissions = req.body.permisions;

        if(!Array.isArray(permissions) || !permissions.length){
            return res.status(400).send({'message': 'El parámetro permisos debe ser un array de al menos 1 elemento'});
        }

        

        let updateResult = await UserModel.findByIdAndUpdate(req.query._id, req.body);


    }

    static updateUser(req,res){
        if(!req.query._id){
            return res.status(400).send({'message': 'Debe ingresar el ID de usuario'})
        }
        UserModel.findByIdAndUpdate(req.query._id, req.body, (err, updated) =>{
            if(err){
                return res.status(500).send({'message': err.errmsg || 'Error de servidor'})
            }
            else{
                if(!updated){
                    return res.status(404).send({'message': 'Usuario no encontrado'})
                }
                else{
                    return res.status(200).send({'message': 'Usuario actualizado con éxito', 'updated': updated._id || 'No encontrado'})
                }
            }
        })
        
    }

    static deleteUser(req,res){

        if(!req.query._id){
            res.status(400).send({'message': 'Debe indicar el usuario a eliminar'})
        }

        var _id = req.query._id;

        UserModel.findByIdAndRemove(_id, (err, deleted) => {
            if(err)
                return res.status(500).send({'message': 'Internal server error'})
            else{
                return res.status(200).send({'message': 'Usuario eliminado con éxito', deleted})
            }
        })
    }

    static getLoginToken(req, res){

        if(!req.body.username || !req.body.password){
            return res.status(400).send({'message': 'Debe enviar sus credenciales'})
        }

        UserModel.find({
            username: req.body.username
        }, (err, doc) => {
            if(err){
                return res.status(500).send({'message': 'Ocurrió un error al intentar loguerse'})
            }
            else {
                console.log(doc)
                if(!doc.length){
                    return res.status(404).send({'message': 'Usuario y/o contraseña inválidos'})
                }
                else{
                    var doc = doc[0]
                    bcrypt.compare(req.body.password, doc.password, (err, same) => {
                        if(err) {
                            console.log("Error en bcrypt.compare: ", err)
                            return res.status(503).send({'message': 'Error al intentar ingresar, intente nuevamente más tarde'})
                        }
                        else {
                            if(!same){
                                return res.status(401).send({'message': 'Usuario y/o contraseña inválidos'})
                            }
                            jwt.sign({
                                _id: doc._id,
                                username: doc.username,
                                email: doc.email,
                                permissions: doc.permissions,
                                exp: moment().add(2,'h').unix()
                            }, process.env.JWTSecret || config.get("JWTSecret"), (err, token) => {
                                if(err) 
                                    return res.status(500).send({'message': 'Ocurrió un error al intentar loguearse'})
                                else {
                                    return res.status(200).send({"token": token, "username": doc.username, "email": doc.email, "password": doc.password, "_id": doc._id})
                                }
                            })
                        }
                    })
                }
            }
        })
    }



    static changePassword(req, res){
        console.log("Llegó: ", req.body.user)

        if(!req.body._id)
            return res.status(401).send({'message': 'Debe especificar el usuario'})
        if(!req.body.newpassword)
            return res.status(401).send({'message': 'Debe especificar la nueva contraseña'})
        if(req.body._id != req.body.user._id)
            return res.status(400).send({'message': 'Sin autorización para realizar la operación'})

        UserModel.findOne({_id: req.body._id}, (err, doc) => {
            if(err){
                console.log(err)
                return res.status(500).send({'message': 'Ocurrió un error al intentar realizar la operación'})
            }
            else{
                if(!doc){
                    return res.status(404).send({'message': 'Usuario no encontrado'})
                }
                else {
                    bcrypt.genSalt(10, (err, salt) => {
                        if(err){
                            console.log(err)
                            return res.status(500).send({'message': 'Error al intentar cambiar la contraseña'})
                        }
                        bcrypt.hash(req.body.newpassword, salt, (err, hash) => {
                            if(err){
                                console.log(err)
                                return res.status(500).send({'message': 'Error al intentar cambiar la contraseña'})
                            }
                            UserModel.findByIdAndUpdate(req.body._id, {password: hash}, (err, updated) => {
                                if(err){
                                    console.log(err)
                                    return res.status(500).send({'message': 'Error al intentar cambiar la contraseña'})
                                }
                                else{
                                    return res.status(200).send({"message": "Contraseña modificada con éxito", "_id": updated._id})
                                }
                            })
                        })
                    })
                }
            }
        })
    }
}