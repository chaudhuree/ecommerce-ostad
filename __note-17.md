## now single product view:

created page: ProductView.jsx

done functionality: In ProductCard.jsx page, wrap the button view product in Link and send it to /product/:slug

then in app.js create route for /product/:slug

then in ProductView.jsx page, get the slug from the url and use it to get the product from the products array

then display the product
also get the related product with the same category and showed them in sidebar
