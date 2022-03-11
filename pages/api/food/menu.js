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
                console.log(req.query)
                const table=await Profile.findOne({email:req.query.email},'table email')
                res.status(200).json(table)
                break;
        case 'PUT':
                console.log(req.body)
                let payload={
                    id:req.body.selectedId,
                    price:req.body.price,
                }
                const itemRemoval=await Profile.findOneAndUpdate({email:req.body.useremail},{$pull:{"menuItems":payload}},{  safe: true, upsert: true})
                res.status(200).json({msg:"Item added successfully"})
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
