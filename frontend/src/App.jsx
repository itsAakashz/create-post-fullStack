import React from "react";
import Heading from "./components/heading.jsx";
import Footer from "./components/footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/Create.jsx";
import Read from "./components/Read.jsx";
import Update from "./components/Update.jsx";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Heading />
        <Routes>
          <Route exact path="/" element={<Create />} /> 
          <Route exact path="/all" element={<Read />} />
          <Route exact path="/:id" element={<Update />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
