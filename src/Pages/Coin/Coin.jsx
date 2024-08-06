import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../Context/CoinContext';
import LineChart from '../../Components/Navbar/Linechart/LineChart';
const Coin = () => {

  const {coinId}=useParams();
  const [coinData ,setCoinData] = useState();
  const [historicData ,setHistoricData] = useState();
   const {currency} = useContext(CoinContext)


   const fetchCoinData = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-Nd5JF1fzEKujSJnKffo2RTqf',
        },
        mode: 'cors', // Add this line
      };
  
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchHistoricData =async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Nd5JF1fzEKujSJnKffo2RTqf'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`, options)
      .then(response => response.json())
      .then(response => setHistoricData(response))
      .catch(err => console.error(err));
  }
   
  useEffect(()=>{
    fetchCoinData();
    fetchHistoricData();
  },[currency,coinId])

  if (coinData && historicData) {
    return (
      <div className="coin">
        <div className="coin-name">
         <img src={coinData.image.large} alt="" />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicData={historicData}/>
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24H High</li>
            <li>{coinData.sentiment_votes_up_percentage}</li>
          </ul>
          <ul>
            <li>24H Low</li>
            <li>{coinData.sentiment_votes_down_percentage}</li>
          </ul>
          <ul>
            <li> Market CAP</li>
            <li>{currency.symbol}{coinData.market_cap}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};
export default Coin
