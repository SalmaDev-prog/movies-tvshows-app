import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../Components/NavBar/NavBar'
import Chatbot from "../../Components/Chatbot/Chatbot";
export default function Layout() {
  return (
    <div>
      <NavBar/>
    <Chatbot />
      <Outlet/>
    </div>
  )
}
