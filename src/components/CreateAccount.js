import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [accountAddress, setAccountAddress] = useState('');

  const createAccount = () => {
    const wallet = ethers.Wallet.createRandom();
    setSeedPhrase(wallet.mnemonic.phrase);
    setAccountAddress(wallet.address);
  };

  const navigate = useNavigate();

  const backHome=() => {
    navigate('/');
  }

  const handleLogin= () => {
    navigate('/login')
  }


  return (
    <>
     <div>
      
      {seedPhrase ? (
        <div>

            <h2>Account Details</h2>
          <p className='seed'>Seed Phrase </p>
          <h3 className='phrase'>{seedPhrase}</h3>
          <p className='account'>Account Address: </p>
          <h3 className='address'>{accountAddress}</h3>
          <button onClick={handleLogin}>Account Login</button>
          <div>
          <span>(!) store the seed phrase locally for further use.</span>
          </div>
        </div>

      ) : (

        <>

        <h2>Create Account</h2>
        <button className='createbutton' onClick={createAccount}>Create an Account</button>
        {/* <button className ='backbutton' onClick={backHome}>Back to Home</button> */}
        </>


      )}
    </div>
    <div className=''>
    
    <button className ='backbutton' onClick={backHome}>Back to Home</button>
    </div>
    </>
   
  );
}

export default CreateAccount;
