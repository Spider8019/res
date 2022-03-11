import mongoose from "mongoose"

const FoodSchema = new mongoose.Schema({
    title:{
        type:String,
    }, 
    category:{
        type:String
    },
    about:{type:String},
    ageRestriction:{
        type:Number,
        default:0
    },
    protein:{type:Number},
    carbohydrate:{type:Number},
    fat:{type:Number},
    vitamins:{type:String},
    minerals:{type:String}
})

module.exports =
    mongoose.models.Foods || mongoose.model('Foods', FoodSchema);

