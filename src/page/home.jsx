import React, { useState } from 'react';
import { runOpenAI } from '../test/openai';
import { ChatLayout, InputLayout } from '../components';

function Home() {

  const [loading, setLoading] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const [response, setResponse] = useState(null);

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  const changeSpeed = (rate) => {
    if (message) {
      message.rate = rate;
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-green-100'>
      {/* {errorHappened && <div className='text-red-500'>Error!</div>}
      {window.speechSynthesis.speaking && (
        <div>
          <button type='button' onClick={stopSpeech}>STOP</button>
          <button type='button' onClick={() => changeSpeed(1.5)}>1.5x</button>
        </div>
      )}
      <div>
        <input onChange={(e) => setText(e.target.value)} />
        <button
          type='button'
          onClick={handleClick}
        >Submit</button>
      </div>
      {loading && <div>Loading...</div>}
      {response && <div>{response}</div>} */}
      
       <div className='absolute max-h-[85vh] bottom-8 top-4 gap-3 w-2/3 max-md:w-5/6 max-sm:w-11/12 overflow-y-auto custom-scrollbar-container'>
        <ChatLayout 
          loading={loading}
          errorHappened={errorHappened}
          response={response}
        />
      </div>

      <div className='absolute bottom-4 gap-3 w-2/3 max-md:w-5/6 max-sm:w-11/12'>
        <InputLayout
          loading={loading}
          setLoading={setLoading}
          errorHappened={errorHappened}
          setErrorHappened={setErrorHappened}
          setResponse={setResponse}
        />
      </div>
    </div>
  );
}

export default Home