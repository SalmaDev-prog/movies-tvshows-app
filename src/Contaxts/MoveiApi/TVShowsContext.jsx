import React, { createContext, useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const TVShowsContext = createContext()

export default function TVShowsContextProvider({ children }) {
  const [tvShows, setTvShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  async function getPopularTVShows() {
    try {
      setLoading(true)

      const response = await fetch(
         `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`
      )

      const data = await response.json() 


      setTvShows(data.results)
      setTotalPages(data.total_pages)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPopularTVShows()
  }, [page])

  return (
    <TVShowsContext.Provider
      value={{
        tvShows,
        loading,
        error,
        page,
        setPage,
        totalPages
      }}
    >
      {children}
    </TVShowsContext.Provider>
  )
}