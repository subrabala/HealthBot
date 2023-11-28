import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/App.css";
import Login from "./components/Login";
import Wrapper from "./components/Wrapper";
import FlowChatScreen from "./components/FlowChatScreen";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="chat" element={<Wrapper />}>
          <Route path="journal" element={<FlowChatScreen />} />
          <Route path="gpt" element={<Screen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
