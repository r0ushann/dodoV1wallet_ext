import React from 'react';
import {useNavigate } from 'react-router-dom'

const Home = () => {
 const navigate = useNavigate();

    const handleClick = () =>{
        navigate('/create-account');
    }

    const handleLogin =()=> {
      navigate('/login')
    }

  return (
    <div>
    <button  className='HomeButton' onClick={handleClick}>Proceed to Create an Account</button>
    <button  className='HomeButton' onClick={handleLogin}>log in to existing account</button>
    </div>
  )
}

export default Home