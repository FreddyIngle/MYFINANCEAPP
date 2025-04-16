import React, {useState} from "react";
import axios from "axios";


function StockTracker() {

    {/*State Variables */}
    {/*Price*/}
    const [symbol,setSymbol] = useState(""); 
    const [price, setPrice] = useState<number | null>(null);
    const [prevClose, setPrevClose] = useState<number | null>(null);
    const [change, setChange] = useState<number | null>(null);
    const [changePercentage, setChangePercentage] = useState<number | null>(null);
    const [lastUpdate, setLastUpdate] = useState<number | null>(null);
    {/*Company Profile */}
    const [name, setName] = useState("");
    const [ticker, setTicker] = useState("");
    const [logo, setLogo] = useState<string | null>(null);


    {/*Get Price*/}
    async function getSymbolPrice(ticker: string){
        try{
            setPrice(null);

            const res = await axios.get("https://finnhub.io/api/v1/quote" , {
                params:{
                    symbol: ticker,
                    token: import.meta.env.VITE_STOCKS_API_KEY,
                },
            });
            const current = res.data?.c;
            const previous = res.data?.pc;

            if (current && current >0){
                setPrice(current);
                setPrevClose(previous);
                const difference = current - previous;
                const percentage = (difference / previous) * 100;
                setChange(difference);
                setChangePercentage(percentage);
                setLastUpdate(res.data?.t);

            }
            else{
                console.error('Invalid symbol');
            }

        }catch(error){
            console.error('error',error);
        }
        
    }
{/*Get Company Profile*/}
async function getCompanyProfile(symbol: string){
    try{
        setName("");
        setTicker("");
        setLogo(null);
      

        const res = await axios.get("https://finnhub.io/api/v1/stock/profile2" , {
                params:{
                    symbol: symbol,
                    token: import.meta.env.VITE_STOCKS_API_KEY,
                }
        });
        const currentName = res.data?.name;
        const currentTicker =res.data?.ticker;
        const companyLogo = res.data?.logo;
        if (currentName){
            setName(currentName);
            setTicker(currentTicker);
            setLogo(companyLogo);
          
        }
    }catch{
        console.error("Couldnt reach API",Error);
    }

}
return (
    <div>
        <input 
            type = 'text'
            placeholder="Enter Stock Symbol"
            className= "input input-bordered w-full mb-2"
            value = {symbol}
            onChange = {(e) => setSymbol(e.target.value.toUpperCase())}
        />
        <button
              className="btn btn-sm btn-primary w-full mb-2"
              onClick={() => {
                getSymbolPrice(symbol)
                getCompanyProfile(symbol);
              }}      
        >
             Get Price
        </button>
        {logo && (
  <div className="flex flex-col items-center mb-4">
    <img
      src={logo}
      alt="Company Logo"
      className="w-16 h-16 rounded-xl shadow-md mb-2"
    />
    <h2 className="text-info font-semibold text-md">
      {name} ({ticker})
    </h2>
  </div>
)}

{price !== null && (
  <div className="text-center mb-2">
    <p className="text-2xl font-bold">${price.toFixed(2)} <span className="text-xs text-base-content/50">USD</span></p>

    {change !== null && changePercentage !== null && (
      <p className={`text-sm font-semibold ${change >= 0 ? "text-success" : "text-error"}`}>
        {change >= 0 ? "▲" : "▼"} {change.toFixed(2)} ({changePercentage.toFixed(2)}%)
      </p>
    )}

    {prevClose !== null && (
      <p className="text-xs text-base-content/50">
        Prev Close: ${prevClose.toFixed(2)}
      </p>
    )}

    {lastUpdate && (
      <p className="text-xs text-base-content/40 mt-1">
        Updated: {new Date(lastUpdate * 1000).toLocaleTimeString()}
      </p>
    )}
  </div>
)}

        
        

        
      

      
     
    </div>
)
}

export default StockTracker;
