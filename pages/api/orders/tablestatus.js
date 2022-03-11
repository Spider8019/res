import Orders from "../../../globalSetups/database/model/order"
import connection from "../../../globalSetups/database/connection"
import  _ from "lodash"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGOOSE_MONGODB_URI)
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))

async function handler(req, res) {
    switch(req.method){
        case 'GET':
                console.log("sda;kfja;sdlk")
                console.log(req.query)
                const order=await Orders.findOne({uuid:req.query.uuid})
                console.log(order)
                if(order)
                    res.status(200).json(order)
                else
                    res.status(200).json({msg:"Nothing found"})
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