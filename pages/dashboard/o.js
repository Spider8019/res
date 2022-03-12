import DashboardLayout from "../../components/layout/dashboardLayout"
import React, { useEffect, useRef, useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import _ from "lodash"
import { Avatar, IconButton } from '@mui/material';
import {motion} from "framer-motion"
import useSWR, { mutate } from "swr";
import { addItemToMenu, fetch50Orders,orderStatusChange,removeItemFromMenu} from '../../globalSetups/api';
import Head from "next/head"
import {notifyerror,notifysuccess,notifywarn} from "../../components/snackbar"


const Orders = ({user}) => {

  const {data:orders,error:oe}=useSWR("FetchingLatest50Orders",()=>fetch50Orders({email:user.email}),{refreshInterval:60000})

  const changeStatus=async(e,currentValue,uuid)=>{
     if(e.target.value!==currentValue){
          const response=await orderStatusChange({uuid,newStatus:e.target.value})
          if(response.status===200){
            mutate("FetchingLatest50Orders")
            notifysuccess("Status change successfully for "+uuid)
          }
          else{
            notifyerror("Somehting went wrong")
          }
     }
  }
  if(oe) return <p>error</p>
  if(!orders) return <p>loading</p>
  return (
    <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1,transition:{duration:1}}}
      exit={{opacity:0}}
    className="p-4">
      <Head>
        <title>Orders - Bhukku.</title>
      </Head>

      <p className="text-4xl font-semibold mb-12">Orders</p>
      {
        orders.length!==0
        &&
          <div className="my-2 grid grid-cols-6 items-start rounded p-2">
              <p>From Table</p>
              <p>Order Id</p>
              <p>Order Summary</p>
              <p>Extra</p>
              <p>Amount Payed (₹)</p>
              <p>Status</p>
          </div>
      }
      <div>
        {
          orders.length===0?
          <p className="text-center text-2xl ">Nothing to show</p>
          :
          orders.map((item,key)=>{
            return (
              <div key={key} className={`my-2 text-white grid grid-cols-6 items-start rounded ${item.status!==2?"bgLG":"bg-black"} p-2`}>
                <p>{item.fromTable}</p>
                <p>{item.uuid}</p>
                <div>
                {item.orderSummary.map((x,index)=>{
                  return(
                    <div className="flex justify-between mr-4" key={index}>
                        <p>{x.title}</p>
                        <p>{x.quantity}</p>
                    </div>
                  )
                })}
                </div>
                <p>{item.more}</p>
                <p>{item.amountPayed/100}</p>
                <select className="rounded text-black dark:text-white" onChange={(e)=>changeStatus(e,item.status,item.uuid)}>
                  <option value={0} selected={item.status===0}>Considered</option>
                  <option value={1} selected={item.status===1}>In Kitchen</option>
                  <option value={2} selected={item.status===2}>Served</option>
                </select>
              </div>
            )
          })
        }
      </div>
    </motion.div>
  )
}

Orders.Layout = DashboardLayout

export default Orders


export async function getServerSideProps(context) {

  const session = await getSession(context)
  if (_.isNull(session)) {
    return {
      redirect: {
        destination: `${defaultOptions.baseUrl}/auth/signin?callbackUrl=${defaultOptions.baseUrl}/dashboard/tabulate`,
        permanent: false
      }
    }
  }

  return {
    props: {
      user: session.user
    }
  }
}
