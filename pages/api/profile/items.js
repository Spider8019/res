import Profile from "../../../globalSetups/database/model/profile"
import connection from "../../../globalSetups/database/connection"
import  _ from "lodash"
import mongoose from "mongoose"
import {getSession} from "next-auth/react"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const items = await Profile.findOne({email:req.query.email},"menuItems")
                console.log(items)

                console.log(items)
                res.status(200).json(items)
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
