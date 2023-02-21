import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import Jumbotron from '../../components/cards/Jumbotron';
import { useAuth } from '../../context/auth';

export default function Register() {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // context hooks
  const [auth, setAuth] = useAuth()

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`http://localhost:8000/api/v1/register`, {
        name,
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
        setAuth({ ...auth, token: data?.token, user: data?.user });
        toast.success("Registration successful");
        navigate('/dashboard/user')

      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Try again.");
    }
  }
  return (
    <div>
      <Jumbotron title="Register" subtitle="create new user account"></Jumbotron>
      <Toaster />
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
