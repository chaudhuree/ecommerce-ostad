import { Badge } from 'antd';
import React from 'react';
import { toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
import useCategory from '../../hooks/useCategory';
import Search from '../forms/Search';

export default function Menu() {
  // context
  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-3 sticky-top">
      <div className="container-fluid justify-content-between">

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">SHOP</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="categoryDropDown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                CATEGORIES
              </a>
              <ul className="dropdown-menu" aria-labelledby="categoryDropDown">
                <div className="d-flex flex-wrap justify-content-between" style={{ width: "250px", padding: "0 12px" }}>
                  <li>
                    <NavLink className="dropdown-item" to="/categories">All Categories</NavLink>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <NavLink className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</NavLink>
                    </li>
                  ))}
                </div>
              </ul>
            </li>
            <li className="nav-item">
              <Badge count={cart?.length >= 1 ? cart.length : 0} offset={[1, 9]} showZero>
                <NavLink className="nav-link " style={{marginTop:"3px",marginBottom:"25px"}} to="/cart">CART</NavLink>
              </Badge>
            </li>
          </ul>
          <div className="d-flex">
            <Search />
            {!auth?.user ? (
              <div className="d-flex">
                <NavLink className="nav-link" to="/register">Registration</NavLink>
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </div>
            ) : (
              <div className="dropdown" style={{marginLeft:"15px"}}>
                <a className="btn btn-info dropdown-toggle" href="#" role="button" id="userDropDown" data-bs-toggle="dropdown" aria-expanded="false">
                  {auth?.user?.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropDown">
                  <li>
                    <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink>
                  </li>
                  {auth?.user?.role === 1 && (
                    <li>
                      <NavLink className="dropdown-item" to="dashboard/user-role">Users</NavLink>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item cursor-pointer" onClick={logout}>Logout</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>

  )
}




// belw code is for navbar
//first create an empty fragment <> </> and then copy the code below and paste it inside the fragment
// <ul className="nav shadow-sm p-3 mb-3 d-flex justify-content-between sticky-top bg-light">
//         <li className="nav-item">
//           <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" aria-current="page" to="/shop">
//             SHOP
//           </NavLink>
//         </li>
//         {/*
//           categories dropdown
//         */}
//         <div className="dropdown" >
//           <a className="dropdown-toggle bg-warning btn" data-bs-toggle="dropdown" aria-expanded="false" role="button" id="categoryDropDown">
//             CATEGORIES
//           </a>
//           <ul
//             className="dropdown-menu text-center" aria-labelledby="categoryDropDown"
//           >
//             <div style={{ width: "250px", display: "flex", flexWrap: "wrap", justifyContent: "space-between",padding:"0 12px" }}>
//               <li>
//                 <NavLink className="nav-link dropdown-item" to="/categories">
//                   All Categories
//                 </NavLink>
//               </li>

//               {categories?.map((c) => (
//                 <li key={c._id}>
//                   <NavLink className="nav-link dropdown-item" to={`/category/${c.slug}`}>
//                     {c.name}
//                   </NavLink>
//                 </li>
//               ))}</div>

//           </ul>
//         </div>
//         {/*
//           cart item
//         */}
//         <li className="nav-item mt-1 ">
//           <Badge
//             count={cart?.length >= 1 ? cart.length : 0}
//             offset={[-5, 11]}
//             showZero={true}
//           >
//             <NavLink className="nav-link cart" aria-current="page" to="/cart">
//               CART
//             </NavLink>
//           </Badge>
//         </li>
//         {/*
//           search component
//         */}
//         <Search />

//         {/*
//           user dropdown
//         */}
//         {!auth?.user ? (<div className='d-flex justify-content-between'>

//           <li className="nav-item">
//             <NavLink className="nav-link" to="/register">Registration</NavLink>
//           </li>

//           <li className="nav-item">
//             <NavLink className="nav-link" to="/login">Login</NavLink>
//           </li>

//         </div>) : (
//           <div className="dropdown">
//             <a className="dropdown-toggle bg-info btn" data-bs-toggle="dropdown" aria-expanded="false">
//               {auth?.user?.name}
//             </a>

//             <ul className="dropdown-menu text-center" >

//               <li>
//                 <Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</Link>
//               </li>

//               {auth?.user?.role === 1 && <li>
//                 <Link className="dropdown-item" to="dashboard/user-role">Users</Link>
//               </li>}

//               <li><hr className="dropdown-divider" /></li>

//               <li className="dropdown-item">
//                 <a className="nav-link cursor_pointer" onClick={logout}>Logout</a>
//               </li>

//             </ul>
//           </div>


//         )}

//       </ul>