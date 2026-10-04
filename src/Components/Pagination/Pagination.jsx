import React from 'react'

function Pagination({ page, totalPages, onPageChange }) {
  const maxPages = 10
  const limitedTotalPages = Math.min(totalPages, maxPages)

  const pageNumbers = []
  const maxPagesToShow = 3

  let startPage = Math.max(1, page - 2)
  let endPage = Math.min(limitedTotalPages, startPage + maxPagesToShow - 1)

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="d-flex align-items-center justify-content-center gap-2 my-4">
      <button
        className="btn btn-sm border-0 bg-transparent text-dark px-2 py-1 rounded"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        style={{ fontSize: "14px", opacity: page === 1 ? 0.4 : 1 }}
      >
        &lt;
      </button>

      {pageNumbers.map((num) => {
        const isActive = num === page
        return (
          <button
            key={num}
            className={`btn btn-sm px-3 py-1 rounded border-0 fw-semibold ${
              isActive ? "text-dark" : "bg-transparent text-dark"
            }`}
            onClick={() => onPageChange(num)}
            disabled={isActive}
            style={{
              fontSize: "14px",
              backgroundColor: isActive ? "#f9d94a" : "transparent",
              fontWeight: isActive ? "700" : "400"
            }}
          >
            {num}
          </button>
        )
      })}

      <button
        className="btn btn-sm border-0 bg-transparent text-dark px-2 py-1 rounded"
        onClick={() => onPageChange(page + 1)}
        disabled={page === limitedTotalPages}
        style={{ fontSize: "14px", opacity: page === limitedTotalPages ? 0.4 : 1 }}
      >
        &gt;
      </button>
    </div>
  )
}

export default Pagination