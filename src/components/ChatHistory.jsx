import React, { useState } from "react";
import history from "../DummyJSON/ChatHistory.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

const ChatHistory = ({ setFlow, flow , setGptLogs}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDeleteJournal = async (id) => {
    try {
      const response = await axios.delete(
        `http://64.227.134.14/api/journal/delete/${id}`
      );
    } catch (error) {}
  };

  const handleDeletePrompt = async (id) => {
    try {
      const response = await axios.delete(
        `http://64.227.134.14/api/journal/delete/${id}`
      );
    } catch (error) {}
  };

  const handleGetChatLogs = async (id) => {
    try {
      const response = await axios.get(
        `http://64.227.134.14/api/gpt_logs/get/${id}`
      );
      setGptLogs(response);
    } catch (err) {}
  };
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
        {flow
          ? history.prompts.map((journal, index) => (
              <div
                className="flex items-center p-3 mt-2 rounded-lg overflow-y-auto"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background:
                    hoveredIndex === index ? "#30434d" : "transparent",
                  cursor: "pointer",
                }}
                key={index}
              >
                <FontAwesomeIcon icon={faFolder} className="text-white mr-4" />
                <div className="text-[#e8eef1] text-sm overflow-hidden whitespace-nowrap flex items-center">
                  <div className="w-full overflow-hidden">
                    {journal.heading}
                  </div>
                  {hoveredIndex === index && (
                    <button
                      onClick={() => handleDeleteJournal(journal.id)}
                      className="ml-2 text-red-500"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  )}
                </div>
              </div>
            ))
          : history.prompts.map((prompt, index) => (
              <div
                className="flex items-center p-3 mt-2 rounded-lg overflow-y-auto"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background:
                    hoveredIndex === index ? "#30434d" : "transparent",
                  cursor: "pointer",
                }}
                key={index}
              >
                <FontAwesomeIcon icon={faFolder} className="text-white mr-4" />
                <div className="text-[#e8eef1] text-sm overflow-hidden whitespace-nowrap flex items-center">
                  <div className="w-full overflow-hidden">{prompt.heading}</div>
                  {hoveredIndex === index && (
                    <button
                      onClick={() => handleDeletePrompt(prompt.id)}
                      className="ml-2 text-red-500"
                    >
                      Delete
                    </button>
                  )}
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
