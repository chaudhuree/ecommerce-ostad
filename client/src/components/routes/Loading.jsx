import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Loading() {
  // state
  const [count, setCount] = useState(3);
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 &&
      navigate('/login', { state: location.pathname });
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
    <b>not authorized</b>: redirecting to home page in {count} seconds
    {/* can be used any kind of gif file here so that it shows animation */}
    </div>
  );
}
