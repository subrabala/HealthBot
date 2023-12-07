import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentState } from "./Wrapper";
const Screen = ({ chatID }) => {
  const jwt = localStorage.getItem("chat");
  const [gptLogs, setGptLogs] = useState([]);
  const { currentState, setCurrentState } = useCurrentState();
  const [summary, setSummary] = useState();

  useEffect(() => {
    if (chatID !== null || currentState.currentConvo) {
      const getGptLogs = async () => {
        try {
          let apiUrl = `https://shivanshgoel.xyz/api/gpt_logs/get/`;
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
          const lastItem = response.data[response.data.length - 1];
          setSummary(lastItem ? lastItem.summary : null);
          setGptLogs(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      getGptLogs();
    }
  }, [chatID, currentState.currentConvo]);

  console.log(summary);

  return (
    <div className="h-100 flex flex-col w-full">
      <div className="flex-1 overflow-y-auto p-4">
        {gptLogs.map(
          (data, index) =>
            index !== gptLogs.length - 1 && (
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
            )
        )}
        {summary && (
          <div className="text-[#ffffffbb] py-4 p-4 bg-[#020C1B] rounded-md ">Summary :<br/> {summary} </div>
        )}
      </div>
    </div>
  );
};

export default Screen;
