import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constanst/productConstants";

function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || successUpdate || product._id !== productId) {
      dispatch(getProductDetail(productId));
      dispatch({ type: PRODUCT_UPDATE_RESET });
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage1(product.imageAlbum.image1);
      setImage2(product.imageAlbum.image2);
      setImage3(product.imageAlbum.image3);
      setImage4(product.imageAlbum.image4);
      setCategory(product.category);
      setBrand(product.brand);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, productId, product, successUpdate, props]);

  const [loadingImage1, setLoadingImage1] = useState(false);
  const [errorImage1, setErrorImage1] = useState("");
  const { userInfo } = useSelector((state) => state.userSignin);
  const uploadImageHandler = (e) => {
    const inputId = e.target.id;
    const inputClick = document.querySelector(`input#${inputId}`);
    inputClick.click();
    inputClick.onchange = async (e) => {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      setLoadingImage1(true);
      try {
        const { data } = await axios.post("/api/uploads", bodyFormData, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        if (inputId === "UploadImage-1") {
          setImage1(data);
        } else if (inputId === "UploadImage-2") {
          setImage2(data);
        } else if (inputId === "UploadImage-3") {
          setImage3(data);
        } else if (inputId === "UploadImage-4") {
          setImage4(data);
        }
        setLoadingImage1(false);
      } catch (error) {
        setLoadingImage1(false);
        setErrorImage1(error.message);
      }
    };
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: product._id,
        name,
        price,
        imageAlbum: { image1, image2, image3, image4 },
        category,
        brand,
        countInStock,
        description,
      })
    );
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox />}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            <div>
              <h1>Edit Product {product._id}</h1>
            </div>
            <div>
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                id="Name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Price">Price</label>
              <input
                type="text"
                id="Price"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Image">Image</label>
              {/* <input
                type="text"
                id="Image"
                placeholder="Enter Image"
                value={image1}
                onChange={(e) => setImage1(e.target.value)}
              /> */}
              {loadingImage1 && <LoadingBox />}
              {errorImage1 && (
                <MessageBox variant="danger">{errorImage1}</MessageBox>
              )}
              <div className="output-area">
                {image1 && <img src={image1} alt="" className="upload" />}
                {image2 && <img src={image2} alt="" className="upload" />}
                {image3 && <img src={image3} alt="" className="upload" />}
                {image4 && <img src={image4} alt="" className="upload" />}
              </div>
            </div>
            <div>
              <div className="row">
                <div className="input-area">
                  <label />
                  <input type="file" id="UploadImage-1" hidden />
                  <button
                    className="block"
                    type="button"
                    id="UploadImage-1"
                    onClick={(e) => uploadImageHandler(e)}
                  >
                    Image-1
                  </button>
                </div>
                <div className="input-area">
                  <label />
                  <input type="file" id="UploadImage-2" hidden />
                  <button
                    className="block"
                    type="button"
                    id="UploadImage-2"
                    onClick={(e) => uploadImageHandler(e)}
                  >
                    Image-2
                  </button>
                </div>
                <div className="input-area">
                  <label />
                  <input type="file" id="UploadImage-3" hidden />
                  <button
                    className="block"
                    type="button"
                    id="UploadImage-3"
                    onClick={(e) => uploadImageHandler(e)}
                  >
                    Image-3
                  </button>
                </div>
                <div className="input-area">
                  <label />
                  <input type="file" id="UploadImage-4" hidden />
                  <button
                    className="block"
                    type="button"
                    id="UploadImage-4"
                    onClick={(e) => uploadImageHandler(e)}
                  >
                    Image-4
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="Category">Category</label>
              <input
                type="text"
                id="Category"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Brand">Brand</label>
              <input
                type="text"
                id="Brand"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="CountInStock">Count In Stock</label>
              <input
                type="text"
                id="CountInStock"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Description">Description</label>
              <input
                type="text"
                id="Description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProductEditScreen;
