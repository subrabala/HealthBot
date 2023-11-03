import React, { useState } from "react";
import history from "../DummyJSON/ChatHistory.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";

const ChatHistory = ({ setFlow }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="h-100 flex flex-col items-stretch gap-4">
      <div className="text-blue-gray-400 font-semibold">Chat History</div>

      <div
        className="chat-history h-5/6"
        style={{
          maxHeight: "420px",
          overflowY: "auto",
        }}
      >
        {history.prompts.map((prompt, index) => (
          <div
            className="flex items-center p-3 mt-2 rounded-lg overflow-y-auto"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              background: hoveredIndex === index ? "#30434d" : "transparent",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faFolder} className="text-white mr-4" />
            <div
              key={index}
              className="text-[#e8eef1] text-sm overflow-hidden whitespace-nowrap"
            >
              <div className="w-full overflow-hidden">{prompt.heading}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2 border rounded-lg flex gap-2 mt-auto">
        <button
          className="py-2 rounded-md bg-[#27324C] text-white w-full"
          onClick={() => {
            setFlow(true);
          }}
        >
          Flow
        </button>
        <button
          className="py-2 rounded-md bg-[#27324C] text-white w-full"
          onClick={() => {
            setFlow(false);
          }}
        >
          GPT
        </button>
      </div>
    </div>
  );
};

export default ChatHistory;
