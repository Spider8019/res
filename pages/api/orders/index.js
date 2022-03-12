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
                const order50=await Orders.find({fromRestaurant:req.query.email}).limit(50).sort({timeOfOrder: -1})
                res.status(200).json(order50)
                break;
        case 'POST':
                const payload=new Orders({
                    ...req.body
                })
                const order=await payload.save()
                res.status(200).json(order)
                break;
        case 'PUT':
                const ustatus=await Orders.findOneAndUpdate({uuid:req.body.uuid},{status:req.body.newStatus})
                res.status(200).json(ustatus)
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