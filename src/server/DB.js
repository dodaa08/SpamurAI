const mongose = require('mongoose');
const Schema = mongose.Schema;

const User = new Schema({
    email: {type : String, unique: true ,  required: true},
    password: String
}); 


const UserModel = mongose.model('User', User);

module.exports = UserModel;