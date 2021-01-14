import mongoose from 'mongoose';

var appSchema = new mongoose.Schema({
    code: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    url: {type: String, required: false}
})

var appModel = new mongoose.model('app', appSchema);

export default appModel;