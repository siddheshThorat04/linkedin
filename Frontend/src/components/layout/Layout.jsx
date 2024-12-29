
import Navbar from './Navbar'
import { useQuery } from "@tanstack/react-query"
const Layout = ({children}) => {
  const {data:authUser}=useQuery({
    queryKey:["authUser"],
  })

  console.log("authUser is in Layout"  , authUser  )
  return (
    <div className='min-h-screen text-2xl text-white   bg-slate-600  '  >


      <Navbar/>  
      <main  className=' max-w-7xl mx-auto px-3 py-6'  > 
        {children}
      </main>
    </div>
    )
}

export default Layout
