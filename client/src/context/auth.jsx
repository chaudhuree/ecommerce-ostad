import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  })

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

