import { useEffect, useState } from "react";
import { createContext } from "react";


export const CoinContext = createContext();

const CoinContextProvider =(props)=>{
    const [coins, setCoins] = useState([]);
    const [currency, setCurrency]=useState(
        {
            name:"usd",
            symbol:"$"
        }
    )
    const fetchAllCoins= async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Nd5JF1fzEKujSJnKffo2RTqf'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setCoins(response))
            .catch(err => console.error(err));
    }

    useEffect(()=>{
      fetchAllCoins();
    },[currency])

    const contextValue={
        coins , currency ,setCurrency
    }


    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}
export default CoinContextProvider;