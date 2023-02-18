import React, { useState } from 'react';
import Jumbotron from '../components/cards/Jumbotron';

export default function Register() {
    // state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.table(name,email,password);
    }
  return (
    <div>
      <Jumbotron title="Register" subtitle="create new user account"></Jumbotron>
      <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control mb-4 p-2"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />

            <input
              type="email"
              className="form-control mb-4 p-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-4 p-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}
