import Image from "next/image"
import styles from "../../styles/Gallery.module.css"

const previewPost=({file,fileExtension})=>{
    switch(fileExtension){
        case "jpg":
        case "jpeg":
        case "png":
        case "tiff":
            return(
                <>
                <div className={styles.galleryImage}
                    style={{margin:0,borderRadius:"0"}}
                >
                    <div
                    style={{
                        width: "100%",
                        background:"red"
                        }}
                    >
                        <Image
                            className={styles.imageUnsized}
                            layout="responsive" 
                            height={5000}
                            width={0}
                            objectFit='cover'
                            src={file} 
                            alt="Preview Image"
                        />

                    </div>
                </div>

                </>)
        case "mp4":
        case "mov":
            return(
                <video className="rounded" style={{height:"calc(100% - 0.5rem)",width:"100%"}} controls>
                    <source src={file} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            )
        case 'mp3':
        case 'mpeg':
            return(
                <div>
                    <audio controls
                     className="w-full"
                    >
                        <source src={file} type="audio/mpeg"/>
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )
            break;
        default:
            return(<p className="text-red-500 text-center">.{fileExtension} Extension is not supported</p>)
            
    }
}

export default previewPost