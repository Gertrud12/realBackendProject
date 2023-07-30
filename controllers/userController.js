import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'

const register = async(req, res) => {
  try {
    const {firstName, lastName, userName, email, password} = req.body
    const userExist = await User.findOne({email: email})
    if (userExist) {
      res.status(400).json({message: "user already Exist"})
    } else {
      const newUser = await new User({
        firstName,
        lastName,
        userName,
        email,
        password: bcrypt.hashSync(password, 10)
      })
      const saveUser = await newUser.save()
      if (saveUser) {
        res.json({message: 'Registration successful', saveUser})
      } else {
        res.status(400).json({message: "Registration failed..."})
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}

const login = async(req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email: email})
    if(user){
      const isMatch = bcrypt.compareSync(password, user.password)
      // console.log('test to check is match: ',isMatch)
      if (isMatch) {
        const token = generateToken(user._id)
        res.json({message: "Login successful", token, user})
      } else {
        res.status(400).json({message: "invalid credentials"})
      }
    }else{
      res.status(400).json({message: "user not found"})
    }
  } catch (err) {
    throw new Error(err)
  }
}


export {register, login}