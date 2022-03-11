import React from 'react'
import {useRouter} from "next/router"

const Tos = () => {
  const [uuid,setUuid]=React.useState("")

  const router=useRouter()
  const handleClick=(e)=>{
      e.preventDefault()
      router.push("/*/*/ts?uuid="+uuid)
  }
  return (
    <div className="grid place-items-center"
    style={{height:"calc(100vh - 74px)"}}
    >
        <form onSubmit={handleClick} className="flex-col flex">
          <input type="String"
            value={uuid}
            onChange={e=>setUuid(e.target.value)}
            placeholder="Enter Order Id"
            className='p-2 mb-4 rounded border-2 border-white'
          />  
          <input type="Submit" className='basicDarkButton dark:text-black'/>  
        </form>    
    </div>
  )
}

export default Tos