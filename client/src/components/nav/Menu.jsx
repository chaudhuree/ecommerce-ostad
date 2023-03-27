import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import useCategory from '../../hooks/useCategory';
import Search from '../forms/Search';

export default function Menu() {
  // context
  const [auth, setAuth] = useAuth()
  // hooks
  const categories = useCategory()
  const Navigate = useNavigate()
  // logout function
  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    // window.location.reload();
    toast.success('Logout successful')
    Navigate('/login')
  }
  return (
    <div>

      <ul className="nav shadow-sm p-3 mb-3 d-flex justify-content-between">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/shop">
            SHOP
          </NavLink>
        </li>
        {/*
          categories dropdown
        */}
        <div className="dropdown" >
          <a className="dropdown-toggle bg-warning btn" data-bs-toggle="dropdown" aria-expanded="false" role="button" id="categoryDropDown">
            CATEGORIES
          </a>
          <ul
            className="dropdown-menu text-center" aria-labelledby="categoryDropDown"
          >
            <div style={{ width: "250px", display: "flex", flexWrap: "wrap", justifyContent: "space-between",padding:"0 12px" }}>
              <li>
                <NavLink className="nav-link dropdown-item" to="/categories">
                  All Categories
                </NavLink>
              </li>

              {categories?.map((c) => (
                <li key={c._id}>
                  <NavLink className="nav-link dropdown-item" to={`/category/${c.slug}`}>
                    {c.name}
                  </NavLink>
                </li>
              ))}</div>

          </ul>
        </div>
        {/*
          search component
        */}
        <Search />

        {/*
          user dropdown
        */}
        {!auth?.user ? (<div className='d-flex justify-content-between'>

          <li className="nav-item">
            <NavLink className="nav-link" to="/register">Registration</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>

        </div>) : (
          <div className="dropdown">
            <a className="dropdown-toggle bg-info btn" data-bs-toggle="dropdown" aria-expanded="false">
              {auth?.user?.name}
            </a>

            <ul className="dropdown-menu text-center" >

              <li>
                <Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</Link>
              </li>

              {auth?.user?.role === 1 && <li>
                <Link className="dropdown-item" to="dashboard/user-role">Users</Link>
              </li>}

              <li><hr className="dropdown-divider" /></li>

              <li className="dropdown-item">
                <a className="nav-link cursor_pointer" onClick={logout}>Logout</a>
              </li>

            </ul>
          </div>


        )}

      </ul>
    </div>

  )
}
