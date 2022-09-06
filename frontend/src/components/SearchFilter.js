import React from 'react'
import { useAsyncDebounce } from "react-table";
 const SearchFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) => {
    const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);
  return (
    <div className='  mb-6
    mt-6
    flex
    items-center'>
        <div className=' text-xl
text-gray-600
  mr-6'>

        </div>
        <input value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`} className='h-8
  border-2
  border-solid
  border-green-500
  outline-none
  p-4
  rounded-lg'/>
    </div>
  )
}

export default SearchFilter