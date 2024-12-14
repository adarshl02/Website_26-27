import React from 'react'

export default function MiniPratibimb() {
  return (
    <div>
       <div className=" md:mb-3 bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-2xl text-center font-medium tracking-tight text-transparent md:text-5xl font-poppins">
       Photography Workshop at <br/>
       St. Vincent Pallotti School
      </div>
      <div className="text-center text-neutral-900 text-lg opacity-70 py-6 ">
        Successfully conducted Photography Workshop 
      </div>

      <div className=' grid grid-cols-2 mx-12 gap-y-6'>
        <img src="/mini1.JPG" alt="image" className='col-span-2 w-full md:w-[80%] rounded-lg mx-auto' />
        <img src="/mini2.JPG" alt="image" className='col-span-1 w-[90%] md:w-[70%] mx-auto rounded-lg' />
        <img src="/mini2.JPG" alt="image" className='col-span-1 w-[90%] md:w-[70%] mx-auto rounded-lg' />

      </div>

      <div className="mt-8 md:mb-3 bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-2xl text-center font-medium tracking-tight text-transparent md:text-5xl font-poppins">
       Photography Workshop at <br/>
       Choitram School
      </div>
      <div className="text-center text-neutral-900 text-lg opacity-70 py-6 ">
        Successfully conducted Photography Workshop in Choitram School
      </div>
    </div>
  )
}
