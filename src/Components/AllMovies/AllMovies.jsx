
// 0............**/8.0/*
import React, { useContext, useState } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import { DotLoader } from "react-spinners";



import { MoviesContext } from '../../Contaxts/MoveiApi/MoveApi'
import Pagination from '../Pagination/Pagination';

export default function AllMovies() {
  const { movies, loading, totalPages, error,setPageNum,pagenum } = useContext(MoviesContext)


  if (loading) return (<><div
  className="d-flex justify-content-center align-items-center w-75 m-auto"
  style={{  height: "100vh" }}
>
  <DotLoader color="#facd19" size={80} />
</div></>)


  if (error) return <p className='text-danger text-center mt-4'>Something went wrong</p>



  return (
    <div className="container gap-4">
      <h4 className="fw-bold my-4">AllMovies</h4>

      <div className="row g-4">
        {movies.map((movie) => (
          <div className="col-md-4 col-xl-3" key={movie.id}>
            <MovieCard {...movie} />
          </div>
        ))}
      </div>

  

   {/* ===== Pagination ===== */}

      <Pagination
        page={pagenum}
        totalPages={totalPages}
        onPageChange={(newPage) => setPageNum(newPage)}
      />
    </div>
  )
}