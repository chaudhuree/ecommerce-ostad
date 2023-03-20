- design andmin and user dashboard

  - for admin dashboard created two pages, catagory and product and also AdminMenu in nav folder
  - for user dashboard two pages is created profile and orders and also UserMenu in nav folder

- then routed them in the app.js file

``` admin
<Route path="user/profile" element={<UserProfile />} />
<Route path="user/orders" element={<UserOrders />} />
```

``` user
<Route path="admin/category" element={<AdminCategory />} />
<Route path="admin/product" element={<AdminProduct />} />
```
