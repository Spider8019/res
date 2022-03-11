import Profile from "../../../globalSetups/database/model/profile"
import connection from "../../../globalSetups/database/connection"
import  _ from "lodash"
import bcrypt from "bcrypt"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                const profile=await Profile.findOne({email:req.query.email})
                console.log("adsfasdfasdfasfprofile",profile)
                if(profile)
                        res.status(200).json(profile)
                else
                        res.status(200).json({msg:"No profile EXIST"})

                break;
        case 'PUT':
                //for editing profile image
                const response=await Profile.updateOne({_id:req.body.id},{$inc : {'image' :req.body.step}})
                res.status(200).json({msg:"Image change Successfully",...response})
                break;
        default:
                res.status(400).json({ success: false })
                break
    }
}
  
export default handler
// import useSWR from 'swr'

// const fetcher = (url) => fetch(url).then((res) => res.text())

// export default function Index() {
//   const { data, error } = useSWR('/api/cookies', fetcher)

//   if (error) return <div>Failed to load</div>
//   if (!data) return <div>Loading...</div>

//   return <div>{`Cookie from response: "${data}"`}</div>
// }