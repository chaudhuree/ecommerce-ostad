import axios from 'axios';
import React, { useState } from 'react';
import toast from "react-hot-toast";
import Jumbotron from '../../components/cards/Jumbotron';
import { useAuth } from '../../context/auth';

export default function Login() {
  // state
  const [email, setEmail] = useState("chaudhuree@gmail.com");
  const [password, setPassword] = useState("secret");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // context hooks
  const [auth,setAuth]=useAuth()
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post(`http://localhost:8000/api/v1/login`, {
      email,
      password,
    });
    console.log(data);
    if (data?.error) {
      toast.error(data.error);
    } else {        
      setAuth({...auth,user: data?.user,token: data.token });
      toast.success("Login successful");

    }
      
    } catch (error) {
      console.log(error);
          toast.error("Login failed. Try again.");
    }
  };
  return (
    <div>
      <Jumbotron title="Login" subtitle="log in with your email and password"></Jumbotron>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
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
