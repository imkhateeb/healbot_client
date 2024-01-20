import React, { useState } from 'react';
import { RiSendPlane2Fill } from "react-icons/ri";
import { runOpenAI } from '../../test/openai';
import saveInLocalStorage from '../../utils/saveInLocalStorage';
import { FaMicrophone } from "react-icons/fa";
import { CirclesWithBar } from 'react-loader-spinner';

function InputLayout({ loading, setLoading, setErrorHappened, setResponse }) {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  const handleAudioInput = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();

      recognition.lang = 'en-US';
      recognition.continuous = true;

      const startSpeechRecognition = () => {
        setListening(true);
        recognition.start();
        console.log('Speech recognition started.');
      };

      const stopSpeechRecognition = () => {
        recognition.stop();
        setListening(false);
        console.log('Speech recognition stopped.');
      };

      const listenForSpeech = () => {
        return new Promise((resolve, reject) => {
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            handleClick(transcript);
            resolve(transcript);
            setListening(false);
          };

          recognition.onerror = (event) => {
            setListening(false);
            if (event.error === 'no-speech') {
              console.log('No speech detected. Restarting recognition.');
              startSpeechRecognition();
            } else {
              console.error('Speech recognition error:', event.error);
              reject(event.error);
            }
          };


          startSpeechRecognition();

          setTimeout(() => {
            stopSpeechRecognition();
          }, 10000);
        });
      };

      listenForSpeech()
        .then((transcript) => {
          console.log('Speech recognized:', transcript);
          setText(transcript);
        })
        .catch((error) => {
          console.error('Error during speech recognition:', error);
        });

    } else {
      console.error('Speech recognition not supported in this browser.');
      setLoading(false);
    }
  };

  const handleClick = async (text) => {
    setResponse("");
    setLoading(true);

    try {
      const response = await runOpenAI(text);
      setResponse(response);
      setLoading(false);
      saveInLocalStorage(text, response);
    } catch (error) {
      console.error('Error:', error);
      setErrorHappened(true);
      setLoading(false);

      setTimeout(() => {
        setErrorHappened(false);
      }, 3000);
    }
  };

  return (
    <div className='flex gap-2'>
      {listening &&
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-opacity-30 bg-black flex items-center justify-center'>
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      }
      <input
        className='w-full rounded-md outline-none py-2 px-3 border-[1px] border-gray-300'
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {!text.length ? "" : <button
        type='button'
        className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-3'
        onClick={() => handleClick(text)}
        disabled={loading || !text}
      >
        <RiSendPlane2Fill />
      </button>}

      <button
        className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-3'
        onClick={handleAudioInput}
        type='button'
        disabled={loading}

      >
        <FaMicrophone
        />
      </button>

      {localStorage.getItem('chats') && (
        <button
          type='button'
          className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-3'
          onClick={() => {
            localStorage.removeItem('chats');
            window.location.reload();
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default InputLayout;
