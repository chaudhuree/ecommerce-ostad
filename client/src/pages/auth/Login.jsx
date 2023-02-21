import axios from 'axios';
import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate=useNavigate()
  const location=useLocation()
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
      localStorage.setItem("auth", JSON.stringify(data));
      // note: see in auth.jsx in context folder. data is collected and save in cotext there in useEffect .
        // 🔽🔽this data is also set here manually though it is set in the auth context from the local storage.
        // if we do not white the below code then we can not see the current change in the home page. then we will have to reload the page manually to see the changes
      setAuth({...auth,user: data?.user,token: data.token });
      toast.success("Login successful");
      navigate(location.state || '/dashboard')

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
