import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://car-doctor-server-gamma-teal.vercel.app',
    withCredentials: true,
})
const useAxiosSecure = () => {
   const {logOut} = useAuth();
   const navagate = useNavigate();
    useEffect(()=> {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('error tracked in the interceptor',error.res);
            if(error.response.status === 401 || error.response.status === 401){
                console.log('logOut the user');
                logOut()
                .then(()=>{
                    navagate('/login')
                })
                .catch(error => {
                  console.error(error);
                })
            }
        })
    },[])

    return axiosSecure;
};

export default useAxiosSecure;