import mongoose from 'mongoose';
import config from 'config';

module.exports = {
    connect: () => {
        return mongoose.connect(config.get("MongoDBURI"), {useNewUrlParser: true})
    },    
    disconnect: (connection) => {
        mongoose.disconnect()
    }
}