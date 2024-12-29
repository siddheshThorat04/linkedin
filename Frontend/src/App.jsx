import { Routes,Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"
import { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "./lib/axios"
import { Navigate } from "react-router-dom"
function App(){
  const {data:authUser}=useQuery({
    queryKey:["authUser"],
    queryFn:async()=>{
      try{const {data}=await axiosInstance.get("/auth/profile")
      return data}catch(err){
        if(err.response.status===401){
          return null
        }
      }
    }
  })
  console.log("authUser",authUser);
  return  <Layout> 
    
    <Routes>
      <Route  path="/" element={ authUser?<Home/>:<Navigate to={"/login"}/>}/>
      <Route  path="/login" element={!authUser ? <Login/> :  <Navigate to={"/"}/>}/>
      <Route  path="/signup" element={ !authUser ? <SignUp/> :  <Navigate to={"/"}/> }/>
    </Routes>
    <Toaster/>
  </Layout>
}

export default App
