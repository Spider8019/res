import mongoose from "mongoose"
import Profile from "../../../globalSetups/database/model/profile"


mongoose.connect(process.env.MONGOOSE_MONGODB_URI,{
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(()=>console.log("Connection Successfully Eastblished"))
.catch(err=>console.log(err))


export default async function profile(req,res){
  switch (req.method) {
    case 'POST':
          const payload=new Profile({
               name:"Restraunt 1",
               address:"Address 1",
               isVerified:true,
               email:"spider8019official@gmail.com",
               password:"pibuses4",
               image:"http://localhost:3000/_next/image?url=https%3A%2F%2Fikshvaku-s3.s3.ap-south-1.amazonaws.com%2Fstatic%2F1a3ea756b8ec93542184c8bb4631205e.jpg&w=2048&q=75",
               razorPayKey:"",
               razorPaySecret:""
           })
           await payload.save()
           res.status(200).json({msg:"User created successfully"})
           break;
    default:
      res.status(400).json({ success: false })
      break
  }
}