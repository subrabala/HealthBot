import React, { useRef, useEffect } from "react";

const Screen = ({ gptresponse, dummyResponse }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [dummyResponse]); 

  return (
    <div className="h-100 flex flex-col">
      {gptresponse.question === "" ? (
        ""
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          {dummyResponse.healthFAQs.map((data, index) => (
            <div key={index}>
              <div className="bg-[#ffffff1a] flex items-center gap-3 p-4 text-white">
                <img src="/public/userlogo.png" width={25} height={25} />
                <div className="text-[#ffffffbb]">{data.question}</div>
              </div>
              <div className="p-6 flex items-center gap-3">
                <img src="/public/chatlogo.png" width={25} height={25} />
                <div className="text-[#ffffffbb]">{data.response}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default Screen;
