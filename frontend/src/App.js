import "./App.css";
import Products from "./components/Products";
import data from './data'
import {
  BrowserRouter as Router, Link, Route
} from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";

function App() {

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
            <Link to="/cart">Cart</Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
