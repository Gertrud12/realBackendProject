import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    firstName: {type: String, required: true}, 
    lastName: {type: String, required: true},
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    dob: {type: Date},
    age: {type: String},
    mobile: {type: String},  
    image: {type: String},
    address: {type: String},
    status: {type: String, default: 'active'},
    lastLogin: {type: Date, default: new Date()}
  },
  {
    timestamps: true,
  }
);



const User = mongoose.model('User', userSchema)

export default User