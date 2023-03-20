import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";

export default function AdminRoute() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get(`/admin-check`);
      if (data.admin) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    };

    if (auth?.token) adminCheck();
  }, [auth?.token]);

  let pathName =auth?.token ? "" : "login";
  return admin ? <Outlet /> : <Loading path={pathName} />;
}
