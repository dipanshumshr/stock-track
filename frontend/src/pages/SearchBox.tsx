import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useQuery } from '@tanstack/react-query';
import { createStockOptions } from '@/queryOptions/getStock';
import MedCard from '@/components/MedCard';

function SearchBox() {

  const [searchText, setSearchText] = useState("")

  const { data: stockItems, isError, isPending } = useQuery(createStockOptions)


  return (
    <>
      <Navbar title='Search Item' />
      <div>
        {isPending && <p>Loading...</p>}
        {isError && <div> Error Fetching data </div>}
        <div className='flex justify-center items-center w-full h-30'>
          <input
            className="block w-[550px] pl-14 pr-5 py-4 text-xl text-white bg-zinc-900 border border-zinc-800 rounded-2xl placeholder-zinc-500 shadow-lg shadow-blue-500/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50  focus:bg-zinc-800 focus:scale-[1.01]"
            type="text"
            value={searchText}
            placeholder='Enter the medicine'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)} />
        </div>

        <div className='grid grid-cols-[400px_400px_400px] auto-rows-[300px] gap-10 justify-center mt-4 pb-20'>
         {
          stockItems?.map(val => (<MedCard key={val.productId._id} medObj={val}/>))
         }
        </div>
      </div>

    </>
  )
}

export default SearchBox