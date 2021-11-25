const users = require('../models/users')
const controller = {}

controller.index = async (req, res, next) => {
    res.send("hello world")
}
controller.updateUser = async(req,res,next) =>{
    console.log(req.params._id)
    await users.updateOne({"_id":req.params},{$set:{"picture":`imgprofile`+ req.params._id +".jpeg"}})
    let data = await users.findOne({"_id":req.params._id})
    console.log(data)
    res.send({data: "ok"})
};

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
            const access = true
            const {name,rank,_id,picture} = data
            console.log(data)
            res.json({name,rank,access,_id,picture})
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