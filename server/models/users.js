const mongoose = require('mongoose')
const {Schema} = mongoose
// const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    picture:{type:String,required:true},
    rank:{type:String,required:true},
},{timestamps:true})

// UserSchema.methods.encrypPassword = async password => {
//     const salt = await bcrypt.genSalt(10)
//     return await bcrypt.hash(password,salt);
// }
// UserSchema.methods.matchPassword = function(password){
//     return await bcrypt.compare(password, this.password)
// }

module.exports = mongoose.model('users',UserSchema)