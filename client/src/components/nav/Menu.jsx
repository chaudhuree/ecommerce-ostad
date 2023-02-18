import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Menu() {
  return (
    <div>
      <ul className="nav shadow-sm p-3 mb-3 d-flex justify-content-between">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Registration</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
      </ul>
    </div>

  )
}
