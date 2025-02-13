import { useEffect, useState } from 'react'

import cuteGif1 from "./assets/1.gif"
import cuteGif2 from "./assets/2.gif"
import cuteGif3 from "./assets/3.gif"
import cuteGif4 from "./assets/4.gif"
import cuteGif5 from "./assets/5.gif"
import cuteGif6 from "./assets/6.gif"
import cuteGif7 from "./assets/7.gif"
import cuteGif8 from "./assets/8.gif"
import cuteGif9 from "./assets/9.gif"
import cuteGif10 from "./assets/10.gif"

import FallenHeart from './FallenHeart'

import axios from 'axios'


const SADGIFS = [cuteGif2, cuteGif9, cuteGif7, cuteGif3, cuteGif8]
const HAPPYGIFS = [cuteGif1, cuteGif4, cuteGif5]
const QUESTIONS = [
  // "No",
  "Will you be my valentine ^^",
  "Are you sure :<",
  "Really huh??",
  "Think again, please...",
  "If you say no, I will be really sad :(",
  "Ok. Goodbye..."
]

const App = () => {

  
  const [username, setUsername] = useState("");
  const [count, setCount] = useState(0);
  const [curGif, setCurGif] = useState(cuteGif6);
  const [question, setQuestion] = useState(QUESTIONS[0]);


  const [yesClicked, setYesClicked] = useState(false);
  const [usernameConfirm, setUsernameConfirm] = useState(false);

  console.log(curGif)
  useEffect(() => {
    if(count != 0) {
      setCurGif(SADGIFS[count]);
      setQuestion(QUESTIONS[count]);
    }

    if(count >= SADGIFS.length) {
      handleSubmit(username, "No");
    }
    
  }, [count])

  const handleYesClick = () => {
    setYesClicked(clicked => !clicked);
    setCurGif(HAPPYGIFS[Math.floor(Math.random() * (HAPPYGIFS.length))])
    handleSubmit(username, "Yes");
    // setUsername("")
  }

  const handleNoClick = () => {
    setCount(prevCount => prevCount + 1)
    if(count >= SADGIFS.length) {
      handleSubmit(username, "No");
    }
  }
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    console.log(e.target.value)
  }

  const handleUsernameConfirm = () => {
    if(username) {
      setUsernameConfirm(true);
    }
  }

  const handleSubmit = (username, choice) => {
    const url = "https://script.google.com/macros/s/AKfycbyJMTdjVNgAte7DcJtDWgG3geT0XBHUDbCcYLfsEauZPFwvob5_KE2QUMouZ2Cgwjkv/exec"
    fetch(url,{
      method:"POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:(`Username=${username}&Choice=${choice}`)
    }).then(res=>res.text()).then(data=>{
      alert(data)
    }).catch(error=>console.log(error))
  }
  
  return (
    
    <div className='h-screen overflow-hidden inset-0 flex items-center justify-center bg-linear-to-b from-yellow-100 to-pink-300 over'>
      {!usernameConfirm ? 
      (<div className='font-[Rochester]  text-purple-700 flex items-center'>
        
        <input
          className='pl-2 pr-8 py-2 bg-gray-100 text-2xl outline-none focus:ring-2 focus:ring-purple-700 mr-2'
          type='text' 
          placeholder='Your username...' 
          // value={username}
          onChange={handleUsernameChange}
        />
        <button 
          type='button'
          className='bg-purple-700 text-gray-100 px-6 py-2 text-lg'
          onClick={handleUsernameConfirm}
        >
          Enter 
        </button>
      </div>)
      :
      (<div>
        {yesClicked && <FallenHeart />}
        <div className='absolute top-2 right-5 font-[Rochester] text-2xl text-purple-700 underline'>{username}</div>
        <img src={count < SADGIFS.length ? curGif : cuteGif10} alt="" className='w-96 mb-6 mx-auto'/>
        <h1 className='text-6xl text-center mb-6 text-purple-500 font-[Rochester] font-bold'>
          {yesClicked ? "Awwww. Love you so muchhhh 💖" : question}
          
        </h1>
        {yesClicked && <p className='text-3xl text-center mb-6 text-purple-500 font-[Rochester] font-bold'>Let's go on a date</p>}
        {(!yesClicked && count < SADGIFS.length) && <div className='m-auto w-fit'>
            <button 
              className={`px-10 py-4 rounded-lg text-gray-100 font-[Darumadrop_One] text-[${18 * (count + 1)}px] bg-green-500 mr-4`} 
              style={{fontSize: `${18 * (count + 1)}px`}}
              onClick={handleYesClick}
              >
                <span>yes</span>
            </button>
            <button 
              className={`px-10 py-4 rounded-lg text-gray-100 font-[Darumadrop_One] text-lg bg-red-500 shrink-0`}
              style={{fontSize: `${18 - (count * 2)}px`}}
              onClick={handleNoClick} 
            >
                No
            </button>
          </div>
        }
      </div>)
      }
    </div>
  )
}

export default App