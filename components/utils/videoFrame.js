import React,{useState} from 'react';

const VideoFrame = ({videoURL,muted=true}) => {
  return <>
      <video 
        className='object-center object-contain bg-slate-100'
        muted={muted}
        volume={0}
      >
        <source src={videoURL}/>
        Your browser does not support the video tag.
        </video>
  </>;
};

export default VideoFrame;
