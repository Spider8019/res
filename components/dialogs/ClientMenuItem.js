import { IconButton } from '@mui/material'
import React,{useState} from 'react'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {motion} from "framer-motion"

const ClientMenuItem = ({total,setTotal,orderSummary,setOrderSummary,price="Price",title="Title",about="About",ageRestriction="Age Restriction",category="Category",protein="P",carbohydrate="C",fat="F",vitamins="V",minerals="M"}) => {

  const [value,setValue]=useState(0)
  const setChangeValue=(by,title)=>{
    const x=orderSummary.filter(item=>item.title===title)
    if(by===1)
      setTotal(total+price)
    else
      setTotal(total-price)
    setValue(value+by)
    if(value===1 && by==-1){
        const temp=orderSummary.filter(item=>item.title!==title)
        setOrderSummary(temp)
        return
    }
    if(x.length!==0){
         const temp=orderSummary.map(item=>{
             if(item.title===title){
                item.quantity+=by
             }
             return item
            })
         setOrderSummary(temp)
    }else{
        setOrderSummary([...orderSummary,{title:title,quantity:by}])
    }
  }
  return (
    <div    
        style={{background:category!="Category"?"linear-gradient(45deg,#ff008c, #1900ff)":"transparent"}} 
        className={`${category==="Category"?"dark:text-white text-black":"text-white  "} grid grid-cols-7 items-center gap-2 p-2 rounded my-2`}>
        <p>{title}</p>   
        <p>{price}</p>
        <p className={category==="Category"?"":"text-xs"}>{about.slice(0,25)}</p> 
        <p>{ageRestriction}</p>
        <p>{category}</p>
        <div className="grid grid-cols-5">
            <p>{protein}</p>
            <p>{carbohydrate}</p>
            <p>{fat}</p>
            <p>{vitamins}</p>
            <p>{minerals}</p>
        </div>
        {
            category!=="Category"
            &&
            <div className="flex justify-end items-center">
            <div className='flex'>
                <motion.span whileTap={{scale:0.95}} className="mx-2 cursor-pointer" onClick={()=>setChangeValue(-1,title)}
                  style={{pointerEvents:value===0?"none":"auto"}}
                ><IndeterminateCheckBoxIcon/></motion.span>
                <span className="mx-2">{value}</span>
                <motion.span whileTap={{scale:0.95}} className="mx-2 cursor-pointer" onClick={()=>setChangeValue(1,title)}><AddBoxIcon/></motion.span>
            </div>
            </div>
        }
    </div>
  )
}

export default ClientMenuItem