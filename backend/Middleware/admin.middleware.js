
const adminOnly = async (req , res , next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({message:"Only Admin can access"})
    }
    next()
}
module.exports = adminOnly