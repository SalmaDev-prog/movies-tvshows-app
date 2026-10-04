import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBox() {
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()

  function handleSearch() {
    if (searchValue.trim() === "") return
    navigate(`/searhResults?query=${searchValue}`)
  }

  return (
    <div className="d-flex mt-4 w-100">
      <input
        type="text"
        className="form-control rounded-start-pill border-0 shadow-sm px-4 py-2"
        placeholder="Search and explore...."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="btn rounded-end-pill fw-bold px-4"
        style={{ backgroundColor: "#f9d94a" }}
      >
        Search
      </button>
    </div>
  )
}