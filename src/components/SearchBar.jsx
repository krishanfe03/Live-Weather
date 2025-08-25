import React from 'react'

const SearchBar = ({search, setSearch, handleSearch}) => {
  return (
    <div className='max-w-[500px] h-[38px] mx-auto border border-slate-100  flex justify-between rounded-[2px] ' >
      <input type="text"
      placeholder='Enter City Name'
      name='search'
      value={search}
      onChange={(event)=> setSearch(event.target.value) }
      className='flex-1 border-none outline-none pl-3 bg-slate-100 text-[13px] text-black placeholder:text-black'
      />

      <button onClick={handleSearch}  className='bg-white text-black w-[110px] h-[100] cursor-pointer text-[13px] ' >
        Search City
      </button>
      
    </div>
  )
}

export default SearchBar
