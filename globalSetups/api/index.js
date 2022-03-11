import axios from "axios"
import { defaultOptions } from "../availableArrays"

const callApiAndReturnDataGet = async(DATA,URL)=>{
    const response = await axios({
        method:"GET",
        url:defaultOptions.baseUrl+"/api/"+URL,
        params:DATA
    })
    return response
}

const callApiAndReturnDataGetMod = async(DATA,URL)=>{
    const response = await axios({
        method:"GET",
        url:defaultOptions.baseUrl+"/api/"+URL,
        params:DATA
    })
    if(response.status===200)
        return response.data
    else{
        return{error:"Unable To Fetch"}
    }
}

const callApiAndReturnDataPost = async(DATA,URL)=>{
    const response = await axios({
        method:"POST",
        url:defaultOptions.baseUrl+"/api/"+URL,
        data:DATA
    })

    return response
}
const callApiAndReturnDataPut = async(DATA,URL)=>{
    const response = await axios({
        method:"PUT",
        url:defaultOptions.baseUrl+"/api/"+URL,
        data:DATA
    })

    return response
}
const callApiAndReturnDataDelete = async(DATA,URL)=>{
    const response = await axios({
        method:"DELETE",
        url:defaultOptions.baseUrl+"/api/"+URL,
        data:DATA
    })

    return response
}

// export const getProfile = (obj) => callApiAndReturnDataGet(obj,"profile")
export const yourAllItems = (obj) => callApiAndReturnDataGetMod(obj,"profile/items/")
export const signupProfile = (obj) => callApiAndReturnDataPost(obj,"must/signup/")
export const loginProfile = (obj) => callApiAndReturnDataPost(obj,"must/login/")
export const updateProfileImage = (obj) => callApiAndReturnDataPut(obj,'profile/detail/')
export const getProfileDetails = (obj) => callApiAndReturnDataGetMod(obj,"profile/detail/")
export const uploadPost = (obj) => callApiAndReturnDataPost(obj,"profile/posts/")
export const profileById = (obj) => callApiAndReturnDataGetMod(obj,'profile/byId/')
export const availableItems = (obj) => callApiAndReturnDataGetMod(obj,"food/")
export const addItemToMenu = (obj) => callApiAndReturnDataPut(obj,"food/")
export const removeItemFromMenu = (obj) => callApiAndReturnDataPut(obj,'food/menu/')
export const availableTables = (obj) => callApiAndReturnDataGetMod(obj,'food/menu/')
export const editTableCount = (obj) => callApiAndReturnDataPut(obj,'food/table')
export const yourAllItemsClients = (obj) => callApiAndReturnDataGetMod(obj,'client/')
export const submitOrder = (obj) => callApiAndReturnDataPost(obj,"/orders")
export const tableStatus = (obj) => callApiAndReturnDataGetMod(obj,"/orders/tablestatus")