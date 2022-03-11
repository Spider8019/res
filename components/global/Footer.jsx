import React from 'react';
import { Avatar, Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import Image from 'next/image';


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
  return <div
    className="bg-amber-500 dark:bg-black"
  >
    <div className="py-8 sm:px-20 px-4 grid sm:grid-cols-6 grid-cols-2">
      <ul className="flex flex-col">
        <li>
          <Link href="/gallery">
            <a className="my-2 block">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/gallery">
            <a className="my-2 block">About</a>
          </Link>
        </li>
        <li>
          <Link href="/gallery">
            <a className="my-2 block">Tourism</a>
          </Link>
        </li>
        <li>
          <Link href="/gallery">
            <a className="my-2 block">Literature</a>
          </Link>
        </li>
        <li>
          <Link href="/gallery">
            <a className="my-2 block">Talent</a>
          </Link>
        </li>
        <li>
          <Link href="/audio#player">
            <a className="my-2 block">Music</a>
          </Link>
        </li>
        <li>
          <Link href="/gallery">
            <a className="my-2 block">Gallery</a>
          </Link>
        </li>
      </ul>
      <ul className="flex flex-col ">
        <li>
          <Link href="/literature?book=The%20Ramayana&chapter=****">
            <a className="my-2 block">The Ramayana</a>
          </Link>
        </li>
        <li>
          <Link href="literature?book=Hanuman%20Ji&chapter=****">
            <a className="my-2 block">Hanuman Ji</a>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/events">
            <a className="my-2 block">Festivals</a>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/thanksto">
            <a className="my-2 block">Thanks To</a>
          </Link>
        </li>
      </ul>
      <ul></ul>
      <ul>
        <li>
          <Link href="#">
            <a className="my-2 block font-semibold">References</a>
          </Link>
        </li>
      </ul>
    </div>
    <div className="bg-amber-400 py-8 sm:px-20 px-4 border-t  
      dark:bg-black
    dark:border-amber-800
      flex
      flex-col-reverse
      sm:flex-row
      sm:justify-between">
      <div>
        <div>
          <p>Ayodhya</p>
          <h1 className='text-4xl'>Ikshvaku</h1>
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
