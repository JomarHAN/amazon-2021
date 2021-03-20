import React, { useEffect } from "react";
import Products from "../components/Products";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { getListProducts, getTopProduct } from "../actions/productActions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

function HomeScreen() {
  const { loading, error, products } = useSelector(
    (state) => state.productsList
  );
  const {
    loading: loadingTopSell,
    error: errorTopSell,
    products: productsTopSell,
  } = useSelector((state) => state.productsTopSell);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListProducts({}));
    dispatch(getTopProduct());
  }, [dispatch]);

  return (
    <div>
      {loadingTopSell ? (
        <LoadingBox />
      ) : errorTopSell ? (
        <MessageBox variant="danger">{errorTopSell}</MessageBox>
      ) : (
        <Carousel showArrows autoPlay infiniteLoop>
          {productsTopSell.map((x) => (
            <div key={x._id}>
              <Link to={`/product/${x._id}`}>
                <img
                  src={x.imageAlbum.image1}
                  alt={x.name}
                  className="carousel-img"
                />
                <p className="legend">{x.name}</p>
              </Link>
            </div>
          ))}
        </Carousel>
      )}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Products key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
