import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, handleUserUpdate } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constanst/userConstants";

function ProfileScreen(props) {
  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, error, user } = useSelector((state) => state.userProfile);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdate);
  if (!userInfo) {
    props.history.push("/signin");
  }
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [logo, setLogo] = useState("");
  const [business, setBusiness] = useState("");
  const [description, setDescription] = useState("");
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [errorLogo, setErrorLogo] = useState("");
  const handleUploadLogo = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingLogo(true);
    try {
      const { data } = await axios.post("/api/uploads/s3", bodyFormData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLoadingLogo(false);
      setLogo(data);
    } catch (error) {
      setLoadingLogo(false);
      setErrorLogo(error.message);
    }
  };

  useEffect(() => {
    if (!user || successUpdate || user._id !== userInfo._id) {
      dispatch(getUserProfile(userInfo._id));
      dispatch({ type: USER_UPDATE_RESET });
    } else {
      setName(user.name);
      setEmail(user.email);
      setPassword("");
      setConfirmPassword("");
      if (user.isSeller) {
        setLogo(
          user.seller.logo
            ? user.seller.logo
            : "/Images_Template/logo-sample.png"
        );
        setBusiness(user.seller.business ? user.seller.business : "");
        setDescription(user.seller.description ? user.seller.description : "");
      }
    }
  }, [dispatch, userInfo, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      handleUserUpdate(
        name,
        email,
        password,
        confirmPassword,
        business,
        logo,
        description
      )
    );
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <div>
          <h1>User Profile</h1>
        </div>
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
            {successUpdate && (
              <MessageBox variant="success">
                User Updated Successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                required
              />
            </div>
            <div>
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required
              />
            </div>
            <div>
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </div>
            <div>
              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter Confirm Password"
              />
            </div>
            {userInfo.isSeller && (
              <>
                <div>
                  <label htmlFor="business">Business</label>
                  <input
                    type="text"
                    id="business"
                    placeholder="Business Name"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="Description">Description</label>
                  <input
                    type="text"
                    id="Description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="logo">Logo</label>
                  <input
                    type="file"
                    id="logo"
                    onChange={(e) => handleUploadLogo(e)}
                  />
                  {loadingLogo ? (
                    <LoadingBox />
                  ) : errorLogo ? (
                    <MessageBox variant="danger">{errorLogo}</MessageBox>
                  ) : (
                    <img src={logo} alt={logo} className="logo" />
                  )}
                </div>
              </>
            )}
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

export default ProfileScreen;
