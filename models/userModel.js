const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Name is required'],
    },
    email : {
        type : String,
        required : [true,'Email is required'],
        unique : true,
        validate : validator.isEmail,
    },
    password : {
        type : String,
        required : [true,'Password is required'],
    },
    phone : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    answer: {
        type: String,
        required: true,
      },
    role : {
        type : Number,
        default : 0,
    }
},{timestamps : true},
);

userSchema.methods.generateAuthTokens = async function(){
    try {
        const tokenGenerated = jwt.sign({user_id:this._id},process.env.SECRET_KEY);
        await this.save();
        return tokenGenerated;
    }catch (error) {
        console.log('Error',error);
    }
  }

userSchema.methods.comparePassword = async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword,this.password);
        return isMatch;
    }   
    catch(error){ 
        console.log('Error',error);
    }
}

userSchema.pre("save", async function (next) {
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User',userSchema);

module.exports = User;