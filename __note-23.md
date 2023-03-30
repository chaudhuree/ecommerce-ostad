> payemnt system done with the order modle.

- created order model
- in order model first item is array of card items id.
  here we have passed the whole card. but the good news is it will extract the id from the cart ad store it in the order model.
- and we have also stored the transaction result in the order model.
- from client side , in the UserCartSidebar, we have created a function handleBuy

```
const handleBuy = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      //   console.log("nonce => ", nonce);
      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
      //   console.log("handle buy response => ", data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment successful");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
```

- in the backend side the nonce and cart is passed throght the function. after payment successfull we have to clear the cart from state and local storage.
  then navigate to the order page.

- code for pament in backend

```
exports.processPayment = async (req, res) => {
  try {
    // console.log(req.body);
    const { nonce, cart } = req.body;

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    // console.log("total => ", total);

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          // res.send(result);
          // create order
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();


          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
```
