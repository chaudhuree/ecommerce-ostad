import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth'

export default function PrivateRoutes() {
  const [auth, setAuth] = useAuth()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (auth?.token) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [auth?.token])

  return ok ? <Outlet /> : <div>Not authorized</div>
}
