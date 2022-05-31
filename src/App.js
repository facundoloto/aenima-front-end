import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home/Home";
import CatalogoForm from './components/catalagoForm/catalogoForm';
import Products from './components/Products/Products';
import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/agregar" element={<CatalogoForm />} />
        <Route exact path="/editar" element={<CatalogoForm />} />
        <Route exact path="/productos" element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
