import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { MoviesContext } from '../../Contaxts/MoveiApi/MoveApi'
export default function NavBar() {
  const { watchlist } = useContext(MoviesContext)
  return (
    <div>
    <nav className="navbar navbar-expand-lg py-2 " style={{ backgroundColor: "#f9d94a" }}>
  <div className="container  d-flex justify-content-between align-items-center">
   <Link to="" className="text-dark text-decoration-none"> <span className="fw-bold">Movie App</span> </Link> 
    <div className="d-flex align-items-center gap-4">
      <div className="dropdown">
        <a className="text-dark text-decoration-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          En
        </a>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">En</a></li>
          <li><a className="dropdown-item" href="#">Ar</a></li>
        </ul>
      </div>
      <Link  to="/watchlist" className="text-dark text-decoration-none">
        <i className="fa-solid fa-heart me-1"></i> watchlist <span  >{watchlist.length}</span>
        
      </Link>
    </div>
  </div>
</nav>
    </div>
  )
}
