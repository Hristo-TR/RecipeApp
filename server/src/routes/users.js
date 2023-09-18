import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../Models/Users.js'

const router = express.Router()

router.post("/register" , async (req, res) => {
   const {username, password} = req.body;
   
   const user = await UserModel.findOne({username: username})

   if (user) {
    return res.json({message: "User already exists!"})
   }

   const hashedPassword = await bcrypt.hash(password, 10)
   const newUser = new UserModel({username, password: hashedPassword})
   await newUser.save()
   res.json({message: "Registration successful!"});
});

router.post("/login", async (req, res)=>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});
    if (!user) {
        return res.status(400).json({message: "User doesn't exist!"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({message:"Username or Password invalid"})
    }
    const token = jwt.sign({id: user.id}, "secret");
    res.json({token, userID: user._id});
});

export { router as userRouter}
