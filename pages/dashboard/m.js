import React, { useEffect, useRef, useState } from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import { Chart } from "react-google-charts"
import styles from "../../styles/pages/Dashboard.module.css"
import { useSession, getSession } from 'next-auth/react';
import _ from "lodash"
import { Avatar, IconButton } from '@mui/material';
import {motion} from "framer-motion"
import useSWR, { mutate } from "swr";
import { addItemToMenu, availableItems,yourAllItems,removeItemFromMenu} from '../../globalSetups/api';
import Head from "next/head"
import CancelIcon from '@mui/icons-material/Cancel';
import {notifyerror,notifysuccess,notifywarn} from "../../components/snackbar"

const Tabulate = ({ user }) => {

  const [dialogShow,setDialogShow]=useState(false)
  const [inputPrice,setInputPrice]=useState("")
  const [selectedId,setSelectedId]=useState("")
  const [placeholder,setPlaceholder]=useState("")

  const {data,error}=useSWR("FetchingAllFoods",availableItems,{revalidateOnFocus:true})
  const {data:yourItems,error:yIError}=useSWR("FetchingYourItems",()=>yourAllItems({email:user.email}))
  if (error || yIError)
    return <h1>Error for {user.id}</h1>
  if (!data || !yourItems) {
    return <p>loading</p>
  }

  const addToMenu=async(e)=>{
    e.preventDefault()
    if(!selectedId){
      notifyerror("Something went wrong. Try after reload")
      return null
    }
    if(inputPrice===0){
      notifywarn("Enter price greater than zero")
      return null
    }
    const response=await addItemToMenu({useremail:user.email,selectedId,inputPrice})
    if(response.status===200){
      mutate('FetchingYourItems')
      setDialogShow(!dialogShow)
      notifysuccess("Successfully added to your menu")
    }
  }
  const showAddToMenuDialog=async(id,title)=>{
    setPlaceholder(title)
    setDialogShow(!dialogShow)
    setSelectedId(id)
  }
  const removeFromMenu = async(id,price)=>{
    if(!id)
    {
      notifywarn("something went wrong")
      return null;
    }
    const response=await removeItemFromMenu({useremail:user.email,selectedId:id,price})
    if(response.status===200){
      mutate('FetchingYourItems')
    }
  }

  return (
    <div className='grid' style={{ height: "calc(100vh - 2rem)", gridTemplateRows: "auto 1fr auto" }}>
      <Head>
        <title>Menus - Bhukku.</title>
      </Head>
      <div className="flex justify-between p-4 h-20">
        <p className='text-4xl font-semibold'>Available Items</p>
        {
          dialogShow
          &&
          <form onSubmit={addToMenu}>
            <input type="number" 
              autoFocus
              value={inputPrice}
              onChange={e=>setInputPrice(e.target.value)}
              className='standardInput border border-white'
              placeholder={`Price For your ${placeholder}`}
            />
            <button 
              type="submit"
              className="basicDarkButton text-white dark:text-black">Add</button>
          </form>
        }
      </div>
      <div className="my-4">
        <div className="grid items-center mx-2"
          style={{gridTemplateColumns:"40px 1fr"}}
        >
        <IconButton className="opacity-0 cursor-default"><CancelIcon/></IconButton>
          <div className=" grow p-2 rounded grid grid-cols-5">
                    <span>Title</span>
                    <span>About</span>
                    <span>Age Restriction</span>
                    <span>Category</span>
                    <div className="grid grid-cols-5">
                      <span className="mx-2">P</span>
                      <span className="mx-2">C</span>
                      <span className="mx-2">F</span>
                      <span className="mx-2">V</span>
                      <span className="mx-2">M</span>
                    </div>
          </div>
        </div>
        {
          data.det.map((item,key)=>{
            return(
            <div key={key} className="grid m-2"
              style={{gridTemplateColumns:"40px 1fr"}}
            >
              {
                yourItems.menuItems.filter(x => x.id===item._id).length>0
                ?
                <motion.button whileTap={{scale:0.9}} onClick={()=>removeFromMenu(item._id,yourItems.menuItems.filter(x=>x.id===item._id)[0].price)} className="bg-black text-white dark:bg-white dark:text-black rounded mr-2 h-full">{yourItems.menuItems.filter(x=>x.id===item._id)[0].price}</motion.button>
                :
                <motion.button whileTap={{scale:0.9}} onClick={()=>showAddToMenuDialog(item._id,item.title)} className="bg-transparent text-white border-2 border-white rounded mr-2 h-full">+</motion.button>
              }
              <div className="grow dark:bg-black p-2 rounded grid grid-cols-5"
                style={{background:yourItems.menuItems.filter(x => x.id===item._id).length>0?"linear-gradient(45deg,#ff008c, #1900ff)":"black"}}
                >
                  <span>{item.title}</span> 
                  <span>{item.about.slice(0,25)}</span>
                  <span>{item.ageRestriction}</span>
                  <span>{item.category}</span>
                  <div className="grid grid-cols-5">
                    <span className="mx-2">{item.protein}</span>
                    <span className="mx-2">{item.carbohydrate}</span>
                    <span className="mx-2">{item.fat}</span>
                    <span className="mx-2">{item.vitamins}</span>
                    <span className="mx-2">{item.minerals}</span>
                  </div>
              </div>
            </div>
            )
          })
        }
      </div>

    </div>

  )

};

Tabulate.Layout = DashboardLayout

export default Tabulate;

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

