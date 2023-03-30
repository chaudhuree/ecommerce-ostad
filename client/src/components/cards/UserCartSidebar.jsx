import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useCart } from '../../context/cart';
export default function UserCartSidebar() {
  // context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  //state
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  // hooks
  const navigate = useNavigate();
  // braintree getTOken
  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (err) {
      console.log(err);
    }
  };
  // cart total
  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("bn-BD", {
      style: "currency",
      currency: "BDT",
    });
  };
  return (
    <div className="col-md-4 mb-5">
      <h4>Your cart summary</h4>
      Total / Address / Payments
      <hr />
      <h6>Total: {cartTotal()}</h6>
      {auth?.user?.address ? (
        <>
          <div className="mb-3">
            <hr />
            <h4>Delivery address:</h4>
            <h5>{auth?.user?.address}</h5>
          </div>
          <button
            className="btn btn-outline-warning"
            onClick={() => navigate("/dashboard/user/profile")}
          >
            Update address
          </button>
        </>
      ) : (
        <div className="mb-3">
          {auth?.token ? (
            <button
              className="btn btn-outline-warning"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Add delivery address
            </button>
          ) : (
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() =>
                navigate("/login", {
                  state: "/cart",
                })
              }
            >
              Login to checkout
            </button>
          )}
        </div>
      )}

      <div className="mt-3">
      {!clientToken || !cart?.length ? (
        ""
      ) : (
        <>
          <DropIn
            options={{
              authorization: clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => setInstance(instance)}
          />
          
        </>
      )}
    </div>
    </div>
  )
}
