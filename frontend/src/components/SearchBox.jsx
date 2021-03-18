import React, { useState } from "react";
import { useSelector } from "react-redux";

function SearchBox(props) {
  const [category, setCategory] = useState("All");
  const [name, setName] = useState("");
  const { products } = useSelector((state) => state.productsList);
  const categories = products
    ?.map((x) => x.category)
    .reduce((a, b) => (a.includes(b) ? a : [...a, b]), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category === "All" && name === "") {
      props.history.push("/");
    } else {
      props.history.push(`/search/category=${category}/name=${name}`);
      setCategory("All");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="search">
      <div className="row">
        <div>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All</option>
            {categories?.map((x) => (
              <option value={x}>{x}</option>
            ))}
          </select>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}

export default SearchBox;
