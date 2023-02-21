import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  })
  // axios config
  axios.defaults.baseURL = "http://localhost:8000/api/v1";
  axios.defaults.headers.common["Authorization"] = auth?.token
  // if it is passed as bearer token then below code 
  // axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      setAuth({ ...auth ,user: auth?.user,token: auth.token});
    }
  }, [])

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )


    ;
}

const useAuth = () => useContext(AuthContext);
// const [auth,setAuth]=useAuth()
export { AuthProvider, useAuth };

