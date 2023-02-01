const Category = require("../models/category.js");
const Product = require("../models/product.js");
const slugify = require("slugify");

// docs: create category
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    // checking name is given or not
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    // check either same category is already exists or not
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }
    // create new category
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

// docs: update category 

// Export the update function
exports.update = async (req, res) => {
  try {
    // Destructure the name from the request body
    const { name } = req.body;

    // Destructure the categoryId from the request params
    const { categoryId } = req.params;

    // Use the findByIdAndUpdate method from Mongoose to update the category
    // with the specified categoryId
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        // Update the name and generate the slug from it using the slugify function
        name,
        slug: slugify(name),
      },
      {
        // Return the updated category, instead of the old one
        new: true,
      }
    );

    // Return the updated category as a JSON object in the response
    res.json(category);
  } catch (err) {
    // Log the error message
    console.log(err);

    // Return a Bad Request response with the error message as a JSON object
    return res.status(400).json(err.message);
  }
};

//docs: remove category
exports.remove = async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.json(removed);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// docs: get all categories
exports.list = async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};
// docs: read specific category ,find by slug
exports.read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.productsByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const products = await Product.find({ category }).populate("category");

    res.json({
      category,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};
