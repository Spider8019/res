import Foods from "../../../globalSetups/database/model/foods"
import Profile from "../../../globalSetups/database/model/profile"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'PUT':
                console.log(req.body)
                const itemInsertion=await Profile.findOneAndUpdate({email:req.body.email},{$inc:{"table":req.body.by}},{  safe: true, upsert: true})
                res.status(200).json({msg:"Item added successfully"})
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
