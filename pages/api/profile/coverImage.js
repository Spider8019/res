import Profile from "../../../globalSetups/database/model/profile"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'PUT':
                // for editing name and about of profile
                const det=await Profile.updateOne({email:req.body.email},{coverImage:req.body.coverImage})
                console.log(det)
                res.status(200).json({msg:"Update your cover Image successfully"})
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
