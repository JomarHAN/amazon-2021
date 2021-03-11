import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import { useSelector } from "react-redux";
import SigninScreen from "./Screens/SigninScreen";

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/" className="brand">
              Amazon
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="bagde">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path='/signin' component={SigninScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
