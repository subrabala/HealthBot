import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentState } from "./Wrapper";
const Screen = ({ chatID }) => {
  const jwt = localStorage.getItem("chat");
  const [gptLogs, setGptLogs] = useState([]);
  const { currentState, setCurrentState } = useCurrentState();

  useEffect(() => {
    if (chatID !== null || currentState.currentConvo) {
      const getGptLogs = async () => {
        try {
          let apiUrl = `http://64.227.134.14/api/gpt_logs/get/`;
          if (currentState.currentConvo) {
            apiUrl += currentState.currentConvo;
          } else if (chatID) {
            apiUrl += chatID;
          }
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });

          console.log(response.data);
          setGptLogs(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      getGptLogs();
    }
  }, [chatID, currentState.currentConvo]);

  return (
    <div className="h-100 flex flex-col w-full">
      <div className="flex-1 overflow-y-auto p-4">
        {gptLogs.map((data, index) => (
          <div key={index}>
            <div className="bg-[#ffffff1a] flex items-center gap-3 p-4 text-white">
              <img src="/userlogo.png" width={25} height={25} />
              <div className="text-[#ffffffbb]">{data.query}</div>
            </div>
            <div className="p-6 flex items-center gap-3">
              <img src="/chatlogo.png" width={25} height={25} />
              <div className="text-[#ffffffbb]">{data.response}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screen;
