import React from 'react'
import Jumbotron from '../../components/cards/Jumbotron'
import UserMenu from '../../components/nav/UserMenu'
import { useAuth } from '../../context/auth'

export default function Dashboard() {
  const [auth, setAuth] = useAuth()
  return (
    <>
    <Jumbotron
   title={`Hello ${auth?.user?.name}`}
   subtitle="User Dashboard"
 />
 <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">User Information</div>

            <ul className="list-group">
              <li className="list-group-item">{auth?.user?.name}</li>
              <li className="list-group-item">{auth?.user?.email}</li>
            </ul>
          </div>
        </div>
      </div>
 </>
  )
}
