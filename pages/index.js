import { useEffect, useRef,useState } from "react"
import {isMobile,BrowserView,MobileView} from "react-device-detect"
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import styles from "../styles/pages/Home.module.css"
import { motion, useViewportScroll, useTransform } from "framer-motion"

export default function Home() {

  let { t } = useTranslation()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{t('common:title')}</title>
        <meta name='description' content='www.ikshvaku.club is designed by spider8019 to promote tourism in the city of Lord Rama, Ayodhya (Faizabad) Uttar Pradesh. It also allows you to find the city&apos;s most skilled people in categories like arts, music, dancing, photography, and many more.' />
        <link rel="icon" href="/static/withOutBgLogo.png" />
      </Head>


      <motion.div
        style={{width: "100%", height:"calc(100vh - 74px)", position: "relative" }}
        className={`grid place-items-center `} >
        <p className={`text-9xl font-bold ${styles.gradientText}`}>For foodies</p>
      </motion.div>

    </>
  )
}





