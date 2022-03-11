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

const Index = ({children}) => {

    
  const router=useRouter()
  return <div className={`grid h-screen ${styles.parentContainer}`} style={{gridTemplateColumns:isMobile?"1fr":"300px auto"}}>
      <div className={`${styles.sideNavContainer}`} >
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
              <li className={`p-2 my-2 sm:pl-8 border-l-4 ${router.pathname == "/dashboard" ? " border-transparent dark:sm:border-amber-800 sm:border-amber-500":"border-transparent"}`}>
                  <Link href="/dashboard">
                      <a className="flex align-center"><HomeOutlinedIcon/><span className="hidden sm:block ml-2">Dashboard</span></a>
                  </Link>
              </li>
              <li className={`p-2 my-2 sm:pl-8 border-l-4 ${router.pathname == "/dashboard/tabulate" ? " border-transparent dark:sm:border-amber-800 sm:border-amber-500":"border-transparent"}`}>
                  <Link href="/dashboard/tabulate">
                      <a className="flex align-center"><EqualizerOutlinedIcon/><span className="hidden sm:block ml-2">Tabulate</span></a>
                  </Link>
              </li>
              <li className={`p-2 my-2 sm:pl-8 border-l-4 ${router.pathname == "/dashboard/blog" ? " border-transparent dark:sm:border-amber-800 sm:border-amber-500":"border-transparent"}`}>
                  <Link href="/dashboard/blog">
                      <a className="flex align-center"><HistoryEduIcon/><span className="hidden sm:block ml-2">Write Blog</span></a>
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
      <div className={isMobile?'m-0':'m-4'}>
           {children}
      </div>
  </div>;
};

export default Index;

 
 
