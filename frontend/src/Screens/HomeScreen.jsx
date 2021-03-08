import React from "react";
import Products from "../components/Products";
import data from "../data";

function HomeScreen() {
  return (
    <div>
      <div className="row center">
        {data.products.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
