import React,{useState} from 'react'
import useSWR, { mutate } from "swr";
import { yourAllItemsClients,getProfileDetails,submitOrder } from '../../../globalSetups/api';
import {useRouter} from 'next/router';
import ClientMenuItem from '../../../components/dialogs/ClientMenuItem';
import Head from "next/head"
import {nanoid} from "nanoid"

const Specific = () => {
 
  const router=useRouter()
  const {tableNumber,id}=router.query
  const {data:yourItems,error:yIError}=useSWR("FetchingYourItems",()=>yourAllItemsClients({email:id}))
  const {data:profile,error}=useSWR("GetBasicDetail",()=>getProfileDetails({email:id}))
  const [orderSummary,setOrderSummary]=useState([])
  const [total,setTotal]=useState(0)

  const makePayment = async () => {
    console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST",body:JSON.stringify({price:total}) }).then((t) =>
      t.json()
    );
    console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Bhukku. Ayodhya",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Just one step away from your meal.",
      theme: {
        color: "#000"
      },
    //   image: "../public/static/withOutBgLogo.png",
      handler: async function (response) {
        console.log(orderSummary)
        const uuid=nanoid(5)
        const x=await submitOrder({orderSummary,
                    more:"GIVE SOME WATER",
                    amountPayed:data.amount,
                    fromTable:tableNumber,
                    fromRestaurant:id,
                    paymentId:response.razorpay_payment_id,
                    orderId:response.razorpay_order_id,
                    signature:response.razorpay_signature,
                    uuid:uuid})
        if(x.status===200){
            router.push(`/${tableNumber}/${id}/ts?uuid=${uuid}`)
        }
        else{
            alert("Money is debited but order not placed contact admin")
            console.log(x,"order added successfylly")
        }
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  if(yIError || error)
     return <h1>Something went wrong</h1>
  if(!yourItems || !profile)
     return <p>loading</p>
  return (<div className="p-8 h-screen">
      <Head>
          <title>{profile.name} - Menu</title>
      </Head>
        <div className='my-8'>
            <p className='text-center text-5xl font-semibold dark:text-white'>{profile.name}</p>
            <p className='text-center dark:text-white'>{profile.address}</p>
        </div>
            <div className="grid grid-cols-1 my-20">
            <ClientMenuItem/>
            {
                yourItems.det &&  yourItems.det.menuItems.map((item,key)=>{
                    return(
                        <ClientMenuItem
                        total={total}
                        setTotal={setTotal}
                        orderSummary={orderSummary}
                        setOrderSummary={setOrderSummary}
                        key={key} 
                        price={item.price} 
                        {...item.id}/>
                        )
                    })
                }
            </div>
            {/* key id rzp_test_AxgPCBtSpLQmwJ
            key secret YeHmWuTrHHEkIu0lMrAKQKJD */}
            <div className='flex justify-between items-end'>
                <p className='text-xl text-gray-400 font-semibold'>Your Total <br/><span className="text-4xl">₹{total}</span></p>
                <button className="basicDarkButton dark:bg-black"
                    onClick={makePayment}
                >Proceed</button>
            </div>
    </div>
  )
}

export default Specific