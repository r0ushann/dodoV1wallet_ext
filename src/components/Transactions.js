import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Polygon Mumbai Test Network RPC endpoint
const rpcEndpoint = 'https://polygon-mumbai.g.alchemy.com/v2/3VoPPYefIECTwhtI-ZMSmLddYPHtlf3l';

const Transaction = ({ seedPhrase }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Connect to the Polygon Mumbai Test Network
        const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
        const wallet = ethers.Wallet.fromMnemonic(seedPhrase).connect(provider);

        // Get the account address
        const accountAddress = wallet.address;

        // Fetch the previous 10 transactions for the account
        const history = await provider.getHistory(accountAddress);
        console.log(history)

        // Filter the transactions for send and receive events
        const filteredTransactions = history.filter((tx) => {
          return tx.to === accountAddress || tx.from === accountAddress;
        });

        setTransactions(filteredTransactions.slice(0, 10));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (seedPhrase) {
      fetchTransactions();
    }
  }, [seedPhrase]);

  return (
    <div>
      <h1>Transaction History</h1>
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash}>
                <td>{tx.hash}</td>
                <td>{tx.from}</td>
                <td>{tx.to}</td>
                <td>{ethers.utils.formatUnits(tx.value, 18)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default Transaction;
