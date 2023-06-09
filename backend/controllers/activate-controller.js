const jimp = require('jimp');
const userService = require('../services/user-service');
const UserDto  = require("../dtos/user-dto")
const path = require('path');
class ActivateController{

    async activate(req,res){

       const {name , avatar } =req.body;

       if(!name || !avatar){
        res.status(400).json({message:'All field required'})
       }
      try{
        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
              )}.jpg`;
            const buffer = Buffer.from(avatar.replace(/^data:image\/jpeg;base64,/,''),'base64');
    
      }catch(err){
        res.status(500).json({
            success:false,
            message:"Error while processing Image"
        })
      }

        try{
            const jimRes = await jimp.read(buffer)
            jimRes.resize(150,jimp.AUTO).write(path.resolve(__dirname,`../storage/${imagePath}`))
        }catch(err){
            console.log(err)
            res.status(500).json({ message: 'Could not process the image' });


        }
        const userId = req.user._id
        try {
            const user = await userService.findUser({ _id: userId });
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
            }
            user.activated = true;
            user.name = name;
            user.avatar = `/storage/${imagePath}`;
            user.save();
            res.json({ user: new UserDto(user), auth: true });
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Something went wrong!' });
        }
      
    }

}
module.exports = new ActivateController();