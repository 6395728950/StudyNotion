 import axios from "axios"
export const axiosInstance = axios.create({
    baseURL: "https://studynotion-1rps.onrender.com/api/v1",
    withCredentials: true,
});

export const apiconnector = (method,url,bodyData,headers,params) =>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData ? bodyData:null,
        headers:headers ? headers:null,
        params:params ? params:null,

    })
}