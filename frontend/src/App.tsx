/// <reference types="vite-plugin-svgr/client" />

import "./App.scss";

import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Navbar />
        </header>
        <section className="mainSection">
          <Routes>
            <>
              <Route path="/" element={<Home />} />
            </>
          </Routes>
        </section>
      </Router>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
