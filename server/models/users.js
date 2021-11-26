const mongoose = require('mongoose')
const {Schema} = mongoose
// const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    picture:{type:String,default:null},
    rank:{type:String,default:null},
},{timestamps:true})

// UserSchema.methods.encrypPassword = async password => {
//     const salt = await bcrypt.genSalt(10)
//     return await bcrypt.hash(password,salt);
// }
// UserSchema.methods.matchPassword = function(password){
//     return await bcrypt.compare(password, this.password)
// }

module.exports = mongoose.model('users',UserSchema)