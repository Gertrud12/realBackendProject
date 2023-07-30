import Admin from "../models/adminModel.js"
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js' 
import sendMail from "../utils/sendMail.js"
import { generateOtp } from "../utils/generateRandomStrings.js"

// const createAdmin = async (req, res) => {
//     try {
//         const {name, email, password, otp} = req.body;
//         const newAdmin = await new Admin({
//             name,
//             email,
//             password: bcrypt.hashSync(password, 12),
//             otp
//         })
//         const admin = await newAdmin.save()
//         admin ? res.json({message: 'success', admin}) : res.json("unable to create admin")

//     } catch (error) {
//         throw new Error(error)
//     }
// }

const createAdmin = async(req, res) =>{
    try{
        const {name, email, password} = req.body
        const adminExist = await Admin.findOne({email: email})
        if(adminExist){
            res.status(400).json({message: 'admin exist'})
        }else{
            const newAdmin = await new Admin({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
            })
            const saveAdmin = await newAdmin.save();
            if(saveAdmin){
                res.json({message: ' registration successful', saveAdmin})
            }else{
                res.status(400).json({message:"registration failed"})
            }
        }
    }catch(err){
        throw new Error(err)
    }
}


const login = async(req, res) => {
    try {
      const {email, password} = req.body
      const admin = await Admin.findOne({email: email})
      if(admin){
        const isMatch = bcrypt.compareSync(password, admin.password)
        if (isMatch) {
          const token = generateToken(admin._id)
          res.json({message: "Login successful", token, admin})
        } else {
          res.status(400).json({message: "invalid credentials"})
        }
      }else{
        res.status(400).json({message: "Admin not found"})
      }
    } catch (err) {
      throw new Error(err)
    }
  }
  


const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.json({ message: "invalid email" });
        }

        const otpVal = await generateOtp();
        const otpUpdate = await Admin.findByIdAndUpdate(admin._id, { otp: otpVal }, { new: true, useFindAndModify: false });

        if (otpUpdate) {
            await sendMail(admin.email, 'Password Reset - OTP', otpVal);
            res.json({ message: 'OTP sent successfully' });
        } else {
            res.json({ message: 'Unable to send OTP! Try again later.' });
        }    
    } catch (error) {
        throw new Error(error);
    }
}


const updatePassword = async (req, res) => {
    try {
        const { otp, password } = req.body;

        if (!otp) {
            return res.json({ message: 'OTP is required' });
        }

        const admin = await Admin.findOne({otp});

        if (!admin) {
            return res.json({ message: 'Invalid OTP' });
        }

        // if (admin.otp !== otp) {
        //     return res.json({message: 'invalid otp'})
        // }

        const newPassword = await Admin.findByIdAndUpdate(admin._id, {
            password: bcrypt.hashSync(password, 12),
            otp: ''
        }, { new: true, useFindAndModify: false})
        newPassword ? res.json({message:'success', admin}) : res.json({message: 'Unable to update password'});
    } catch (error) {
        throw new Error(error)
    }
}


const signOut = async (req, res) => {
    try {
        const loggedOut = req.headers.authorization = null;
        loggedOut ? res.json({message: 'success'}) : res.json({message: "Unable to log you out"});
    } catch (error) {
        throw new Error(error)
    }
}


export {createAdmin, login, sendOtp, updatePassword, signOut}