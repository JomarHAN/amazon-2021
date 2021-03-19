import React, { useState } from "react";
import { useSelector } from "react-redux";

function SearchBox(props) {
  const [fieldSelect, setFieldSelect] = useState("All");
  const [name, setName] = useState("");
  const { fields } = useSelector((state) => state.productFields);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fieldSelect === "All" && name === "") {
      props.history.push("/");
    } else {
      props.history.push(`/search/fields/${fieldSelect}/name/${name}`);
      // setFieldSelect("All");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <div className="row">
        <div>
          <select onChange={(e) => setFieldSelect(e.target.value)}>
            <option value="All">All</option>
            {fields?.map((x) => (
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
