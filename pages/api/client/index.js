import Foods from "../../../globalSetups/database/model/foods"
import Profile from "../../../globalSetups/database/model/profile"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                console.log("a;dokjfa;lk")
                const det=await Profile.findOne({email:req.query.email},'menuItems').populate('menuItems.id')
                res.status(200).json({det})
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
