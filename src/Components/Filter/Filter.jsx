import React from 'react'

export default function Filter({ activeFilter, onFilterChange }) {
  const options = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "TV Shows", value: "tv" },
  ]

  return (
    <div className="d-flex gap-2 my-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="btn btn-sm rounded-pill px-3 fw-semibold border-0"
          style={{
            backgroundColor: activeFilter === option.value ? "#f9d94a" : "#f0f0f0",
            color: "#000",
          }}
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}