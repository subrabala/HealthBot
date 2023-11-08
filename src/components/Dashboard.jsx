import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import Screen from "./Screen";
import randomAnswers from "../DummyJSON/Answers.json";
import dummyResponse from "../DummyJSON/GeneratedPrompts.json";
import FlowChatScreen from "./FlowChatScreen";
import axios from "axios";

const Dashboard = ({ flow }) => {
  const [prompt, setPrompt] = useState("");
  const [gptResponse, setGptResponse] = useState("");

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  // GPT Response
  const generatePrompt = async () => {
    try {
      const response = await axios.post("http://64.227.134.14/api", {
        query: prompt,
      });
      setGptResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-[#0f1b38] container-fluid w-full h-full">
      <div className="w-[90%] h-5/6 flex mx-auto">
        {flow ? <FlowChatScreen /> : <Screen gptresponse={gptResponse} />}
      </div>
      <div className="h-1/6 flex items-center">
        {flow ? (
          ""
        ) : (
          <div className="rounded-xl flex w-full border-white p-1 bg-[#020C1B]">
            <Input
              placeholder="Send a message"
              value={prompt}
              onChange={handlePrompt}
              className="border-none text-white"
            />
            <IconButton
              onClick={() => generatePrompt()}
              className="rounded-full bg-transparent"
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ color: "#ffffff" }}
              />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
