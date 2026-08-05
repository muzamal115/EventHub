
const adminMiddlware=async(req,res,next)=>{

    try {
        if(!req.user){
    return res.status(401).json({
        error:"Unauthorized. Please login first."
    })
}

if(req.user.role!=="admin"){
    return res.status(403).json({
        error:"Access denied. Admin only."
    })
}
next();
    } catch (error) {
        return res.status(500).json({
            error:"Internal server error"
        })
    }

}
export default adminMiddlware;