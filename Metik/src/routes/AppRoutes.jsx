import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Product from "../pages/Product";
import Contact from "../pages/Contact";
import Editor from "../pages/Editor";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/editor" element={<Editor />} />

        <Route path="/gioi-thieu" element={<About />} />

        <Route path="/san-pham" element={<Product />} />

        <Route path="/lien-he" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
