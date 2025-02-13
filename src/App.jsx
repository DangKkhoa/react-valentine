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
import { p } from 'motion/react-client'

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

  useEffect(() => {
    
    document.title = "Will you be my valentine ^^"
  }, [])

  const [count, setCount] = useState(0);
  const [curGif, setCurGif] = useState(cuteGif6);
  const [question, setQuestion] = useState(QUESTIONS[0]);

  const [yesClicked, setYesClicked] = useState(false);

  console.log(curGif)
  useEffect(() => {
    if(count != 0) {
      setCurGif(SADGIFS[count]);
      setQuestion(QUESTIONS[count]);
    }
    
  }, [count])

  const handleYesClick = () => {
    setYesClicked(clicked => !clicked);
    setCurGif(HAPPYGIFS[Math.floor(Math.random() * (HAPPYGIFS.length))])
  }
  

  return (
    <div className='h-screen flex items-center justify-center bg-linear-to-b from-yellow-100 to-pink-300'>
      {yesClicked && <FallenHeart />}
      <div>
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
              onClick={() => {setCount(count => count + 1)}} 
            >
                No
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default App