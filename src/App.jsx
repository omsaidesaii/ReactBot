import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { GoogleGenAI } from "@google/genai";
import { BeatLoader } from 'react-spinners';
import Markdown from 'react-markdown';
import { Notebook, PencilLine, ScrollText, SquareDashedBottomCode } from 'lucide-react';

const App = () => {

  const [screen, setscreen] = useState(1)

  const [prompt, setprompt] = useState("")

  const [loading, setloading] = useState(false)

  const ai = new GoogleGenAI({apiKey:import.meta.env.VITE_GEMINI_API_KEY});

  let messages=[]

  const [data, setdata] = useState(messages)

  async function getResponse(inputPrompt) {
    const query = inputPrompt !== undefined ? inputPrompt : prompt;
    if(query === ""){
      alert("Please enter a prompt")
      return
    }
    setdata(prevdata=>[...prevdata,{role:"user",content:query}])
    setscreen(2)
    setloading(true)
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
    });
    setdata(prevdata=>[...prevdata,{role:"ai",content:response.text}])
    setprompt("")
    setloading(false)
  }

  function handleCardClick(text) {
    setprompt(text);
    getResponse(text);
  }

  return (
    <div>
      <Navbar/>

    <div className="screens">
      {
        screen===1 ?
       <div className="screen-1 w-screen h-[70vh] px-[150px] flex items-center justify-center flex-col">
      <h3 className="!text-[40px] font-[700]">React<span className='text-slate-400'>Bot</span> </h3>
      <div className="flex mt-5 items-center gap-[15px]">
        <div className="card w-[200px] h-[fit] cursor-pointer transition-all hover:bg-[#353535] bg-[#303030] rounded-lg p-[15px]"
          onClick={() => handleCardClick("Create a website using htm, css and javascript")}
        >
          <i className='text-[30px]'><SquareDashedBottomCode /></i>
          <p className='mt-3'>Create a website using html, css and javascript</p>
        </div>
        <div className="card w-[200px] h-[fit] cursor-pointer transition-all hover:bg-[#353535] bg-[#303030] rounded-lg p-[15px]"
          onClick={() => handleCardClick("Write a book for me. topic is coding.")}
        >
          <i className='text-[30px]'><Notebook /></i>
          <p className='mt-3'>Write a book for me. topic is coding.</p>
        </div>
        <div className="card w-[200px] h-[fit] cursor-pointer transition-all hover:bg-[#353535] bg-[#303030] rounded-lg p-[15px]"
          onClick={() => handleCardClick("Tell me a commedy story.")}
        >
          <i className='text-[30px]'><ScrollText /></i>
          <p className='mt-3'>Tell me a commedy story.</p>
        </div>
        <div className="card w-[200px] h-[fit] cursor-pointer transition-all hover:bg-[#353535] bg-[#303030] rounded-lg p-[15px]"
          onClick={() => handleCardClick("Create a blog for me topic is web dev.")}
        >
          <i className='text-[30px]'><PencilLine /></i>
          <p className='mt-3'>Create a blog for me topic is web dev.</p>
        </div>
      </div>
      </div>:<>
      <div className="screen-2 overflow-y-auto w-screen h-[65vh] px-[150px]">
          {
            data ? data.map((item,index)=>{
              return(
                <React.Fragment key={index}>
                  {
                    item.role==="user"?
                    <div className='user bg-[#2e2e2e] w-fit max-w-[40vw] mb-5 ml-auto p-[15px] rounded-lg'>
                      <p className='text-[14px] text-gray-500'>User</p>
                      <p>{item.content}</p>
                    </div>:
                    <div className='ai bg-[#2e2e2e] w-fit max-w-[40vw] mb-5 mr-auto p-[15px] rounded-lg'>
                      <p className='text-[14px] text-gray-500'>Bot</p>
                       <Markdown>
                         {item.content}
                       </Markdown>
                    </div>
                    
                  }
                 
                </React.Fragment>
              )
            }): "No messages yet"
          }
          {
            loading?
            <div className="loader">
             <BeatLoader color="#ffffff" />
            </div>:""
          }
      </div>
       </>
      }
    </div>
<div className="inputBox px-[150px] h-[15vh] pt-3">
    <div className="input w-[90%] bg-[#303030] rounded-full mx-auto flex items-center gap-[10px] ">
      <input onKeyDown={(e)=>{
        if(e.key === "Enter"){
          getResponse()
        }
      }} onChange={(e)=>{setprompt(e.target.value)}} value={prompt} type="text" placeholder='Ask anything' className='flex-1 bg-transparent outline-none text-[18px] font-[400] p-[15px] mx-2 ' />
    </div>
    <p className='text-white text-center mt-3 text-[10px]'>ReactBot can make mistakes! cross check it.</p>
</div>

    </div>
  )
}

export default App