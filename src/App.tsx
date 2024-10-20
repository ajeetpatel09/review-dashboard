import "./App.css";
import ProductDashboard from "./components/custom/ProductDetail";
import Home from "./components/custom/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="font-sans">
      {
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productId" element={<ProductDashboard />} />
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App;
