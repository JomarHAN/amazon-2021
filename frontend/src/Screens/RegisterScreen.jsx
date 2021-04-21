import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function RegisterScreen(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo, loading, error } = useSelector((state) => state.userSignin);
  const { loading: loadingRegister, error: errorRegister } = useSelector(
    (state) => state.userRegister
  );
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "";
  useEffect(() => {
    if (userInfo) {
      props.history.push(`/${redirect}`);
    }
  }, [userInfo, props, redirect]);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, confirmPassword }));
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Register</h1>
        </div>
        {loading && <LoadingBox />}
        {loadingRegister && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {errorRegister && (
          <MessageBox variant="danger">{errorRegister}</MessageBox>
        )}
        <div>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            id="Name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="ConfirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already registered?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterScreen;
