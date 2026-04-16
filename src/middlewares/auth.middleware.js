const jwt=require('jsonwebtoken')

async function authArtist(req,res,next){
    const token=req.cookies.token

    if(!token){
        res.status(401).json({
            message:"UnAuthorized"
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    try{
        if(decoded.role!=='artist'){
            return res.status(403).json({
                message:"You dont have access"
            })
        }
        req.user=decoded
        next()
    }catch(err){
        console.log(err)
        return res.status(401).json({
            message:"UnAuthorized"
        })
    }
}

async function authUser(req,res,next){
    const token=req.cookies.token

    if(!token){
        return res.status(401).json({message:"unauthorized"})
    } 

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    try{
        if(decoded.role!='user'){
            res.status(403).json({
                message:"you dont have access"
            })
        }
        req.user=decoded
        next()
    }catch(err){
        console.log(err)
        return res.status(401).json({
            message:"unauthorized"
        })
    }
}

module.exports = { authArtist,authUser }