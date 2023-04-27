import axios from "axios"

const api = axios.create({
    baseUrl:process.env.REACT_APP_APIURL ,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
})


export  const sendOtp =(data)=>{
return api.post('http://localhost:5500/api/send-otp',data);

}
export const verifyOtp=(data)=>{
    return api.post('http://localhost:5500/api/verify-otp',data);
} 

export default api;