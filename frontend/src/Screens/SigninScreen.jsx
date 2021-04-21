import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, loading, error } = useSelector((state) => state.userSignin);
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
    dispatch(signin({ email, password }));
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Sign In</h1>
          <p>To test admin mode, use admin's count below:</p>
          <p>
            Email: <strong>test1234@hotmail.com</strong>{" "}
          </p>
          <p>
            Password: <strong>test1234</strong>
          </p>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
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
          <label />
          <button className="primary" type="submit">
            Sign in
          </button>
        </div>
        <div>
          <label />
          <div>
            New Customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
