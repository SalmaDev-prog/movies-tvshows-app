import React from 'react'
import {  NavLink, Outlet } from 'react-router-dom'
  import SearchBar from '../../Components/SearchBar/SearchBar'



export default function Home() {
  return (
    <>
      <div className="py-5" style={{ backgroundColor: "#f0f0f0" }}>
        <div className="container">
          <h2 className="fw-bold">Welcome to our movie app</h2>
          <p className="text-muted">Millions of movies, TV shows and people to discover. Explore now.</p>

         <SearchBar />
        </div>
      </div>

<nav className="mt-3">
  <ul className="d-flex list-unstyled gap-4 container py-2 mb-0">
    <li>
      <NavLink
        to=""
        end
        className={({ isActive }) =>
          `text-decoration-none fw-semibold pb-1 ${
            isActive ? "text-dark border-bottom border-warning border-2" : "text-secondary"
          }`
        }
      >
        Movies
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/tvshows"
        className={({ isActive }) =>
          `text-decoration-none fw-semibold pb-1 ${
            isActive ? "text-dark border-bottom border-warning border-2" : "text-secondary"
          }`
        }
      >
        TV Shows
      </NavLink>
    </li>
  </ul>
</nav>
      <Outlet/>
    </>
  )
}