import { useNavigate } from "react-router-dom";
import Jumbotron from "../components/cards/Jumbotron";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

export default function Cart() {
  // context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

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
    <>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user?.name},`}
        subtitle={
          cart?.length
            ? `You have ${cart.length} items in the cart. ${auth?.token ? "" : "Please login to checkout"
            }`
            : "Your cart is empty"
        }
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length ? (
                "My Cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cart?.length && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {cart?.map((p, index) => (
                  <ProductCardHorizontal key={index} p={p} />
                ))}
              </div>
            </div>

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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
