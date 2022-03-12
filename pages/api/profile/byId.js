import Profile from "../../../globalSetups/database/model/profile"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const profile=await Profile.findOne({_id:req.query.id})
                res.status(200).json(profile)
                break;
        case 'PUT':
                const uAmount=await Profile.findOneAndUpdate({email:req.body.email},{$inc:{profit:req.body.amountPayed}})
                res.status(200).json({msg:"Update your profile successfully"})
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
