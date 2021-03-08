import "./App.css";
import Products from "./components/Products";
import data from './data'

function App() {

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a href="index.html" className="brand">
            Amazon
          </a>
        </div>
        <div>
          <a href="cart.html">Cart</a>
          <a href="signin.html">Sign In</a>
        </div>
      </header>
      <main>
        <div>
          <div className="row center">
            {data.products.map(product => (
              <Products key={product._id} product={product} />
            ))}

          </div>
        </div>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
