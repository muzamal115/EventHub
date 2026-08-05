import jwt from 'jsonwebtoken'
console.log(process.env.JWT_SECRET)
 const generateToken=(id,role)=>{
return jwt.sign(
    {
        id,
        role
    },process.env.JWT_SECRET,{
        expiresIn:'7d'
    }
)
}

export default generateToken