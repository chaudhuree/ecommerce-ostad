import axios from "axios";
import { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";

export default function Home() {
 const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/products`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

// sort products by sold
  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <div>
      <Jumbotron title="Book House" subtitle="Welcome to E-Commerce book shop"/>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="p-3 mt-2 mb-2 h4 text-center" style={{backgroundColor: "#2bff78a1"}}>
              New Arrivals
            </h2>
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-3" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-12">
            <h2 className="p-3 mt-2 mb-2 h4  text-center" style={{backgroundColor: "#f7ae00c9"}}>
              Best Sellers
            </h2>
            <div className="row">
              {sortedBySold?.map((p) => (
                <div className="col-md-3" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
