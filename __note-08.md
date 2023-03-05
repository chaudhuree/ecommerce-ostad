- make seperate dashboard for admin in the pages/admin folder
- conditionally navigate to user or admin dashboard

- create route for fetch all users and update user role in backend auth route
- also created controller for them

- create update user role page
- design and implemented functionality
- apply routing with private route for it
- add condition in dropdown to show only for admin user


> dropdown code 

```
<li>
    <Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</Link>
</li>
{auth?.user?.role === 1 && 
<li>
    <Link className="dropdown-item" to="dashboard/user-role">Users</Link>
</li>}
```


> code for login page for conditional routing with admin based

```
navigate(location.state || `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`)
```