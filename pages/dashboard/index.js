import React,{useState,useRef,useLayoutEffect, useEffect} from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import styles from "../../styles/pages/Dashboard.module.css"
import galStyles from "../../styles/Gallery.module.css"
import { getProfileDetails,getPostsOfProfile,updateProfileImage,deletePost } from '../../globalSetups/api';
import { getSession,useSession } from 'next-auth/react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { IconButton,Avatar } from '@mui/material';
import Image from 'next/image';
import _ from "lodash"
import useSWR, { mutate } from 'swr';
import { defaultOptions } from '../../globalSetups/availableArrays';
import {motion, AnimatePresence} from "framer-motion"
import { notifyerror, notifysuccess, notifywarn } from '../../components/snackbar';
import { deleteObject,uploadObject } from '../../globalSetups/aws/s3';
import { nanoid } from 'nanoid';
import Head from 'next/head';
import { editProfileCoverImage } from '../../globalSetups/api';

const Dashboard = ({user,msg}) => {


  const [coverImage,setCoverImage]=useState(null)
  const [fileCoverImage,setFileCoverPreview]=useState("")
  const [coverProcessing,setCoverProcessing]=useState(false)
  const {data:profile,error}=useSWR("GetBasicDetail",()=>getProfileDetails({email:user && user.email}))

  useEffect(()=>{
        if(msg==="0"){
            notifywarn("You are not a developer")
        }
    },[])

  if(error){
      return <h1>some error </h1>
    }
  if(!profile){
      return (
        <p>loading</p>
        )
    }


  const handleFile=(e)=>{
    setFileCoverPreview(URL.createObjectURL(e.target.files[0]))
    setCoverImage(e.target.files[0])
  }

  const handleUploadCover = async()=>{
    setCoverProcessing(true)
    await deleteObject({url:profile.coverImage},async(dltErr,dltData)=>{
        if(_.isNull(dltErr)){
            await uploadObject({file:coverImage,filename:"spider8019"+nanoid(10)+"."+coverImage.name.substring(coverImage.name.lastIndexOf(".") + 1)},async(err,data)=>{
                if(_.isNull(err)){
                    const payload={
                      coverImage:data.Location,
                      email:profile.email
                    }
                    const response=await editProfileCoverImage(payload)
                    if(response.status===200){
                        setCoverImage(null);
                        setFileCoverPreview(null) 
                        setCoverProcessing(false)
                        notifysuccess("Your cover image has been successfully updated.")          
                        mutate("GetBasicDetail",{...profile,coverImage:data.Location},false)
                    }
                    else{
                      notifyerror(err)
                      setCoverProcessing(true)
                    }
                  }
              })
        }
        else{
            notifyerror(errDlt)
            setCoverProcessing(true)
        }
    })
  }
return <>
      <Head>
          <title>
              Dashboard
          </title>
      </Head>
      <div className={`${styles.profileContainer}`}>
         <div
         >
            <div className="relative"
            >
              <div 
                style={{pointerEvents:coverProcessing?"none":"auto",cursor:coverProcessing?"no-drop":"pointer",background:"rgba(0,0,0,0.64)"}}
                className='flex text-sm rounded absolute top-2 right-2 z-20 text-white'>
                {fileCoverImage && <p 
                    className='cursor-pointer border-r p-2 border-amber-500'
                    onClick={()=>{setCoverImage(null);setFileCoverPreview("")}}
                >Cancel</p>}
                {fileCoverImage && <motion.p 
                    className='cursor-pointer border-r p-2 border-amber-500'
                    onClick={handleUploadCover}
                >{coverProcessing?"Uploading...":"Upload"}</motion.p>}
                <label className="cursor-pointer p-2 ">
                    <input
                        onChange={handleFile}
                        accept={"image/*"}
                        type="file"/>
                        Change
                </label>
              </div>
            </div>
            <div 
             className={styles.dashBoardProfile}
             >
                <div 
                 className={`relative w-full ${styles.dashboardProfileContainer}`}
                >
                        <Image
                            layout='fill'
                            objectFit='cover'
                            src={profile.image}
                            alt="Your Cover Image"
                        />
                        <div 
                            className='absolute z-10 text-white bottom-4 left-4 mx-auto sm:mt-4'
                        >
                            <div>
                                <div className='flex flex-col sm:flex-row items-center'>
                                    <p className="text-5xl font-semibold">{profile.name}</p>
                                    <div className="flex">
                                        {profile.isVerified && <IconButton className="ml-2"><VerifiedIcon style={{color:"#0080ff"}}/></IconButton>} 
                                    </div>
                                </div>
                                <p className='text-sm mt-1'>{profile.address}</p>
                            </div>
                        </div> 
                </div>

            </div>
         </div>


         <div className="grid grid-cols-2"
            style={{height:"50vh"}}
         >
            <div className='border-r border-white'>
                <div className="mx-4 my-8" >
                    <p className='text-xl mb-4 '>Contact Details</p>
                </div>
                <div className="mx-4 text-sm">
                    <span className='mr-2 basicButton rounded'>{profile.email}</span>
                    <span className='mr-2 basicButton rounded'>{profile.phoneNumber}</span>         
                </div>
                <div className="mx-4 my-20">
                    <span className='mr-2 basicButton rounded'>{profile.aHolder}</span>
                    <span className='mr-2 basicButton rounded'>{profile.aNumber}</span>         
                    <span className='mr-2 basicButton rounded'>{profile.aIFSC}</span>         

                </div>

            </div>
            <div className='dark:bg-black h-full grid place-items-center bg-slate-50 text-black dark:text-white'>
                <div className="text-center" >
                    <p className='text-white font-semibold text-8xl'>{profile.profit}</p>
                    <p className='text-xl mb-4 sm:mt-0 mt-8 '>Your Earnings</p>
                </div>

            </div>
         </div>
      </div>


  </>;
};

Dashboard.Layout = DashboardLayout

export default Dashboard;

export async function  getServerSideProps(context){

    const {query}=context;
    const session = await getSession(context)
    if(_.isNull(session)){
        return {
            redirect:{
                destination:`${defaultOptions.baseUrl}/auth/signin?callbackUrl=${defaultOptions.baseUrl}/dashboard`,
                permanent:false
            }
        }
    }

    return {
        props:{
            user:session.user,
            msg:null
        }
    }
 }
 