import axios from "axios";
import { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  //for load more pagination system
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    //it is done to load it for the first time.because by default page is 1
    if (page === 1) return;
    loadMore();
  }, [page]);

  //to get the total number of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`/products-count`);
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };
  //to get the products from the server and it will give 6 products
  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  //to load more products implemented pagination system
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // sort products by sold
  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <div>
      <Jumbotron title="Book House" subtitle="Welcome to E-Commerce book shop" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="p-3 mt-2 mb-2 h4 text-center" style={{ backgroundColor: "#2bff78a1" }}>
              New Arrivals
            </h2>
            <div className="row">
              {products?.slice(0, 4).map((p) => (
                <div className="col-md-3" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-12">
            <h2 className="p-3 mt-2 mb-2 h4  text-center" style={{ backgroundColor: "#f7ae00c9" }}>
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
      {/*
        load more pagination codes
      */}
      <div className="container text-center p-5">
      {products && products.length < total && (
        <button
          className="btn btn-warning btn-lg col-md-6"
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            setPage(page + 1);
          }}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
    </div>
  );
}
