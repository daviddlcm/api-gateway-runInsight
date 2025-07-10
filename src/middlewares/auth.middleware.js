const axios = require("axios")

const authHost = process.env.USER_SERVICE_URL

const authMiddleware = async(req,res,next) =>{
    const token = req.headers["token"]

    //console.log("Token received:", token)

    if(!token){
        return res.status(401).json({
            error: "No token provided"
        })
    }

    try{
        //console.log("Validating token:", token)
        //console.log("Auth Host:", authHost)
        const response = await axios.get(`${authHost}/users/validate/token`,{
            headers: {token: token}
        })
        //console.log(response.data.user)


        if(response.data.user){
            req.headers["user-id"] = response.data.user.id
            req.headers["id-role"] = response.data.user.rolesId
            
            next()
        } else {
            res.status(401).json({
                error:"Invalid token"
            })
        }
    }catch(error){
        return res.status(401).json({
            error: "Token verification failed"
        })
    }
}
module.exports = authMiddleware