
const  mongoose = require('mongoose');
const  uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let userSchema = new Schema({
    name :{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        unique:true,
        required: [true,'El correo es necesario']
    },
    password: {
        type: String,
        required: [true,'La contraseña es obligatoria']

    }
});

userSchema.methods.toJSON = function () {  

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    
    return userObject;
}

userSchema.plug in(uniqueValidator,{message:'{PATH} debe de ser unico'});

module.exports = mongoose.model('User',userSchema);