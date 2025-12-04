import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useQuery } from '@tanstack/react-query';
import { createStockOptions } from '@/queryOptions/getStock';
import { DataTable } from '@/components/DataTable';
import { columns } from '@/data/Column';

function SearchBox() {

    const [searchText , setSearchText] = useState("")
   
    const { data : stockItems , isError , isPending  } = useQuery(createStockOptions)

    
  return (
    <>
        <Navbar title='Search Item'/>
        <div>
              {isPending && <p>Loading...</p>}
              {isError && <div> Error Fetching data </div>}
              <div>
                <DataTable columns={columns} data={stockItems || []}/>
              </div>
        </div>
        
    </>
  )
}

export default SearchBox