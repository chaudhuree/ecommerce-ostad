this time i have worked on shop page
in this page it has two sections
one is for filtering options and another is for displaying products based on the filter

filtering happens on two part , one is for category and another is for price range

category is an array. and price range is also an array.
but category is a select and price is radio

so for category we can choose multiple item and push into the array.and must notice we have pushed the category id because in database it is stored as id(relation to category model)

but for radio we can only choose one at a time. so we have set the value for each as an array.
for price we have created a price.js file in the root or src folder.

set menu in the nav for shop page
created the shop page in the pages folder.
set the shop routing in the app.js file

also have to set some styling for the first select item in the category select box.
