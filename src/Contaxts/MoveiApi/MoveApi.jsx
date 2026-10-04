import React, { createContext, useEffect, useState } from "react"
export const MoviesContext = createContext()

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export default function MoviesContextProvider({ children }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [pagenum, setPageNum] = useState(1)

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist")
    return saved ? JSON.parse(saved) : []
  })

  async function getNowPlayingMovies() {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16&page=${pagenum}`
      )
      if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`)
      }

      const data = await response.json()
      setMovies(data.results ?? [])
      setTotalPages(data.total_pages ?? 1)

      console.log(data.results)
    } catch (err) {
      setError(err.message)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getNowPlayingMovies()
  }, [pagenum])

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
  }, [watchlist])

  function toggleWatchlist(movie) {
    const exists = watchlist.find(item => item.id === movie.id)

    if (exists) {
      setWatchlist(watchlist.filter(item => item.id !== movie.id))
    } else {
      setWatchlist([...watchlist, movie])
    }
  }

  return (
    <MoviesContext.Provider
      value={{
        movies,
        totalPages,
        pagenum,
        setPageNum,
        loading,
        error,
        watchlist,
        toggleWatchlist,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}