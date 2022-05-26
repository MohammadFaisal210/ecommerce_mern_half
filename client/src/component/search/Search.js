import React from 'react'
function Search({ search, setSearch }) {

    return (
        <div className='productSearch'>
            <input type="text" placeholder='Enter a product Search' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}

export default Search