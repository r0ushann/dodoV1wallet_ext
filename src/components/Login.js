import React, { useState } from 'react';
//import ethers from 'ethers';
import { ethers } from 'ethers';
import { Navigate, useNavigate } from 'react-router-dom';

const rpcEndpoint = 'https://polygon-mumbai.g.alchemy.com/v2/3VoPPYefIECTwhtI-ZMSmLddYPHtlf3l';
const explorerUrl = 'https://mumbai.polygonscan.com/tx/';



function Login() {


  const [seedPhrase, setSeedPhrase] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  const navigate = useNavigate()
  const viewTransactions = () => {
    navigate('/transactions');
  }

  const login = async () => {
    try {
      // Connect to the Polygon Mumbai Test Network
      const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
      const wallet = ethers.Wallet.fromMnemonic(seedPhrase).connect(provider);

      // Get account address
      const address = wallet.address;
      setAccountAddress(address);

      // Get account balance
      const balance = await wallet.getBalance();
      setAccountBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendTokens = async () => {
    try {
      // Connect to the Polygon Mumbai Test Network
      const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
      const wallet = ethers.Wallet.fromMnemonic(seedPhrase).connect(provider);

      // Recipient address and token amount
      const recipient = recipientAddress;
      const tokenAmount = ethers.utils.parseEther(amount);

      // Send Matic tokens to the recipient address
      const transaction = await wallet.sendTransaction({
        to: recipient,
        value: tokenAmount,
      });
      await transaction.wait(); // Wait for the transaction to be mined
      setTransactionHash(transaction.hash);
      //const history = `https://mumbai.polygonscan.com/tx/${transactionHash}`

      console.log('Transaction Hash:', transaction.hash);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={seedPhrase}
        onChange={(e) => setSeedPhrase(e.target.value)}
        placeholder="Enter your seed phrase"
      />
      <button onClick={login}>Login</button>

      {accountAddress && (
        <div>
          <h2>Account Address:</h2>
          <p className='address'>{accountAddress}</p>
        </div>
      )}

      {accountBalance && (
        <div>
          <h2>Account Balance:</h2>
          <p className='address'>{accountBalance} Matic</p>

          <div>
      <h1>Send Matic Tokens</h1>
      <input
        type="text"
        value={seedPhrase}
        onChange={(e) => setSeedPhrase(e.target.value)}
        placeholder="Enter your seed phrase"
      />
      <input
        type="text"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        placeholder="Recipient Address"
      />
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={sendTokens}>Send Tokens</button>

      {transactionHash && (
        <div>
         
          <a href={explorerUrl + transactionHash} target="_blank" rel="noopener noreferrer">
            Transaction Hash
          </a>
          
        </div>
      )}
    </div>
        </div>
      )}
      <button onClick={viewTransactions}>view Activity</button>


    </div>
  );
};

export default Login;