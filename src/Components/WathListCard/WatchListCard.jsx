import { useNavigate } from "react-router-dom"

const genreMap = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
  80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
  14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
  9648: "Mystery", 10749: "Romance", 878: "Science Fiction",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
}

export default function WatchListCard({ item, onRemove }) {
  const navigate = useNavigate()

  if (!item) return null  
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "0.0"

  const genreNames = item.genres
    ? item.genres.map((g) => g.name)
    : (item.genre_ids || []).map((id) => genreMap[id]).filter(Boolean)

  return (
    <div
      onClick={() => navigate(`/details/${item.id}`)}
      style={{
        display: "flex",
        border: "1px solid #eee",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        cursor: "pointer"
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
        alt={item.title || item.name}
        style={{ width: "180px", height: "auto", objectFit: "cover", flexShrink: 0 }}
      />
      <div style={{ padding: "20px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
            {item.title || item.name}
          </h3>
          <i
            className="fa-solid fa-heart"
            onClick={(e) => {
              e.stopPropagation()
              onRemove(item)
            }}
            style={{ color: "#f9d94a", cursor: "pointer", fontSize: "20px" }}
          ></i>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "8px 0" }}>
          <i className="fa-solid fa-star" style={{ color: "#f9c94a", fontSize: "14px" }}></i>
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>{rating} / 10</span>
          <span style={{ fontSize: "13px", color: "#888" }}>
            ({item.vote_count} Reviews)
          </span>
        </div>

        <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.5", margin: "10px 0" }}>
          {item.overview}
        </p>


        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {genreNames.map((name) => (
            <span
              key={name}
              style={{
                backgroundColor: "#f9c94a",
                color: "#333",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "4px 12px",
                borderRadius: "20px"
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}