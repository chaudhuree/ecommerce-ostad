import { Badge } from "antd";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cart";
//badge ribbon is used to show the sold and in stock status of the product

export default function ProductCard({ p }) {
  // context
  const [cart, setCart] = useCart();


  return (
    <div className="card mb-3 hoverable">
      <Badge.Ribbon text={`${p?.sold} sold`} color="red">
        <Badge.Ribbon
          text={`${p?.quantity >= 1
              ? `${p?.quantity - p?.sold} in stock`
              : "Out of stock"
            }`}
          placement="start"
          color="green"
        >
          <img
            className="card-img-top"
            src={`http://localhost:8000/api/v1/product/photo/${p._id}`}
            alt={p.name}
            style={{ height: "auto", width: "100%", objectFit: "cover", filter: "hue-rotate(180deg)" }}

          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h5>{p?.name}</h5>

        <h4 className="fw-bold">
          {p?.price?.toLocaleString("bn-BD", {
            style: "currency",
            currency: "BDT",
          })}
        </h4>

        <p className="card-text">{p?.description?.substring(0, 60)}...</p>
      </div>

      <div className="d-flex justify-content-between">
        <Link to={`/product/${p.slug}`}>
          <button
            className="btn btn-primary col card-button"
            style={{ borderBottomLeftRadius: "5px" }}
          >
            View Product
          </button>
        </Link>
        <button
          className="btn btn-outline-primary col card-button"
          style={{ borderBottomRightRadius: "5px" }}
          onClick={() => {
            setCart([...cart, p])
            localStorage.setItem("cart", JSON.stringify([...cart, p]))
            toast.success(`${p.name} added to cart`)
          }}

        >
          Add to Cart
        </button>
      </div>

      {/* <p>{moment(p.createdAt).fromNow()}</p>
      <p>{p.sold} sold</p> */}
    </div>
  );
}
