import React from 'react'
import { Mutation ,QueryClient,useMutation } from '@tanstack/react-query'
import { useQuery, useQueryClient } from '@tanstack/react-query'
const Home = () => {
  const queryClient= useQueryClient()
  const {mutate:logout}=useMutation({
    mutationFn:async()=>{
      await axiosInstance.post("/auth/logout")
      onSuccess: () => { 

        queryClient.invalidateQueries({queryKey:["authUser"]})
       }
    }
  })
  const handleLogout=()=>{
    logout()
  }

  return (
    <div  className='flex justify-between'   >
      Home

      <button   onClick={()=>handleLogout()}    className='bg-red-500 text-white px-4 py-2 rounded-xl  text-center  '  >Logout</button>
    </div>
  )
}

export default Home
