import React, { useContext } from 'react'
import TVCard from '../TVCard/TVCard'
import Pagination from '../Pagination/Pagination'
import { TVShowsContext } from '../../Contaxts/MoveiApi/TVShowsContext'

export default function TvShows() {
  const {
    tvShows,
    loading,
    error,
    page,
    setPage,
    totalPages
  } = useContext(TVShowsContext)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something went wrong</p>

  return (
    <div className="container gap-4">
      <h4 className="fw-bold my-4">TV Shows</h4>

      <div className="row g-4">
        {tvShows.map((show) => (
          <div className="col-md-4 col-xl-3" key={show.id}>
            <TVCard {...show} />
          </div>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  )
}