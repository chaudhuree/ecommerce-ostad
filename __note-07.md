- role based routing system with dropdown menu
  -in componets folder inside nav folder in Menu.jsx

```
//if login is true:
<div className="dropdown">
           <a className="dropdown-toggle bg-info btn" data-bs-toggle="dropdown" aria-expanded="false">
             {auth?.user?.name}
           </a>
           <ul className="dropdown-menu text-center" >
             <li>
               <Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</Link>
             </li>
             <li><hr className="dropdown-divider" /></li>
             <li className="dropdown-item">
               <a className="nav-link cursor_pointer" onClick={logout}>Logout</a>
             </li>
           </ul>
         </div>
```

```
//in login page
navigate(location.state || `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`)
```

```
//in register page
navigate('dashboard/user')
//as the default role is 0 so it will redirect ot dashboard/user
```
