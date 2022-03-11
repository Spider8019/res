import mongoose from "mongoose"
import Foods from "./foods"
import bcrypt from "bcrypt"

const ProfileSchema = new mongoose.Schema({
    name:{
          type:String,
          required:[true, 'Name required'],
        },
    address:{
          type:String,
    },
    isVerified:{
          type:Boolean,
          default:false
    },
    email:{
          type:String,
          required:[true, 'Email required'],
          unique:[true,'Not Unique'],
          lowercase:true,
          validate: {
            validator: function(v) {
                const reg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
                return reg.test(v)
            },
            message: props => `${props.value} is not a valid email!`
          },
    },
    password:{
             type:String,
             required:[true,'Password Required']
            },
    image:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },
    aHolder:{
        type:String,
        required:true,
    },
    aNumber:{
        type:String,
        required:true,
    },
    aIFSC:{
        type:String,
        required:true,
    },
    menuItems:[{
        price:{type:Number},
        id:{type:mongoose.Schema.Types.ObjectId,
            ref:Foods,
        }
    }],
    table:{
        type:Number,
        default:1,
    }
})

ProfileSchema.pre("save",async function(next) {
    if (this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 10)
    }
    next();
});

module.exports =
    mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

