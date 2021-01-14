import AppModel from '../models/App.model'

export default class AppController {
    
    static async listApps(req,res){
        try {
            let response = await AppModel.find({...req.query}).exec();
            res.status(200).send(response)
        } catch (error) {
            
        }
    }

    static getAppInfo(req,res){
        var appID = req.query._id;
        
        if(!appID || appID == ''){
            return res.status(400).send({'message': 'Debe enviar el id a buscar'})
        }

        AppModel.findOne({_id: appID}, (err, app) => {
            if(err){
                return res.status(500).send({'message': 'No se pudo procesar la solicitud'})
            }
            else{
                if(!app)
                    return res.status(404).send({'message': 'App no encontrada'})
                else
                    return res.status(200).send(app)
            }
        })
    }

    static createApp(req,res){
        let app = new AppModel();
        app.code = req.body.code;
        app.description = req.body.description;
        app.url = req.body.url

        app.save((err, doc) => {
            if(err){
                console.log(err)
                res.status(500).send({'message': 'Error de servidor', 'err_code': err.code || null, 'err_desc': err.errmsg || null})
            }
            else{
                res.status(200).send({'created': doc, 'message': 'App creada con éxito'})
            }
        })
    }

    static updateApp(req,res){
        var appID = req.query._id;
        
        if(!appID || appID == ''){
            return res.status(400).send({'message': 'Debe enviar el id a modificar'})
        }

        AppModel.findByIdAndUpdate(appID, req.body, (err, updated) => {
            if(err){
                console.log(err)
                res.status(500).send({'message': 'Error de servidor', 'err_code': err.code || null, 'err_desc': err.errmsg || null})
            }
            else{
                res.status(200).send({'updated': updated._id, 'message': 'App modificada con éxito'})
            }
        })
    }

    static deleteApp(req,res){
        var _id = req.query._id;

        if(!_id){
            return res.status(400).send({'message': 'Debe enviar el _id del registro'})    
        }

        AppModel.findByIdAndRemove(_id, (err, deleted) => {
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