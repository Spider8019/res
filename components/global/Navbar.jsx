  import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ChangePageLanguage from "../dropdowns/ChangePageLanguage"
import _ from "lodash"
import { useSession,signIn } from "next-auth/react"
import { Avatar,IconButton } from '@mui/material'
import { defaultOptions } from '../../globalSetups/availableArrays'
import {  isMobile,isBrowser } from 'react-device-detect';
import {motion} from "framer-motion"
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from 'next-themes'
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';

const Navbar = () => {
    let  { t }= useTranslation()
    const router=useRouter()
    const { data: session, status } = useSession()
    const { theme, setTheme } = useTheme()


    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
  
    const list = () => (
      <ul 
          className={`${router.pathname.includes("/literature")&&"stickyNavbarLowerOne"} text-black flex justify-center sm:text-white sm:flex-row }`}
      >
          <li className={router.pathname == "/" ? "activeLink" : ""}>
          <Link href="/">
            <a className='py-2 px-2 block mx-4 dark:text-white text-black '>{t('common:navbar.home')}</a>
          </Link>
          </li>
          <li className={router.pathname == "/r" ? "activeLink" : ""}>
          <Link href="/r">
            <a className='py-2 px-2 block mx-4 dark:text-white text-black '>Resturants</a>
          </Link>
          </li>
          <li className={router.pathname.includes("/tos") ? "activeLink" : ""}>
          <Link href="/tos">
            <a className='py-2 px-2 block mx-4 dark:text-white text-black '>Status</a>
          </Link>
          </li>


      </ul>
    );

    if (["/auth/signin","/signup","/dashboard","/dashboard/t","/dashboard/m","/dashboard/o"].includes(router.pathname))
      return null;

    if(isBrowser){
        return (  
            <div className=' dark:bg-black shadow-lg'>
                <div className="sm:px-10 sm:py-4 grid grid-cols-3 justify-between  items-center">
                    <div className='flex items-center'>
                      <h1 className="sm:text-4xl sm:ml-2 font-semibold">{t('common:title')}</h1>
                    </div>
                    {list()}
                    <div className="flex items-center justify-end">  
                      <ChangePageLanguage/>
                      <IconButton onClick={() => {theme==='light'?setTheme('dark'):setTheme('light')}}>
                        {
                          theme && theme==="dark"
                          ?
                          <LightModeIcon className="dark:text-white text-white"/>
                          :
                          <DarkModeTwoToneIcon className="dark:text-white"/>
                        }
                      </IconButton>
                      {
                        (!session && status==='unauthenticated')
                        &&
                          <button 
                            aria-label="internationalizationButton"
                            className='basicDarkButton dark:text-black' 
                            style={{marginLeft:"1rem"}}
                            onClick={()=>signIn(null,{ callbackUrl: `${defaultOptions.baseUrl}/dashboard`})}
                          >Login</button>
                      }
                      {
                        session
                        &&
                          <Link 
                            passHref={true}
                            href="/dashboard">
                            <motion.a
                              whileTap={{scale:0.9}}
                            >
                              <Avatar  
                                className="ml-2 cursor-pointer"
                              >
                                  <Image src={session.user.image} alt={session.user.name} layout="fill" objectFit='cover' />
                              </Avatar>
                            </motion.a>
                          </Link>
                      }
                    </div>
                </div>
                <style jsx>{`
                  .stickyNavbarLowerOne {
                    position:sticky;
                    top:0;
                  }
                `}</style>
            </div>
        )
      }
    


    return null;
}

export default Navbar
