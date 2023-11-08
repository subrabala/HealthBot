import React, { useEffect, useState } from "react";
import axios from "axios";
import FlowChat from "../DummyJSON/FlowChat.json";

const FlowChatScreen = () => {
  const [answerOptions, setAnswerOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   "http://64.227.134.14/get_question/en/c8951605-3904-494f-a2a9-ce651dfb211b"
        // );
        // setAnswerOptions(response.data.answer_options);
        setAnswerOptions(FlowChat.answer_options);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAnswerClick = async (id) => {
    const response = await axios.post(`http://64.227.134.14/get_question/en`, {
      answer_id: id,
    });
    setAnswerOptions(response.data.answer_options);
  };
  return (
    <div className="h-100 flex flex-col">
      {FlowChat.question === "" ? (
        ""
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-white text-xl p-2">
            {FlowChat.question.expression}
          </div>
          {answerOptions.map((answer) => (
            <button
              key={answer.id}
              className="bg-transparent rounded-lg border hover:bg-[#2a457e] border-gray-500 text-white p-2 m-2"
              onClick={() => handleAnswerClick(answer.id)}
            >
              {answer.expression}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlowChatScreen;
