import {
  SearchOutlined
} from '@ant-design/icons';
import { Badge } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";

export default function Search() {
  // hooks
  const [values, setValues] = useSearch();
  //here values ={keyword: "", results: []}
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      // console.log(data);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="search"
        style={{ borderRadius: "0px" }}
        className="form-control"
        placeholder="Search"
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        value={values.keyword}
      />
      <Badge count={values?.results?.length}  color="#f50">
        <button
          className="btn btn-outline-primary"
          type="submit"
          style={{ borderRadius: "0px" }}
        >
        <SearchOutlined className="d-flex justify-content-center align-items-center py-1"/>
        </button>
      </Badge>
    </form>
  );
}
