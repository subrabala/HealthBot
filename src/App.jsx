import React from "react";
import { BrowserRouter, Routes , Route} from "react-router-dom";
import "../src/App.css";
import Login from "./components/Login";
import Wrapper from "./components/Wrapper";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/chat" element={<Wrapper/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
