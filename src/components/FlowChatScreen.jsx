import React, { useRef, useEffect, useState } from "react";
import FlowChat from "../DummyJSON/FlowChat.json";

const FlowChatScreen = () => {
  const handleAnswerClick = () => {
    console.log(1);
  };

  return (
    <div className="h-100 flex flex-col">
      {FlowChat.question === "" ? (
        ""
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-white text-xl p-2">{FlowChat.question}</div>
          {FlowChat.answers.map((answer) => (
            <button
              key={answer.id}
              className="bg-transparent rounded-lg border hove hover:bg-[#2a457e] border-gray-500 text-white p-2 m-2 "
              onClick={() => handleAnswerClick(answer.id)}
            >
              {answer.answer}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlowChatScreen;
