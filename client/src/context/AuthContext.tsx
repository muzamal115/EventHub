import { createContext,  useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user";
import api from "../utils/axios";

interface AuthProviderProps {
    children:ReactNode;
}

interface ExistUserResponse {
    message: string;
    token: string;
    user: User;
}

export interface RegisterResponse {
  message: string;
  email:string
}



interface AuthContextType {
    user:User | null,
    loading:boolean,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    login: (email: string, password: string) => Promise<ExistUserResponse>,
    logout:()=>void,
    verifyOTP: (email: string, otp: string) => Promise<ExistUserResponse>,
     register: (name: string, email: string, password: string) => Promise<RegisterResponse>
}




export const AuthContext=createContext<AuthContextType | null>(null)
const AuthProvider=({children}:AuthProviderProps)=>{
const [user,setUser]=useState<User | null>(null)
const [loading,setLoading]=useState(false)

useEffect(()=>{


    setLoading(true)

    try {
         const storedUser=localStorage.getItem("user")
    if(storedUser){
        setUser(JSON.parse(storedUser))
    }
        
    } catch (error) {
         console.error(error);
    }finally{
        setLoading(false)
    }
   
    
},[])
const register=async(name:string,email:string,password:string)=>{
 
    try {
        setLoading(true)
         
        const {data}=await api.post<RegisterResponse>('/auth/register',{name,email,password})
         return data
  
    } catch (error) {
         throw error;
    }finally{
        setLoading(false)
    }
    
        

}

const login=async(email:string,password:string)=>{

        setLoading(true)
    try {
         const {data} = await api.post<ExistUserResponse >('/auth/login',{email,password})
        console.log(data)
         setUser(data.user)
         localStorage.setItem("user",JSON.stringify(data.user))
         localStorage.setItem("token",data.token)
         return data
    } catch (error) {
        console.log("Login failed:",error)
        throw error
    }finally{
        setLoading(false)
    }
   
}

const verifyOTP=async(email:string,otp:string)=>{

    try {
        
     const {data} = await api.post<ExistUserResponse >('/auth/verify-otp',{email,otp})
     setUser(data.user)
     localStorage.setItem('user',JSON.stringify(data.user))
     localStorage.setItem('token',data.token)
     return data
    } catch (error) {
        console.log("OTP verification failed:",error)
        throw error
    }
   

}


const logout=()=>{
    try {
        
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    } catch (error) {
        console.log('Error is ',error)
        throw error
    }
}
   const value:AuthContextType={
        user,
        loading,
        setLoading,
        login,
        logout,
        verifyOTP,
        register

    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider;