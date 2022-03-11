import { nanoid } from "nanoid"
import Image from "next/image"
import styles from "../../styles/Gallery.module.css"
import VideoFrame from "./videoFrame"

const previewPost=({fileUrl})=>{
    switch(fileUrl.substring(fileUrl.lastIndexOf(".") + 1)){
        case "jpg":
        case "jpeg":
        case "png":
        case "tiff":
            return(
                <>
                        <Image 
                        className={styles.imageUnsized}
                        layout="responsive"
                        height={0}
                        width={5000}
                        objectFit='cover'
                        src={fileUrl}
                        alt={nanoid(10)}
                        /> 
                </>)
        case "mp4":
        case "mov":
        case "ogg":
            return(
                <div className="h-full bg-orange-300" style={{height:"100%"}}>
                    <VideoFrame videoURL={fileUrl}/>
                </div>
            )
        default:
            return(<p className="text-red-500 text-center">Something is wrong</p>)
            
    }
}

export default previewPost