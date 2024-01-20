import React, { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";

const ChatLayout = ({ loading, errorHappened }) => {
  const [chatData, setChatData] = useState(null);
  const [speaking, setSpeaking] = useState(false);

  const handleSpeaking = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
  };

  useEffect(() => {
    const fetchData = () => {
      const chatsArray = !localStorage.getItem('chats') ? [] : JSON.parse(localStorage.getItem('chats'));
      setChatData(chatsArray);
    };

    // Initial fetch
    fetchData();

    // Event listener for localStorage changes
    const handleStorageChange = () => {
      fetchData();
    };

    // Attach the event listener
    window.addEventListener('storage', handleStorageChange);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

  }, []);

  if (!chatData) {
    return <p>No messages available.</p>;
  }

  return (
    <div className="space-y-4">
      {!chatData.length 
      ? 
      <div className='text-gray-800 bg-slate-200 p-2 rounded-md text-center'>Hey user! As your personal healthcare assistant how can we assist you today?</div>
      :
       chatData.map(({ text, response, index }) => (
        <div key={index} className="flex flex-col">
          <div className="flex justify-between items-center bg-slate-200 p-2">
            <p className='text-gray-800'>{text}</p>

            <div
              onClick={() => {
                setSpeaking(!speaking)
              }}
              className='cursor-pointer mr-2'
            >{!speaking ?
              <FaPlay
                color='green'
                onClick={() => {
                  handleSpeaking(response)
                }}
              />
              :
              <IoMdPause
                color='green'
                onClick={() => {
                  window.speechSynthesis.cancel()
                }}
              />}</div>
          </div>
          <p className="text-gray-600 italic bg-slate-100 p-2">{response}</p>
        </div>
      ))}

      {loading &&
        <div className='fixed top-0 right-0 left-0 bottom-0 bg-opacity-50 bg-black flex justify-center items-center'>
          <Circles
            height="40"
            width="40"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      }
    </div>
  );
};

export default ChatLayout;
