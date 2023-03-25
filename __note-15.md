pagination system==> load more

codes:

```
  //for load more pagination system
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
```

```
  useEffect(() => {
    loadProducts();
    //get total is added here
    getTotal();
  }, []);
```

> product fetcing route is changed with paging system

```
  //to get the products from the server and it will give 6 products
  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
```

> for pagination code

```
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

```

> load more button

```
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
```
