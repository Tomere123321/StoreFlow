import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";
import CustomersPage from "./Pages/CustomersPage";
import PurchasesPage from "./Pages/PurchasesPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/purchases" element={<PurchasesPage />} />
      </Routes>
    </div>
  );
}

export default App;
