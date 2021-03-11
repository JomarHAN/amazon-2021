import React, { useState } from "react";
import { Link } from "react-router-dom";

function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {};
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Sign In</h1>
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
          <label />
          <button className="primary" type="submit">
            Sign in
          </button>
        </div>
        <div>
          <label />
          <div>
            New Customer? <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
