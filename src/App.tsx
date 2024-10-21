import "./App.css";
import ProductDashboard from "./components/custom/ProductDetail";
import Home from "./components/custom/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/app/store";
import BubbleLoader from "./components/custom/Loader";

function App() {
  return (
    <Provider store={store}>
      <div className="font-sans">
        {
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<ProductDashboard />} />
              <Route path="/load" element={<BubbleLoader />} />
            </Routes>
          </BrowserRouter>
        }
      </div>
    </Provider>
  );
}

export default App;
