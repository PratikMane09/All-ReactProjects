
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length,setLength]=useState(8)
  const[numberallowed,setNumberallowed]=useState(false)
  const[charallowed,setCharallowed]=useState(false)
  const[password,setpassword]=useState("")
// useref hook
const passwordRef =useRef(null)

const copypasswordtoclipboard=useCallback(()=>{
  passwordRef.current?.select();
  
  window.navigator.clipboard.writeText(password)
},[password])
  const passwordGenretor=useCallback(()=>{
    let pass=""
   
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz"
    if(numberallowed) str +="0123456789"
  if(charallowed) str +="!@#$%^&*()_+[]{}~'"
    
  for(let i=1;i<=length;i++){
    let char =Math.floor(Math.random() * str.length + 1)
    pass +=str.charAt(char)
  }
  
  setpassword(pass)
  },[length,numberallowed,charallowed,setpassword])

  useEffect(()=>{
    passwordGenretor()
  },[length,numberallowed,charallowed,passwordGenretor])

 
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
     <input type="text"
     value={password}
     ref={passwordRef}
     onclick={copypasswordtoclipboard}
     className='outline-none w-full py-1 px-3'
     placeholder='password'
     readOnly
     />
     <button 
     onclick
     className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">copy</button>
     </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range'
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length:{length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultChecked={numberallowed}
            id='numberInput'
           
            onChange={()=>{setNumberallowed((prev)=>!prev)}}/>
            <label htmlFor='numberInput'>Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultChecked={charallowed}
            id='characterInput'
            
            onChange={
              ()=>{setCharallowed((prev)=>!prev);
            }}/>
            <label htmlFor='characterInput'>Chracters</label>
          </div>
        </div>
     </div>
   </>
  );
}

export default App;
