
import React from 'react'
import Layout from "./Pages/Layout/Layout"
import Home from "./Pages/Home/Home"
import WatchList from "./Pages/WatchList/WatchList"
import Details from "./Pages/Details/Details"
import TvShows from "./Components/TvShows/TvShows"
import TvShowDetails from "./Pages/TvShowDetails/TvShowDetails"
import Search from "./Pages/Search/Search"
import AllMovies from "./Components/AllMovies/AllMovies"
import ChatBot from './Components/Chatbot/Chatbot'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
          children: [
            { index: true, element: <AllMovies /> },
            { path: "tvshows", element: <TvShows /> }
          ]
        },
        { path: "watchlist", element: <WatchList /> },
        { path: "details/:id", element: <Details /> },
        { path: "searhResults", element: <Search /> },
        { path: "tvshowsDetails/:id", element: <TvShowDetails /> }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App