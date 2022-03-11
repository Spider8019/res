import React from 'react';
import Navbar from '../global/Navbar';
import Footer from '../global/Footer';
import Head from "next/head"

const Layout = ({children}) => {
  return <>
          <Head>
            <meta name="description" content="Login Page" />
            <link rel="icon" href="/static/withOutBgLogo.png" />
          </Head>
          <Navbar/>
              {children}
          <Footer/>   
        </>;
};

export default Layout;
