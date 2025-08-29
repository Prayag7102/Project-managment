import React from 'react'
import { ChevronDown, ChevronUp } from "lucide-react";

function TableHeading({name,sort_field=null, sort_direction=null, sortable=true}) {

    
  return (
    <th onClick={(e)=> sortChanged(name, e)} className='px-3 py-2'>
        <div className='flex items-center justify-between gap-2'>{name}
            {
                sortable && (
                    <div>
                        <ChevronUp className='w-4' color={sort_field === name && sort_direction === 'asc' ? '#4846e2' : '#ccc'}/>
                        <ChevronDown className='w-4 -mt-2' color={sort_field === name && sort_direction === 'desc' ? '#4846e2' : '#ccc'}/>
                    </div>
                )
            }
        </div>
    </th>
  )
}

export default TableHeading