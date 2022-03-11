import * as React from 'react';
import {zeroHeightAndWidth,xMove} from "../../globalSetups/framer"
import TranslateIcon from '@mui/icons-material/Translate';
import Link from "next/link"
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import ReactCountryFlag from "react-country-flag"
import {motion} from "framer-motion"
import styles from "../../styles/Forecast.module.css"


export default function BasicMenu() {

  const router=useRouter()
  const [show, setShow] = React.useState(false);

  const languages=[{
    code:"hn",
    language:"हिन्दी",
    country_code:"IN"
  },{
    code:"en-US",
    language:"English",
    country_code:"GB"
  }]

  return (
    <div className={styles.container}>
      <IconButton
        onClick={()=>setShow(!show)}
      >
        <TranslateIcon className="dark:text-white"/>
      </IconButton>
      {
        show 
        &&
        <motion.div 
          initial="initial"
          exit="exit"
          animate="final"
          variants={zeroHeightAndWidth}
          className={`dialogBoxDefault ${styles.mainBox} border dark:border-amber-800 dark:bg-black`}
          style={{width:"fit-content",gridTemplateColumns:"1fr"}}
        >
          {languages.map(({code,country_code,language})=>{
            return(
              <motion.div
                variants={xMove}
                key={code}
              >
                <Link 
                  href={router.asPath}  
                  locale={code}>
                  <a 
                    className={(code===router.locale)?"flex items-center pr-4 opacity-50  ":"flex items-center pr-4 opacity-100"}
                  >
                    <ReactCountryFlag countryCode={country_code} svg/>
                    <p className="pl-2">{language}</p>
                  </a>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      }
    </div>
  );
}
