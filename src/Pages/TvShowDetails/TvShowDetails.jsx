import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function TvShowDetails() {
  const { id } = useParams();
  const [tvDetails, setTvDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        setTvDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching details:", err);
        setLoading(false);
      });

    fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data.results ? data.results.slice(0, 6) : []);
      })
      .catch((err) => console.error("Error fetching recommendations:", err));
  }, [id]);

  if (loading) return <div className="text-center my-5 fw-bold">Loading Details...</div>;
  if (!tvDetails || !tvDetails.name) return <div className="text-center my-5 text-danger">No TV show data found!</div>;

  return (
    <div className="container my-4" style={{ minHeight: '100vh' }}>
      {/* القسم الرئيسي */}
      <div className="row bg-white p-4 rounded shadow-sm align-items-center g-4">
        <div className="col-md-4 text-center">
          <img
            src={tvDetails.poster_path ? `https://image.tmdb.org/t/p/w500${tvDetails.poster_path}` : 'https://via.placeholder.com/300x450'}
            alt={tvDetails.name}
            className="img-fluid rounded"
            style={{ maxHeight: '450px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold mb-3">{tvDetails.name}</h2>
          </div>

          <div className="d-flex align-items-center gap-2 mb-3 text-warning fw-bold">
            <span>★</span>
            <span className="text-dark">{tvDetails.vote_average?.toFixed(1)} / 10</span>
            <span className="text-muted fw-normal">({tvDetails.vote_count} Reviews)</span>
          </div>

          <p className="text-secondary mb-4" style={{ lineHeight: '1.6' }}>{tvDetails.overview}</p>

          <div className="d-flex flex-wrap gap-2 mb-4">
            {tvDetails.genres?.map((genre) => (
              <span key={genre.id} className="badge bg-warning text-dark px-3 py-2 rounded-pill">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* الـ Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-5">
          <h3 className="fw-bold mb-4">Recommendations</h3>
          <div className="row g-3">
            {recommendations.map((rec) => (
              <div className="col-6 col-md-4 col-xl-2" key={rec.id}>
                <Link to={`/tvshowsDetails/${rec.id}`} className="text-decoration-none">
                  <div className="card border-0 shadow-sm h-100">
                    <img
                      src={rec.poster_path ? `https://image.tmdb.org/t/p/w300${rec.poster_path}` : 'https://via.placeholder.com/150x220'}
                      alt={rec.name}
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body p-2">
                      <p className="card-title text-dark small fw-semibold text-truncate mb-1">{rec.name}</p>
                      <span className="text-muted" style={{ fontSize: '11px' }}>{rec.first_air_date?.split('-')[0]}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}