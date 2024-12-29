import React from 'react'
import Signupform from '../../components/auth/Signupform'

const SignUp = () => {
  return (
    <div  className='min-h-screen' >    
      <div className='w-[40vw] mx-auto  min-w-[300px]  bg-white  rounded-lg   h-fit  py-4   '  >
        <img  className='w-1/3  mx-auto h-fit   '   src="/logo.svg" alt="" />
        <Signupform/>
      </div>
      </div>
  )
}

export default SignUp
