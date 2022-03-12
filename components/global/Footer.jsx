import React from 'react';
import { Avatar, Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const contributors = [{
  name: "Aman Pratap Singh",
  url: "contributor1.jpg"
}, {
  name: "Anjali Singh",
  url: "contributor2.jfif"
}]
const Footer = () => {

  const router=useRouter()
  if (["/dashboard","/dashboard/t","/dashboard/m","/dashboard/o"].includes(router.pathname))
  return null;

  return <div
    className=""
  >

    <div className="bg-gray-200 dark:bg-black py-8 sm:px-20 px-4  
      flex
      flex-col-reverse
      sm:flex-row
      sm:justify-between">
      <div>
        <div>
          <p>Ayodhya</p>
          <h1 className='text-4xl font-semibold'>Bhukku.</h1>
        </div>
        <div className="mt-4">
          <p className='text-xs'>© 2006–2022 Ikshvaku & Spider8019, Inc. All rights reserved.</p>
        </div>
      </div>
      <div className='w-full mb-8 rounded-0 sm:mb-0 sm:w-3/12'>
        <p className="text-xl mb-4 ">Contributors</p>
        <div className='flex smflex-wrap'>
          {contributors.map((item, key) => {
            return (
              <BootstrapTooltip key={key} title={item.name}>
                <Avatar
                  className='m-1'
                >
                  <Image src={`/static/contributors/${item.url}`} alt={item.name} layout="fill" objectFit='cover' />
                </Avatar>

              </BootstrapTooltip>
            )
          })}
        </div>
      </div>
    </div>

  </div>;
};

export default Footer;
