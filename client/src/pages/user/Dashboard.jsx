import React from 'react'
import Jumbotron from '../../components/cards/Jumbotron'
import { useAuth } from '../../context/auth'

export default function Dashboard() {
  const [auth, setAuth] = useAuth()
  return (
    <>
    <Jumbotron
   title={`Hello ${auth?.user?.name}`}
   subtitle="User Dashboard"
 /></>
  )
}
