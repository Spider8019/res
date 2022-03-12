import React from 'react'
import {useRouter} from 'next/router';
import Head from "next/head"
import { tableStatus,getProfileDetails } from '../../../globalSetups/api';
import useSWR, { mutate } from "swr";
import Link from 'next/link';


const TableS = () => {


const router=useRouter()
const {tableNumber,id}=router.query
const {data:profile,error}=useSWR("GetBasicDetail",()=>getProfileDetails({email:id}))
const {data:tsd,error:tse}=useSWR("TableStatus",()=>tableStatus({tableNumber,id,uuid:router.query.uuid}))
if(error || tse)
    return <h1>Something went wrong</h1>
if(!profile || !tsd)
    return <p>loading</p>

  return (
    <div className="p-8"
     style={{height:"calc(100vh - 74px)"}}
    >
      <Head>
          <title>{profile.name} - Menu</title>
      </Head>
      
        <div className='my-8'>
            <p className='text-center text-5xl font-semibold dark:text-white'>{profile.name}</p>
            <p className='text-center dark:text-white'>{profile.address}</p>
        </div>
        <div className='grid place-items-center'>
            {
                tsd.msg
                ?
                <Link href="/tos">
                  <a>Nothing Found. Try Again</a>
                </Link>
                :
                <div className='w-full bg-gray-200 darkLgBg rounded p-4 mt-20'>
                <p className='flex justify-between'><span className="w-80 font-semibold my-2 inline-block">Order Id </span>{tsd.uuid}</p>
                <p className='flex justify-between'><span className="w-80 font-semibold my-2 inline-block">Table Number </span>{tsd.fromTable}</p>
                <p className='flex justify-between'><span className="w-80 font-semibold my-2 inline-block">Amount </span>{tsd.amountPayed/100}</p>
                <p className='flex justify-between'><span className="w-80 font-semibold my-2 inline-block">Time Of Order </span>{tsd.timeOfOrder}</p>
                <p className='flex justify-between'><span className="w-80 font-semibold my-2 inline-block">Status </span>{tsd.status}</p>
                <p className='flex justify-between'><span className="w-80 font-semibold my-2 inline-block">Extra </span>{tsd.more}</p>
                <div  className='flex justify-between'>
                        <p><span className="w-80 font-semibold my-2 inline-block">Order Summary </span></p>
                        <table className='w-full text-center'>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                            </tr>
                        {
                            tsd.orderSummary && tsd.orderSummary.map((item,key)=>{
                                return(
                                    <tr key={key}>
                                        <td>{item.title}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                )
                                })
                            }
                            </table>
                </div>
                </div>
            }
        </div>
    </div>
  )
}

export default TableS