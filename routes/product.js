const express =require("express");
const formidable =require("express-formidable");

const router = express.Router();

// middlewares
const { requireSignin, isAdmin } =require("../middlewares/auth.js");
// controllers
const {
  create,
  list,
  read,
  photo,
  remove,
  update,
  filteredProducts,
  productsCount,
  listProducts,
  productsSearch,
  relatedProducts,
  // getToken,
  // processPayment,
  // orderStatus,
} =require("../controllers/product.js");

router.post("/product", requireSignin, isAdmin, formidable(), create);//data form-data dea send korte hobe
//see all products
router.get("/products", list);
//see specific products
router.get("/product/:slug", read); //slug ta k postman theke pathanor time a double quote dite hobe na
//get specific product photo
router.get("/product/photo/:productId", photo);
//delete specific product
router.delete("/product/:productId", requireSignin, isAdmin, remove);
//update specific product
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);


router.post("/filtered-products", filteredProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productsSearch);
router.get("/related-products/:productId/:categoryId", relatedProducts);

// router.get("/braintree/token", getToken);
// router.post("/braintree/payment", requireSignin, processPayment);
// router.put("/order-status/:orderId", requireSignin, isAdmin, orderStatus);

module.exports=router;
