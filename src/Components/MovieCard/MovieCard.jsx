import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { MoviesContext } from '../../Contaxts/MoveiApi/MoveApi'

export default function MovieCard({
  id, // ضفنا الـ id هنا عشان نقدر نبعته في الرابط
  original_title,
  release_date,
  poster_path,
  vote_average,
    vote_count, 
  overview,
  genre_ids
}) {
  const { watchlist, toggleWatchlist } = useContext(MoviesContext)
const isInWatchlist = watchlist.some(item => item.id === id)
  return (
    <div>
      <div className="card m-2 border-0 shadow-sm position-relative h-100">

       

        <Link to={`/details/${id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            className="card-img-top"
            alt="movie poster"
            style={{ height: "230px", objectFit: "cover" }}
          />
        </Link>

        {/* نسبة التقييم */}
        <span
          className="position-absolute rounded-circle d-flex align-items-center justify-content-center fw-bold text-white z-1"
          style={{
            bottom: "70px",
            left: "10px",
            width: "38px",
            height: "38px",
            backgroundColor: "#0f4c3a",
            fontSize: "12px"
          }}
        >
          {vote_average?.toFixed(1)}
        </span>

        <div className="card-body px-2 pt-3 pb-2">
          <Link to={`/details/${id}`} className="text-decoration-none text-dark">
            <p className="mb-1 fw-semibold small text-truncate">{original_title}</p>
          </Link>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-muted" style={{ fontSize: "12px" }}>
              {release_date}
            </span>
           <i
  className={isInWatchlist ? "fa-solid fa-heart" : "fa-regular fa-heart"}
  style={{  color: isInWatchlist ? "#f9d94a" : "#e0e0e0", }}
onClick={() => toggleWatchlist({ id, title: original_title, poster_path, vote_average,  vote_count,  release_date, overview, genre_ids })}
></i>
          </div>
        </div>
      </div>
    </div>
  )
}