import React from 'react';
import Image from 'next/image';
import {useRouter} from "next/router"
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import styles from "../../styles/pages/Dashboard.module.css"
import { signOut, useSession } from 'next-auth/react';
import {defaultOptions} from '../../globalSetups/availableArrays'
import useSWR from 'swr';
import {isMobile,BrowserView,MobileView} from "react-device-detect"
import { getProfileDetails } from '../../globalSetups/api';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

const Index = ({children}) => {

    
  const router=useRouter()
  return <div className={`grid h-screen ${styles.parentContainer}`} style={{gridTemplateColumns:isMobile?"1fr":"300px auto"}}>
      <div className={`${styles.sideNavContainer} dark:bg-black`} >
          <div 
            className="mx-auto my-0 sm:my-8 grid sm:place-items-center"
          >
              <Link href="/">
                  <a>
                    <BrowserView>
                        <Image
                            height={100}
                            width={100}
                            src="/static/withOutBgLogo.png"
                            alt="Dashboard Ikshvaku Logo"
                        />                    
                    </BrowserView>
                    <MobileView>
                        <FilterVintageIcon className="mt-4"/>
                    </MobileView>
                  </a>
              </Link>
          </div>
          <ul className=" sm:my-4 grid grid-cols-4 sm:block">
              <li className={`p-2 my-2 sm:pl-8 border-l-4 ${router.pathname == "/dashboard" ? " border-transparent dark:sm:border-white sm:border-black":"border-transparent"}`}>
                  <Link href="/dashboard">
                      <a className="flex align-center"><HomeOutlinedIcon/><span className="hidden sm:block ml-2">Dashboard</span></a>
                  </Link>
              </li>
              <li className={`p-2 my-2 sm:pl-8 border-l-4 ${router.pathname == "/dashboard/m" ? " border-transparent dark:sm:border-white sm:border-black":"border-transparent"}`}>
                  <Link href="/dashboard/m">
                      <a className="flex align-center"><RestaurantIcon/><span className="hidden sm:block ml-2">Available Items</span></a>
                  </Link>
              </li>
              <li className={`p-2 my-2 sm:pl-8 border-l-4 ${router.pathname == "/dashboard/t" ? " border-transparent dark:sm:border-white sm:border-black":"border-transparent"}`}>
                  <Link href="/dashboard/t">
                      <a className="flex align-center"><TableRestaurantIcon/><span className="hidden sm:block ml-2">Tables</span></a>
                  </Link>
              </li>
              <li className={`p-2 my-2 sm:pl-8 border-l-4 ${router.pathname == "/dashboard/o" ? " border-transparent dark:sm:border-white sm:border-black":"border-transparent"}`}>
                  <Link href="/dashboard/o">
                      <a className="flex align-center"><StarBorderIcon/><span className="hidden sm:block ml-2">Orders</span></a>
                  </Link>
              </li>
              <li className={`p-2 my-2 sm:pl-8 border-l-4 border-transparent`}>
                  <p>
                      <a
                        onClick={()=>signOut({ callbackUrl: defaultOptions.baseUrl })} 
                        className="flex align-center"><LockOutlinedIcon/><span className="ml-2 hidden sm:block">Logout</span></a>
                  </p>
              </li>
          </ul>

      </div>
      <div>
           {children}
      </div>
  </div>;
};

export default Index;

 
 
