import mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    //appId: {type: mongoose.Types.ObjectId, required: true, ref: 'app'},
    //roleId: {type: mongoose.Types.ObjectId, required: true, ref: 'role'},
    permissions: [{
        app: {type: mongoose.Types.ObjectId, required: true, ref: 'app'},
        roles: [{
            role: {type: mongoose.Types.ObjectId, required: true, ref: 'role'}
        }]
    }]
})

var userModel = new mongoose.model('user', userSchema);

export default userModel;