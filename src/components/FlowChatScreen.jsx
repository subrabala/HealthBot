import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentState } from "./Wrapper";

const FlowChatScreen = () => {
  const [primary, setPrimary] = useState({
    question: "",
    answers: [],
  });
  const [current, setCurrent] = useState({
    question: "",
    answers: [],
  });
  const [journalID, setJournalID] = useState(null);
  const [journalData, setJournalData] = useState(null);
  const [suggestedAction, setSuggestedAction] = useState(null);

  const { currentState, setCurrentState } = useCurrentState();
  const jwt = localStorage.getItem("chat");

  useEffect(() => {
    const fetchPrimaryQuestion = async () => {
      try {
        const response = await axios.get(
          "http://64.227.134.14/api/get_question/en/c8951605-3904-494f-a2a9-ce651dfb211b/",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const primaryData = {
          question: response.data.question.expression,
          answers: response.data.answer_options,
        };
        setJournalID(response.data.journal_id);
        setPrimary(primaryData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrimaryQuestion();
  }, []);

  useEffect(() => {
    if (currentState.currentConvo || current) {
      const handleJournalData = async () => {
        try {
          const response = await axios.get(
            `http://64.227.134.14/api/journal/get/${
              currentState.currentConvo || current
            }`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          console.log(response.data);
          setJournalData(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      handleJournalData();
    }
  }, [currentState.currentConvo, current]);

  const handleAnswerClick = async (id, action) => {
    const response = await axios.post(
      `http://64.227.134.14/api/get_question/en`,
      {
        answer_id: id,
        journal_id: journalID,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    setSuggestedAction(action);
    setCurrent({});
    const currentData = {
      question: response.data.question.expression,
      answers: response.data.answer_options,
    };
    setCurrent(currentData);
    console.log(currentData);
  };

  return (
    <div className="h-100 flex flex-col w-full">
      <div className="flex-1 overflow-y-auto p-4 entire_screen">
        {!journalData && (
          <>
            <div className="text-white text-xl p-2"> {primary.question}</div>
            {primary.answers.map((answer) => (
              <button
                key={answer.id}
                className="bg-transparent rounded-lg border hover:bg-[#2a457e] border-gray-500 text-white p-2 m-2"
                onClick={() => handleAnswerClick(answer.id)}
              >
                {answer.expression}
              </button>
            ))}
          </>
        )}
        {journalData &&
          journalData.map((journal) => (
            <>
              <div className="text-white text-xl p-2">
                {journal.question_expression}
              </div>
              <button
                key={journal.id}
                className="bg-transparent rounded-lg border hover:bg-[#2a457e] border-gray-500 text-white p-2 m-2"
              >
                {journal.answer_expression}
              </button>
            </>
          ))}
        <div className="text-white text-xl p-2"> {current.question}</div>
        {suggestedAction ? (
          <div className="bg-transparent rounded-lg border  border-gray-500 text-white p-2 m-2">
            {suggestedAction}
          </div>
        ) : (
          current.answers.map((answer) => (
            <button
              key={answer.id}
              className="bg-transparent rounded-lg border hover:bg-[#2a457e] border-gray-500 text-white p-2 m-2"
              onClick={() =>
                handleAnswerClick(answer.id, answer.suggested_action)
              }
            >
              {answer.expression}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default FlowChatScreen;
