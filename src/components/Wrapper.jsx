import React, { useState, createContext, useContext } from "react";
import Dashboard from "../components/Dashboard";
import ChatHistory from "../components/ChatHistory";

const CurrentStateContext = createContext();

const Wrapper = () => {
  const [flow, setFlow] = useState(true);
  const [currentState, setCurrentState] = useState({
    chatID: null,
    currentConvo: null,
  });

  return (
    <CurrentStateContext.Provider value={{ currentState, setCurrentState }}>
      <div className="h-screen bg-[#0f1b38] flex">
        <div className="w-1/5 p-4 bg-[#060f23] rounded-md">
          <ChatHistory flow={flow} setFlow={setFlow} />
        </div>
        <div className="w-4/5 p-4">
          <Dashboard flow={flow} />
        </div>
      </div>
    </CurrentStateContext.Provider>
  );
};

export const useCurrentState = () => {
  return useContext(CurrentStateContext);
};

export default Wrapper;
