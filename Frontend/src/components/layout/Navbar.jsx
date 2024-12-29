import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios.js"
const Navbar = () => {
  const {data:authUser}=useQuery({
    queryKey:["authUser"],
  })
  const{data:connections}=useQuery({
    queryKey:["connections"],
    queryFn:async()=>{
      const connections=await axiosInstance.get("/connections/requests")
      enabled:!!authUser
    }
  })
  const {mutate:logout}=useMutation({
    mutationFn:async()=>{
      await axiosInstance.post("/auth/logout")
    }
  })
  const handleLogout=()=>{
    logout()
  }

  console.log(connections)
  return (
    <div className="border-b-2 py-4    "  >
      Navbar
    </div>
  )
}

export default Navbar
