
const otpService = require("../services/Otp-services")
const hashService = require("../services/hash-service");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");
const UserDto = require('../dtos/user-dto')
class AuthController{
   async sendOtp(req,res){

    const {phone} = req.body;
    const otp = await otpService.generateOtp();

    // for How much time otp is valid ttl(time to live)
    const ttl = 1000*60*60*60 // 5min
    const expires = Date.now()+ttl; //on which time it will expires
    const hashData = `${phone}.${otp}.${expires}`
    const hash = hashService.generateHash(hashData);

    try{
      // await otpService.senOtpBySms(phone,otp);
      return res.json({
        hash:`${hash}.${expires}`,
        phone,
        otp

      })
    }
    catch(err){
      console.log(err)
      res.status(400).send("In valid Otp!!")
    }
    res.status(200).json({hash:hash})
    
  }
  async verifyOtp(req,res){
    const {phone,otp,hash} = req.body;
    if(!otp || !hash || !phone){
      return res.status(400).json({
        message:"ALl field require"
      })
    }
    // Spilt  the hash to extract expire time
    const [hashOtp,expires]=hash.split('.');
    if(Date.now() > +expires){
      return  res.status(400).json({
        message:"Otp expire"
      })
    }
    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashOtp,data) ;
    if(!isValid){
      return  res.status(400).json({message:"Invalid Otp"})
    }
    let user ;
    // let accessToken;
    // let refreshToken;

    //Check user is Register or Not
     try{
      user = await userService.findUser({phone})  // key or value is same the we can write onces

      if(!user){
        // Creating user  
        user = await userService.createUser({phone});
      }
    }catch(err){
      console.log("error in Create user",err);
      res.status(500).json({
        message:"Db error"
      })
    }

    // JWT Token (json web token )
    const {accessToken,refreshToken}=  tokenService.generateToken({
      _id:user._id,
      activated:false
    });
    tokenService.storeRefreshToken(refreshToken,user._id);
    res.cookie('refreshtoken',refreshToken,{
      maxAge:1000*60*60*24*30,
      httpOnly:true,
    })

    res.cookie('accessToken',refreshToken,{
      maxAge:1000*60*60*24*30,
      httpOnly:true,
    })
    const userDto = new UserDto(user);

    res.status(200).json({
    user:userDto,
    auth:true
    })

   }

}

module.exports = new AuthController(); 