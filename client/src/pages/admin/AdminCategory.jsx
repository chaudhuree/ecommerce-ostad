import { Divider, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Jumbotron from "../../components/cards/Jumbotron";
import CategoryForm from "../../components/forms/CategoryForm";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";

export default function AdminCategory() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState(""); //for form value
  const [categories, setCategories] = useState([]); //for getting data from server and store
  const [visible, setVisible] = useState(false); //modal visibility
  const [selected, setSelected] = useState(null); //to store the whole category to updae and deleting purpose
  const [updatingName, setUpdatingName] = useState(""); //get the data from the form and set it to use the data while updating

  useEffect(() => {
    loadCategories();
  }, []);

  //get the data from the server
  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };
  //creating categories
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadCategories();
        setName("");
        toast.success(`"${data.name}" is created`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Create category failed. Try again.");
    }
  };
  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/category/${selected._id}`, {
        name: updatingName,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is updated`);
        setSelected(null);
        setUpdatingName("");
        loadCategories();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Category may already exist. Try again.");
    }
  };
  //delete category
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/category/${selected._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is deleted`);
        setSelected(null);
        loadCategories();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Category may already exist. Try again.");
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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Categories</div>

            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />

            <Divider orientation="center" dashed>
              Categories:
            </Divider>

            <div className="col">
              {categories?.map((c) => (
                <button
                  key={c._id}
                  className="btn btn-outline-success m-3"
                  onClick={() => {
                    setVisible(true);
                    setSelected(c);
                    setUpdatingName(c.name);
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <Modal
              open={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <CategoryForm
                value={updatingName}
                setValue={setUpdatingName}
                handleSubmit={handleUpdate}
                buttonText="Update"
                handleDelete={handleDelete}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
