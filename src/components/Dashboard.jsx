import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Screen from "./Screen";
import FlowChatScreen from "./FlowChatScreen";
import axios from "axios";
import { useCurrentState } from "./Wrapper";

const Dashboard = ({ flow }) => {
  const { currentState, setCurrentState } = useCurrentState();
  const jwt = localStorage.getItem("chat");
  const [prompt, setPrompt] = useState("");

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  // GPT Response
  const generatePrompt = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        query: prompt,
      };
      if (currentState.chatID !== null) {
        requestBody.chat_session_id = currentState.chatID;
      }
      const response = await axios.post(
        "https://shivanshgoel.xyz/api/gpt_response",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setPrompt("");

      if (response.data.chat_session_id !== null) {
        setCurrentState({
          ...currentState,
          chatID: response.data.chat_session_id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#0f1b38] container-fluid w-full h-full">
      <div className="w-[90%] h-5/6 flex mx-auto">
        {flow ? (
          <FlowChatScreen />
        ) : (
          <Screen chatID={currentState.chatID} prompt={prompt} />
        )}
      </div>
      <div className="h-1/6 flex items-center">
        {flow ? (
          ""
        ) : (
          <form
            className="rounded-xl flex w-full border-white p-1 bg-[#020C1B]"
            onSubmit={(e) => generatePrompt(e)}
          >
            <Input
              placeholder="Send a message"
              value={prompt}
              onChange={handlePrompt}
              className="border-none text-white"
            />
            <IconButton type="submit" className="rounded-full bg-transparent">
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ color: "#ffffff" }}
              />
            </IconButton>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
