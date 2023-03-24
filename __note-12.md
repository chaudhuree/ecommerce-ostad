## here now to do with product crud

for product crud we will create 3 pages,
adminProduct--> to create product
adminProducts--> to list all products
adminProductUpdate--> to update the product

and we will add the routing in admin protected route:

```
    <Route path="admin/product" element={<AdminProduct />} />
    <Route path="admin/products" element={<AdminProducts />} />
    <Route path="admin/product/update/:slug" element={<AdminProductUpdate />} />
```

## add two extra link in the admin Menu to be navigate to create product and list products.

> here we have cought an error while uploading image:
> problem:

```
ERR_BLOCKED_BY_RESPONSE.NotSameOrigin CORS Policy JavaScript
```

solution:

```
*in the server add this code:*
helmet({
      crossOriginResourcePolicy: false,
    })
```

## here we used browser default formdata to upload all data in the server

after selecting the image this code is used to preview them:

```
{photo && (
  <div className="text-center">
    <img
      src={URL.createObjectURL(photo)}
      alt="product photo"
      className="img img-responsive"
      height="200px"
    />
  </div>
)}
```

## for selecting image must use this input field format:

```
<input
  type="file"
  name="photo"
  accept="image/*"
  onChange={(e) => setPhoto(e.target.files[0])}
  hidden
/>
```

> two more codes for select and shipping

```
{/*
            ##COMMENTS
            - showSearch is used to search the category
            but here the value is id so it is not working
            - if i use vaue={c.name} then it will work
            */}

            <Select
              // showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose category"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <Select
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose shipping"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
```

## this was all for till product create.

> now its time to discuss about showing all products in the adminProducts page

- here first of all we just get all the products from the server.
- them map them all and show them
- for image we just do tricks,
- we get th id from the product and get the photo from the server
- it was a get request so if we just hit the route then automatically get the photo from the server

```
<img
  src={`http://localhost:8000/api/v1/product/photo/${p._id}`}
  alt={p.name}
  className="img img-fluid rounded-start"
/>
```

- and to show the date in nice format we used moment.js by installing it
- then use them like this:

```
<small className="text-muted">
{moment(p.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
</small>
```

## now its time to discuss about product update

- first category and product ta fetch kore ana hobe.
- product fetche er jonne slug use kora hoice
- category ta alada model. so id dea dite hobe cs ref a category dewa ase

- photo:
- check kora hobe new kore photo select kora hoice kina. na hoile tahole apped a condition kore dewa hobe j photo select er dorkar nai akhane.
- photo show er jonne

```
       {/*
             #COMMENTS:
             aikhane bepar hocce jodi photo select kora na hoy tahole photo state er value ta null or empty. so then (:) marka condition a jabe and id dea direct database theke data fetch kore ane preview ta dekhaibe.
             but jodi photo select kora hoy then create product er moto kore URL.createObjectURL(photo) use kore photo ta preview kore dekhaibe.
           */}
```

```
{photo ? (
<div className="text-center">
 <img
   src={URL.createObjectURL(photo)}
   alt="product photo"
   className="img img-responsive"
   height="200px"
 />
</div>)
: (
<div className="text-center">
 <img
   src={`
     http://localhost:8000/api/v1/product/photo/${id}?${new Date().getTime()}`}
   alt="product photo"
   className="img img-responsive"
   height="200px"
 />
</div>
)}
```

## photo er sesh a ?${new Date().getTime()} dewa hoice so rerender otherwise windods.location.reload() aita use korte hobe

> shippin er kehtre o aktu tricky ase.

- like aita db te pathanor time a 0/1 akare pathano hoice. but db te gea aita true or false a convert hoye gece. so akhn access korte amader true or false notation a e data dhorte hobe.

like: value={shipping ? "Yes" : "No"} dile kaj korbe but jodi likhi, shipping===0 hoile "No" or shipping===1 hoile "Yes" dekhabe. tahole aita kaj korbe na.
