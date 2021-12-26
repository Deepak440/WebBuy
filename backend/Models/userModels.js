import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const {Schema } = mongoose;

const userSchema = Schema({
    name :{
        type : String,
        required :true 
    },
    email :{
        type : String,
        required :true,
        unique : true 
    },
    password :{
        type : String,
        required :true 
    },
    isAdmin :{
        type : Boolean,
        required :true,
        default : false 
    },
}, {
    timestamps : true
});

// Method to compare the password entered during login when  email match found
// Cannot use arrow function 
userSchema.methods.matchPassword = async function(enteredPassword) {
return await bcrypt.compare(enteredPassword , this.password);

}

userSchema.pre('save' , async function (next){

    // If password is not modified
    if(! this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
})

const  User  = mongoose.model('User' , userSchema);

export default User;