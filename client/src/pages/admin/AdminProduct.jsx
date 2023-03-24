import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";

//antd component for form select
const { Option } = Select;

export default function AdminProduct() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  // hook
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  //categories is needed to use in the select option
  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  //create the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //as we used formidable in the backend, we need to use formdata
      const productData = new FormData();
      //after creating FormData instance, we can append the data
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);

      const { data } = await axios.post("/product", productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is created`);
        //after creating the product navigate to products list page
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product create failed. Try again.");
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Products</div>

            {/*COMMENTS:
              after selecting the data this part is used to preview the image
            */}

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

            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">

                {/*COMMENTS:
                  dynamically change the button text after selecting the image
                  the input tag is hidden to show the label properly
                */}

                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              className="form-control p-2 mb-3"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

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

            {/*
              ##COMMENTS:
              value te category id pathano hoyeche cz category ta akta alada schema
            */}

              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

                {/*
                  ## COMMENTS
                  - here the value is 0 or 1
                  - the data is saved as boolean in the database
                  - so we need to use 0 or 1
                */}
            
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

            <input
              type="number"
              min="1"
              className="form-control p-2 mb-3"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button onClick={handleSubmit} className="btn btn-primary mb-5">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
