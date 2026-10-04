import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../../Components/SearchBar/SearchBar'
import MovieCard from '../../Components/MovieCard/MovieCard'
import TVCard from '../../Components/TVCard/TVCard'
import Filter from '../../Components/Filter/Filter'
import Pagination from '../../Components/Pagination/Pagination'
import { DotLoader } from "react-spinners";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const ANIMATION_GENRE_ID = 16
const RAW_PAGES_TO_FETCH = 5 
const ITEMS_PER_PAGE = 8 

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query")

  const [allFilteredResults, setAllFilteredResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [page, setPage] = useState(1)

  async function GetSearchResults() {
    try {
      setLoading(true)

      const pageRequests = []
      for (let i = 1; i <= RAW_PAGES_TO_FETCH; i++) {
        pageRequests.push(
          fetch(
           `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&page=${i}`
          ).then((res) => res.json())
        )
      }

      const pagesData = await Promise.all(pageRequests)
      const combinedResults = pagesData.flatMap((data) => data.results || [])

      const filtered = combinedResults.filter((item) => {
        if (item.media_type === "tv") return true
        if (item.media_type === "movie") {
          return item.genre_ids?.includes(ANIMATION_GENRE_ID)
        }
        return false
      })

      setAllFilteredResults(filtered)
      console.log(filtered)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    setActiveFilter("all")
  }, [query])

  useEffect(() => {
    GetSearchResults()
  }, [query])

  const filteredByType =
    activeFilter === "all"
      ? allFilteredResults
      : allFilteredResults.filter((item) => item.media_type === activeFilter)

  const totalPages = Math.ceil(filteredByType.length / ITEMS_PER_PAGE) || 1
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const displayedResults = filteredByType.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <>
      <div className='p-2 p-sm-5 container  m-auto px-5 '>
        <SearchBar />

        <p className="mt-3">
          <span className="fw-bold">Search Results for :</span> {query}
        </p>

        <Filter
          activeFilter={activeFilter}
          onFilterChange={(value) => {
            setActiveFilter(value)
            setPage(1) 
          }}
        />


        
      
        {loading ?(<><div
          className="d-flex justify-content-center align-items-center w-75 m-auto"
          style={{  height: "100vh" }}
        >
          <DotLoader color="#facd19" size={80} />
        </div></>)
 : error ? (
          <p className="text-danger fw-bold">Error</p>
        ) : displayedResults.length === 0 ? (
          <p className="text-danger fw-bold">NOT FOUND</p>
        ) : (
          <>
            <div className="row">
              {displayedResults.map((item) => (
                <div key={item.id} className="col-12 col-md-4 col-xl-3">
                  {item.media_type === "movie" ? (
                    <MovieCard {...item} />
                    
                  ) : (
                    <TVCard
                       {...item}
                    />
                  )}
                </div>
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </>
        )}
      </div>
    </>
  )
}