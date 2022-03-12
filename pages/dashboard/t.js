import React from 'react';
import DashboardLayout from "../../components/layout/dashboardLayout"
import { getSession } from 'next-auth/react';
import _ from "lodash"
import { IconButton } from '@mui/material';
import {motion} from "framer-motion"
import useSWR, { mutate } from "swr";
import { availableTables,editTableCount} from '../../globalSetups/api';
import Head from "next/head"
import { QRCode } from 'react-qrcode-logo';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {defaultOptions} from "../../globalSetups/availableArrays"
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Link from 'next/link';

const Tabulate = ({ user }) => {

  const {data,error}=useSWR("FetchingAllTables",()=>availableTables({email:user.email}))
  if (error)
    return <h1>Error for {user.id}</h1>
  if (!data) {
    return <p>LOADING</p>
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5
      }
    }
  }

  const editTable=async(by)=>{
        const response= await editTableCount({email:user.email,by:by})
        if(response.status===200){
            mutate("FetchingAllTables")
        }
  }



  return (
    <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1,transition:{duration:1}}}
      exit={{opacity:0}}
      className='grid' style={{ height: "calc(100vh)", gridTemplateRows: "auto 1fr auto" }}>
      <Head>
        <title>Tables - Bhukku.</title>
      </Head>
      <div className="p-4">
          <div className="flex justify-between">
          <h1 className="text-4xl font-semibold">Tables</h1>
          <div className="flex items-center">
              <IconButton  onClick={()=>editTable(-1)}>
                    <IndeterminateCheckBoxIcon className='text-black dark:text-white text-3xl'/>
              </IconButton>
              <p>
              {data.table}
              </p>
              <IconButton onClick={()=>editTable(1)}>
                    <AddBoxIcon className='text-black dark:text-white text-3xl'/>
              </IconButton>
          </div>
          </div>
          <motion.div
            className='grid grid-cols-5 gap-8 mt-12'>
              {new Array(data.table).fill("").map((item,index)=>{
                  return (
                      <motion.div key={index}
                          id="qr1"
                          className=" rounded bg-gray-200 dark:bg-black p-4"
                      >
                          <QRCode
                            eyeRadius={10}
                            qrStyle={"dots"}
                            // logoImage="/static/Logo.png"
                            logoWidth={50}
                            size={150} value={defaultOptions.baseUrl+"/"+(index+1)+"/"+data.email} className="mx-auto"/>
                          <div className="text-center text-sm pt-4">
                            <p>Table {index+1}</p>
                            <Link href={defaultOptions.baseUrl+"/"+(index+1)+"/"+data.email}>
                                <a>@Bhukku. - spider8019</a>
                            </Link>
                          </div>
                      </motion.div>
                  )
              })}

          </motion.div>
      </div>
    </motion.div>
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

