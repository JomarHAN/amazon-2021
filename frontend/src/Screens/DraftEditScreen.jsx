import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDraftDetail, updateDraft } from "../actions/draftActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function DraftEditScreen(props) {
  const draftId = props.match.params.id;
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
  const [fields, setFields] = useState("");
  const { loading, error, draft } = useSelector((state) => state.draftDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!draft) {
      dispatch(getDraftDetail(draftId));
    } else {
      setName(draft.name);
      setPrice(draft.price);
      setImage1(draft.imageAlbum.image1);
      setImage2(draft.imageAlbum.image2);
      setImage3(draft.imageAlbum.image3);
      setImage4(draft.imageAlbum.image4);
      setCategory(draft.category);
      setBrand(draft.brand);
      setCountInStock(draft.countInStock);
      setDescription(draft.description);
      setFields(draft.fields);
    }
  }, [dispatch, draftId, draft]);

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
        const { data } = await axios.post("/api/uploads/s3", bodyFormData, {
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
  const handleSaveDraft = (e) => {
    e.preventDefault();
    dispatch(
      updateDraft({
        _id: draft._id,
        name,
        price,
        imageAlbum: { image1, image2, image3, image4 },
        category,
        brand,
        countInStock,
        description,
        fields,
      })
    );
  };
  return (
    <div>
      <form className="form" onSubmit={handleSaveDraft}>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <h1>Edit Product {draft?._id}</h1>
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
              <label htmlFor="Fields">Fields</label>
              <input
                type="text"
                id="Fields"
                placeholder="Enter Fields"
                value={fields}
                onChange={(e) => setFields(e.target.value)}
              />
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
              <textarea
                type="text"
                id="Description"
                rows="3"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label />
              <button type="submit" className="primary">
                Save Draft & Preview
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default DraftEditScreen;
