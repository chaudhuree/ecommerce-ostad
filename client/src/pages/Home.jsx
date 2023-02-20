import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import { useAuth } from '../context/auth';
export default function Home() {
  const [auth,setAuth]=useAuth()
  console.log(auth);
  return (
    <div>
      <Jumbotron title="Home" subtitle="Book World"></Jumbotron>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </div>
  )
}
