import React,{useState} from 'react'
import useSWR, { mutate } from "swr";
import { yourAllItemsClients,getProfileDetails,submitOrder,updateYourEarning } from '../../../globalSetups/api';
import {useRouter} from 'next/router';
import ClientMenuItem from '../../../components/dialogs/ClientMenuItem';
import Head from "next/head"
import {nanoid} from "nanoid"
import { notifyerror } from '../../../components/snackbar';
import Loading from '../../../components/global/Loading';

const Specific = () => {
 
  const router=useRouter()
  const {tableNumber,id}=router.query
  const {data:yourItems,error:yIError}=useSWR("FetchingYourItems",()=>yourAllItemsClients({email:id}))
  const {data:profile,error}=useSWR("GetBasicDetail",()=>getProfileDetails({email:id}))
  const [orderSummary,setOrderSummary]=useState([])
  const [total,setTotal]=useState(0)
  const [filter,setFilter]=useState({
    price:100000000000,
    ageRes:20,
    category:""
  })

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST",body:JSON.stringify({price:total,rk:profile.razorPayKey,rs:profile.razorPaySecret}) }).then((t) =>
      t.json()
    );
    var options = {
      key: profile.razorPayKey, // Enter the Key ID generated from the Dashboard
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
            const res=await updateYourEarning({email:id,amountPayed:data.amount})
            if(res.status===200){
              router.push(`/${tableNumber}/${id}/ts?uuid=${uuid}`)
            }
            else{
              notifyerror("Something went wrong")
            }
        }
        else{
            alert("Money is debited but order not placed contact admin")
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

  const filterFunction=async(e,id)=>{
    let payload={}
    let payloadNC={}
    console.log(e.target.value)
    switch(id){
      case 'price':payload={...filter,price:e.target.value};
                   payloadNC={...filter,price:100000000000000}
                   break;
      case 'ageRes':payload={...filter,ageRes:e.target.value};
                    payloadNC={...filter,ageRes:100000000000000}
                    break;
      case 'category':payload={...filter,category:e.target.value};
                    payloadNC={...filter,category:""}
                    break;

    }
    if(e.target.checked){
      setFilter(payload)
    }else{
      setFilter(payloadNC)
    }
    console.log(e.target.checked)
  }

  if(yIError || error)
     return <h1>Something went wrong</h1>
  if(!yourItems || !profile)
     return <Loading/>
  return (<div className=" h-screen">
      <Head>
          <title>{profile.name} - Menu</title>
      </Head>
      <div className='grid min-h-screen'
        style={{gridTemplateColumns:"250px 1fr"}}
      >
          <div className='bg-gray-200 dark:bg-black text-xs text-black dark:text-slate-400'>
            <div className="m-4 border-b border-slate-400">
              <p className='text-xs'>Price Range</p>
              <div className='my-4'>
                <div className='my-1 flex items-center'>
                  <input type="radio" 
                    name="priceFilter" 
                    onChange={e=>filterFunction(e,"price")}
                    id="under100" value={100}/>
                  <label className='ml-2' htmlFor="under100"> Under 100</label>
                </div>
                <div className='my-1 flex items-center'>
                  <input type="radio" 
                    name="priceFilter" 
                    onChange={e=>filterFunction(e,"price")}
                    id="under250" value={250}/>
                  <label className='ml-2' htmlFor="under250"> Under 250</label>
                </div>
                <div className='my-1 flex items-center'>
                  <input type="radio" 
                    name="priceFilter" 
                    onChange={e=>filterFunction(e,"price")}
                    id="under500" value={500}/>
                  <label className='ml-2' htmlFor="under500"> Under 500</label>
                </div>
                <div className='my-1 flex items-center'>
                  <input type="radio" 
                    name="priceFilter" 
                    onChange={e=>filterFunction(e,"price")}
                    id="norange" value={100000000}/>
                  <label className='ml-2' htmlFor="norange"> Price doesn&apos;t matter</label>
                </div>
              </div>
            </div>
            <div className="m-4 border-b border-slate-400">
              <p className='text-xs'>Age Restriction</p>
              <div className='my-4'>
                <div className='my-1 flex items-center'>
                  <input type="radio" 
                    name="ageRestrictionFilter" 
                    onChange={e=>filterFunction(e,"ageRes")}
                    id="age1" value={2}/>
                  <label className='ml-2' htmlFor="age1">For Babies (2-)</label>
                </div>
                <div className='my-1 flex items-center'>
                  <input type="radio" 
                    name="ageRestrictionFilter" 
                    onChange={e=>filterFunction(e,"ageRes")}
                    id="age18" value={18}/>
                  <label className='ml-2' htmlFor="age18">Not Containing Alcohol (18-)</label>
                </div>
                <div className='my-1 flex items-center'>
                  <input type="radio" 
                    name="ageRestrictionFilter" 
                    onChange={e=>filterFunction(e,"ageRes")}
                    id="age100" value={10000}/>
                  <label className='ml-2' htmlFor="age100">Remove this filter</label>
                </div>
              </div>
            </div>
            <div className="m-4 border-b border-slate-400">
              <p className='text-xs'>Cateorgy</p>
              <div className='my-4'>
                <div className='my-1 flex items-center'>
                  <input type="radio" 
                    name="categoryFilter" 
                    onChange={e=>filterFunction(e,"category")}
                    id="starter" value={"Starter"}/>
                  <label className='ml-2' htmlFor="starter">Starters</label>
                </div>
                <div className='my-1 flex items-center'>
                  <input type="radio" 
                    name="categoryFilter" 
                    onChange={e=>filterFunction(e,"category")}
                    id="mcourse" value={"Main Course"}/>
                  <label className='ml-2' htmlFor="mcourse">Main Course</label>
                </div>
                <div className='my-1 flex items-center'>
                  <input type="radio" 
                    name="categoryFilter" 
                    onChange={e=>filterFunction(e,"category")}
                    id="categoryRemFilter" value={""}/>
                  <label className='ml-2' htmlFor="categoryRemFilter">Remove this filter</label>
                </div>
              </div>
            </div>
          </div>
          <div className='p-8'>
            <div className='my-8'>
                <p className='text-center text-5xl font-semibold dark:text-white'>{profile.name}</p>
                <p className='text-center dark:text-white'>{profile.address}</p>
            </div>
                <div className="grid grid-cols-1 my-20">
                <ClientMenuItem/>
                {
                    yourItems.det &&  yourItems.det.menuItems.filter(x=>x.price<=filter.price)
                                .filter(x=>parseInt(x.id.ageRestriction)<filter.ageRes)
                                .filter(x=>x.id.category.includes(filter.category))
                                .map((item,key)=>{
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
      </div>
      

    </div>
  )
}

export default Specific