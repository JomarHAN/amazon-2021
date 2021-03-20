import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./Screens/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentMethod from "./Screens/PaymentMethod";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import OrderListScreen from "./Screens/OrderListScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./Screens/SellerScreen";
import SearchBox from "./components/SearchBox";
import SearchResultScreen from "./Screens/SearchResultScreen";
import { useEffect } from "react";
import axios from "axios";
import { PRODUCT_FIELDS_LIST } from "./constanst/productConstants";
import MapScreen from "./Screens/MapScreen";
import DraftEditScreen from "./Screens/DraftEditScreen";
import DraftPreviewScreen from "./Screens/DraftPreviewScreen";
import DraftListScreen from "./Screens/DraftListScreen";

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);

  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(signout());
  };
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/fields");
      dispatch({ type: PRODUCT_FIELDS_LIST, payload: data });
    };
    fetchData();
  }, [dispatch]);
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/" className="brand">
              <img
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt=""
              />
            </Link>
          </div>
          <div style={{ flex: 1 }}>
            <Route render={(props) => <SearchBox {...props} />} />
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="bagde">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={handleSignout}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo?.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  {/* <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li> */}
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/draftslist">Drafts</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo?.isSeller && (
              <div className="dropdown">
                <Link to="#seller">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                  <li>
                    <Link to="/draftslist/seller">Drafts</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Route
            path="/search/fields/:fields"
            component={SearchResultScreen}
            exact
          />
          <Route
            path="/search/fields/:fields/name/:name?"
            component={SearchResultScreen}
            exact
          />
          <Route
            path="/search/fields/:fields/name/:name/category/:category/min/:min/max/:max/rating/:rating/order/:order"
            component={SearchResultScreen}
            exact
          />
          <Route path="/seller/:id" component={SellerScreen} />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentMethod} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} />
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          />
          <SellerRoute path="/orderlist/seller" component={OrderListScreen} />
          <SellerRoute path="/draftslist/seller" component={DraftListScreen} />
          <SellerRoute
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          />
          <SellerRoute path="/draft/:id" component={DraftEditScreen} exact />
          <SellerRoute path="/preview/:id" component={DraftPreviewScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} exact />
          <PrivateRoute path="/map" component={MapScreen} />
          <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
          <AdminRoute path="/productlist" component={ProductListScreen} exact />
          <AdminRoute path="/orderlist" component={OrderListScreen} exact />
          <AdminRoute path="/userlist" component={UserListScreen} />
          <AdminRoute path="/draftslist" component={DraftListScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
