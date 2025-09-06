import { useState } from "react";
import './App.css'
import{evaluate} from "mathjs";

function App() {
  const [input, setInput] = useState("0");

  const [history, setHistory] = useState("");

  const [isResultShown, setIsResultShown] = useState(false); //flag to track if input is a result.

  //Function to handle number input..
  const inputDigit = (digit) => {
    if (isResultShown) {
      setInput(String(digit));
      setHistory("");
      setIsResultShown(false);
      return;
    }
    if (input === "0" || ["+", "-", "*", "/"].includes(input)) {
      setInput(String(digit));
    } else {
      setInput((prevInput) => prevInput + digit);
    }
  };
//Function to handle decimal point...
  const inputDecimal=()=>{

    if(isResultShown){
      setInput('0.');
      setHistory('');
      setIsResultShown(false);
      return;

    } 
  if(!input.includes('.')){
    setInput((prevInput)=>prevInput+'.');
  }
  };

//function to clear everything..
  const clearAll = () => {
    setInput("0");
    setHistory("");
    setIsResultShown(false);
  };
//Function to handle the operator..
const handleOperator=(operator)=>{
  
  if(isResultShown){
    setHistory(input+operator);
  }else{

    if(!["+", "-", "*", "/"].includes(input)){
      setHistory(history+input+operator);
    }
  }

setInput(operator);
setIsResultShown(false);

};

//Function to calulate the final result..
const handleEquals = ()=>{
  if(isResultShown || ["+", "-", "*", "/"].includes(input)){
    return;
  }
 
const fullExp = history + input;

  try {
     const result = evaluate(fullExp);  //math.js library evaluates
     setInput(result);
     setHistory(fullExp+'=');
     setIsResultShown(true);
  }
  catch(error){
setInput('Error');
setHistory('');
setIsResultShown(true);
  }
  };
  //Function to handle percentage..

const handlePercentage =()=>{
  if(!isResultShown || !["+", "-", "*", "/"].includes(input)){
    setInput(String(parseFloat(input) / 100));
  }
}

//function to hand toggle..
const toggleSign=()=>{
  if(!isResultShown || !["+", "-", "*", "/"].includes(input)){
  
    setInput(prev => prev.startsWith('-')? prev.slice(1): '-'+prev);
 

}
};


  return (
   <main className="main-container">
        <div className="calculator">
          {/* Calculator Display */}
          <div className="display">
            <p className="display-history">{history || ' '}</p>
            <p className="display-input">{input}</p>
          </div>

          {/* Calculator Buttons Grid */}
          <div className="buttons-grid">
            <button onClick={clearAll} className="calc-button btn-func">AC</button>
            <button onClick={toggleSign} className="calc-button btn-func">+/-</button>
            <button onClick={handlePercentage} className="calc-button btn-func">%</button>
            <button onClick={() => handleOperator('/')} className="calc-button btn-operator">÷</button>

            <button onClick={() => inputDigit(7)} className="calc-button btn-digit">7</button>
            <button onClick={() => inputDigit(8)} className="calc-button btn-digit">8</button>
            <button onClick={() => inputDigit(9)} className="calc-button btn-digit">9</button>
            <button onClick={() => handleOperator('*')} className="calc-button btn-operator">×</button>

            <button onClick={() => inputDigit(4)} className="calc-button btn-digit">4</button>
            <button onClick={() => inputDigit(5)} className="calc-button btn-digit">5</button>
            <button onClick={() => inputDigit(6)} className="calc-button btn-digit">6</button>
            <button onClick={() => handleOperator('-')} className="calc-button btn-operator">−</button>

            <button onClick={() => inputDigit(1)} className="calc-button btn-digit">1</button>
            <button onClick={() => inputDigit(2)} className="calc-button btn-digit">2</button>
            <button onClick={() => inputDigit(3)} className="calc-button btn-digit">3</button>
            <button onClick={() => handleOperator('+')} className="calc-button btn-operator">+</button>

            <button onClick={() => inputDigit(0)} className="calc-button btn-digit col-span-2">0</button>
            <button onClick={inputDecimal} className="calc-button btn-digit">.</button>
            <button onClick={handleEquals} className="calc-button btn-operator">=</button>
          </div>
        </div>
      </main>
  );
}
export default App;
