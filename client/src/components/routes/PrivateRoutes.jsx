import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import Loading from './Loading'

export default function PrivateRoutes() {
  const [auth, setAuth] = useAuth()
  const [login, setLogin] = useState(false)

  // server side checking
  useEffect(() => {
    const authCheck = async () => {
      // const { data } = await axios.get("http://localhost:8000/api/v1/auth-check",{
      //   headers:{
      //     Authorization: auth?.token,
      //   }
      // });
      // after setting axios config in auth context
      const { data } = await axios.get("/auth-check");
      if (data.login) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);
  // client side checking
  // useEffect(() => {
  //   if (auth?.token) {
  //     setLogin(true);
  //   } else {
  //     setLogin(false);
  //   }
  // }, [auth?.token])

  return login ? <Outlet /> : <Loading/>
}
