import mongoose from 'mongoose';

var roleSchema = new mongoose.Schema({
    code: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    expirationDate: {type: Date, required: false},
    allowedActions: {type: String, required: false},
    appId: { type: mongoose.Schema.Types.ObjectId, ref: 'app' }
})

var roleModel = new mongoose.model('role', roleSchema)

export default roleModel;