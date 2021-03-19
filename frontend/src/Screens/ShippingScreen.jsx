import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../components/CheckoutStep";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen(props) {
  const { mapShippingAddress } = useSelector(
    (state) => state.userShippingAddress
  );
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [usState, setUsState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const { cartItems } = useSelector((state) => state.cart);
  if (cartItems.length === 0) {
    props.history.push("/cart");
  }

  useEffect(() => {
    if (mapShippingAddress) {
      setFullName(mapShippingAddress.user);
      setAddress(mapShippingAddress.address);
      setCity(mapShippingAddress.city);
      setUsState(mapShippingAddress.state);
      setZipcode(mapShippingAddress.postal_code);
    }
  }, [mapShippingAddress]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, usState, zipcode })
    );
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutStep step1 step2 />
      <form onSubmit={handleSubmit} className="form">
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="FullName">Full Name</label>
          <input
            type="text"
            id="FullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter Full Name"
            required
          />
        </div>
        <div>
          <label htmlFor="Address">Address</label>
          <input
            type="text"
            id="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Street/Apt/Suite"
            required
          />
        </div>
        <div>
          <label htmlFor="City">City</label>
          <input
            type="text"
            id="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City"
            required
          />
        </div>
        <div>
          <label htmlFor="usState">State</label>
          <input
            type="text"
            id="usState"
            value={usState}
            onChange={(e) => setUsState(e.target.value)}
            placeholder="Enter State"
            required
          />
        </div>
        <div>
          <label htmlFor="Zipcode">Zip Code</label>
          <input
            type="text"
            id="Zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            placeholder="Enter Zip Code"
            required
          />
        </div>
        <div>
          <label />
          <button
            type="button"
            className="block"
            onClick={() => props.history.push("/map")}
          >
            Choose on Map
          </button>
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Confirm Address
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingScreen;
