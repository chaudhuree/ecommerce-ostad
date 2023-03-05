import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
// import { toast } from 'react-hot-toast';

export default function UserRole() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [auth,setAuth] = useAuth()
  const loggedInUsersEmail=auth?.user?.email
  
  useEffect(() => {
    fetchAllUsers()
  }, [])
  const fetchAllUsers = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/all-users')
      setUsers([...data])
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleAdmin = async (email, status) => {
    
  try {
    const { data } = await axios.put('/admin/update-role', { email, setRole: status })
    console.log(data)
    fetchAllUsers()
  } catch (error) {
    console.log(error.message)
  }
    
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table className="table">
            <caption className='text-primary'>List of users</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>

              {users.filter((person)=>person.email!=loggedInUsersEmail).map((user, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="dropdown">
                        <button className="btn brn-sm  dropdown-toggle role_dropdown_btn" type="button" id="dropdownbutton" data-bs-toggle="dropdown" aria-expanded="false">
                          {user.role === 1 ? `admin ★` : 'user'}
                        </button>
                        <ul className="dropdown-menu role_dropdown" aria-labelledby="dropdownbutton">
                          <li><a className="dropdown-item" onClick={() => handleAdmin(user.email)} >user</a></li>
                          <li><a className="dropdown-item" onClick={() => handleAdmin(user.email, "admin")}>admin</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table></div>
      </div>
    </div>
  )
}
