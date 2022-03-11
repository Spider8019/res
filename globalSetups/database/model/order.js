import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    timeOfOrder:{
        type:Date,
        default:Date.now
    },
    orderSummary:[{
        quantity:Number,
        title:String,
    }],
    more:{
        type:String,
        default:"Nothing"
    },
    amountPayed:Number,
    status:{
        type:Number,
        default:0
    },
    fromTable:Number,
    fromRestaurant:String,
    paymentId:String,
    orderId:String,
    signature:String,
    uuid:String,
})

module.exports =
    mongoose.models.Order || mongoose.model('Order', OrderSchema);

