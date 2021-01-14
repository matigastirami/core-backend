import RoleModel from '../models/Role.model'

export default class RoleController {
    static async listRoles(req,res){
        console.log("QUERY: ", req.query)
        try {
            let rolesList = await RoleModel
                .find({...req.query})
                .exec()
            if(rolesList.length == 0){
                return res.status(404).send({'message': 'No se encontraron registros'})
            }
            else{

            }
            return res.status(200).send(rolesList)
        } catch(ex){   
            console.log(ex)
            return res.status(500).send({'message': 'Error de servidor'})
        }
        
    }

    /**
     * @author Matías Ramirez
     * @description Obtener toda la info de un rol enviado su ID (PASAR TODAS LAS FUNCIONES DEL SISTEMA A SINTAXIS ASYNC/AWAIT)
     * @param {*} req.query._id id del rol
     */

    static async getRoleInfo(req,res){
        
        var roleID = req.query._id;
        
        if(!roleID || roleID == ''){
            return res.status(400).send({'message': 'Debe enviar el id a buscar'})
        }

        try{
            let role = await RoleModel
                .findOne({_id: roleID})
                .populate('appId')
                .exec()

            if(!role){
                return res.status(404).send({ "err": true, "message": "No encontrado" })
            }

            return res.status(200).send(role)
        }
        catch(ex){
            return res.status(500).send({ "err": true, "message": ex.message })
        }
    }

    static createRole(req,res){
        let role = new RoleModel();
        role.code = req.body.code;
        role.description = req.body.description;
        role.expirationDate = req.body.expirationDate
        role.appId = req.body.appId

        role.save((err, doc) => {
            if(err){
                console.log(err)
                res.status(500).send({'message': 'Error de servidor', 'err_code': err.code || null, 'err_desc': err.errmsg || null})
            }
            else{
                res.status(200).send({'created': doc, 'message': 'Rol creado con éxito'})
            }
        })
    }

    static updateRole(req,res){
        var roleID = req.query._id;
        
        if(!roleID || roleID == ''){
            return res.status(400).send({'message': 'Debe enviar el id a modificar'})
        }

        RoleModel.findByIdAndUpdate(roleID, req.body, (err, updated) => {
            if(err){
                console.log(err)
                res.status(500).send({'message': 'Error de servidor', 'err_code': err.code || null, 'err_desc': err.errmsg || null})
            }
            else{
                res.status(200).send({'updated': updated._id, 'message': 'Rol modificado con éxito'})
            }
        })
    }

    static deleteRole(req,res){

        var _id = req.query._id;

        if(!_id){
            return res.status(400).send({'message': 'Debe enviar el _id del registro'})    
        }

        RoleModel.findByIdAndRemove(_id, (err, deleted) => {
            if(err){
                console.log(err)
                res.status(500).send({'message': 'Error de servidor'})
            }
            else{
                if(!deleted){
                    res.status(404).send({'message': 'Registro no encontrado'})
                }
                else{
                    res.status(200).send({
                        'message': 'Eliminado satisfactoriamente',
                        '_id': deleted._id
                    })
                }
            }
        })
    }
}