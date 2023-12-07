import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import timestamp from "../utils/timeStamp";
import { useCurrentState } from "./Wrapper";
import { Tooltip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const ChatHistory = ({ setFlow, flow }) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const jwt = localStorage.getItem("chat");
  const [gptHistory, setgptHistory] = useState(null);
  const [flowLogs, setFlowLogs] = useState(null);
  const { currentState, setCurrentState } = useCurrentState();
  const [refresh, setRefresh] = useState(0);
  const [selectedFlowIndex, setSelectedFlowIndex] = useState(null);
  const handleDeleteJournal = async (id) => {
    try {
      setFlowLogs((prevHistory) =>
        prevHistory.filter((item) => item.journal_id !== id)
      );
      const response = await axios.delete(
        `https://shivanshgoel.xyz/api/journal/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log(flowLogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePrompt = async (id) => {
    try {
      setgptHistory((prevHistory) =>
        prevHistory.filter((item) => item.chat_session_id !== id)
      );
      console.log(gptHistory);
      const response = await axios.delete(
        `https://shivanshgoel.xyz/api/gpt_logs/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    const handleGetGptLogs = async () => {
      try {
        const response = await axios.get(
          `https://shivanshgoel.xyz/api/gpt_logs/get`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setgptHistory(response.data);
      } catch (err) {}
    };

    const handleGetFlowLogs = async () => {
      try {
        const response = await axios.get(
          `https://shivanshgoel.xyz/api/journal/get`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setFlowLogs(response.data);
      } catch (err) {}
    };

    handleGetGptLogs();
    handleGetFlowLogs();
  }, [flow, refresh]);

  const handleSetCurrentFlow = (journalId) => {
    setCurrentState({ ...currentState, currentConvo: journalId });
  };

  const handleSetCurrentChat = (chatSessionId) => {
    setCurrentState({ ...currentState, currentConvo: chatSessionId });
  };

  const handleNewChat = () => {
    // window.location.reload();
    navigate("/chat");
  };

  return (
    <div className="h-full flex flex-col items-stretch gap-4">
      <div className="flex  items-center justify-between text-blue-gray-400 font-semibold">
        <div> Chat History </div>
        <button
          className="p-2 border rounded-md text-white border-white"
          onClick={() => handleNewChat()}
        >
          + New Chat
        </button>
        <Tooltip content="sync" placement="right-end">
          <button onClick={() => setRefresh(1)}>
            <MdRefresh />
          </button>
        </Tooltip>
      </div>
      <div
        className="chat-history h-5/6"
        style={{
          maxHeight: "420px",
          overflowY: "auto",
        }}
      >
        {flow && flowLogs
          ? flowLogs.map((item, index) => (
              <div
                className="flex items-center p-3 mt-2 rounded-lg overflow-y-auto"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background:
                    hoveredIndex === index
                      ? "#30434d"
                      : selectedFlowIndex === index
                      ? "#30434d"
                      : "transparent",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => {
                  setSelectedFlowIndex(index);
                  handleSetCurrentFlow(item.journal_id);
                }}
              >
                <FontAwesomeIcon icon={faFolder} className="text-white mr-4" />
                <div className="text-[#e8eef1] text-sm overflow-hidden whitespace-nowrap flex items-center">
                  <div className="w-full overflow-hidden">
                    {timestamp(item.answered_at)}
                  </div>
                  {hoveredIndex === index && (
                    <button
                      onClick={() => handleDeleteJournal(item.journal_id)}
                      className="ml-2 text-red-500"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  )}
                </div>
              </div>
            ))
          : gptHistory?.map((item, index) => (
              <div
                className="flex items-center p-3 mt-2 rounded-lg overflow-y-auto"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background:
                    hoveredIndex === index
                      ? "#30434d"
                      : selectedFlowIndex === index
                      ? "#30434d"
                      : "transparent",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => {
                  setSelectedFlowIndex(index);
                  handleSetCurrentChat(item.chat_session_id);
                }}
              >
                <FontAwesomeIcon icon={faFolder} className="text-white mr-4" />
                <div className="text-[#e8eef1] text-sm overflow-hidden whitespace-nowrap flex items-center">
                  <div className="w-full overflow-hidden">
                    {timestamp(item.asked_at)}
                  </div>
                  {hoveredIndex === index && (
                    <button
                      onClick={() => handleDeletePrompt(item.chat_session_id)}
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
          className={`py-2 rounded-md bg-[#27324C] text-white w-full ${
            flow ? "bg-blue-gray-600" : ""
          }`}
          onClick={() => {
            setFlow(true);
          }}
        >
          Flow
        </button>
        <button
          className={`py-2 rounded-md bg-[#27324C] text-white w-full ${
            !flow ? "bg-blue-gray-600" : ""
          }`}
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
