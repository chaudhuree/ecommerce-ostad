import React from 'react'
import { useAuth } from '../../context/auth'

export default function AdminDashboard() {
  const [auth, setAuth] = useAuth()
  return (
   <>
   <Jumbotron
   title={`Hello ${auth?.user?.name}`}
   subtitle="Admin Dashboard"
 />
   </>
  )
}
