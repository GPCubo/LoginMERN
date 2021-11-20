const users = require('../models/users')
const controller = {}

controller.index = async (req, res, next) => {

    const data = await users.find((err,users)=>{console.log(users)})

    res.send(data)
}
// controller.updateUser = (req,res,next) =>{
//     conn.query('UPDATE users SET ? WHERE id= ?',[req.body,req.params.userId],(err,rows)=>{
//         if(err)next(new Error(err))
//         res.redirect("/")
//     })
// };

// controller.deleteUser = (req,res,next) =>{
//     conn.query('DELETE FROM users WHERE id= ?',[req.params.userId],(err,rows)=>{
//         if(err)next(new Error(err))
//         res.send({ok:true})
//     })
// };
controller.addPublic = async (req,res,next) =>{
    try {
        const nameReq = req.body.name == "" ? true:false
        const data = await users.findOne({"email": req.body.email,"password": req.body.password})

        if (nameReq == true && data != null) {
            const {name,rank} = data
            res.json({name,rank})
        }else{
            res.send({desarrollo:"Not available now.Try later"})
        }
    } catch (error) {
        console.log(error)
    }
    }
// };
// controller.addUser = (req,res,next) =>{
//     conn.query('INSERT INTO users SET ?',[req.body],(err,rows)=>{
//     if(err)next(new Error(err))
//     res.redirect("/")
//     })

// };


module.exports = controller