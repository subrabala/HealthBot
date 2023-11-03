import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import ChatHistory from "../components/ChatHistory";

const Wrapper = () => {
  const [flow, setFlow] = useState(true);

  return (
    <div className="h-screen bg-[#0f1b38] flex">
      <div className="w-1/5 p-4 bg-[#060f23] rounded-md">
        <ChatHistory setFlow={setFlow}/>
      </div>
      <div className="w-4/5 p-4">
        <Dashboard flow={flow} />
      </div>
    </div>
  );
};

export default Wrapper;
