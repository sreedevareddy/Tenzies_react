import React,{ useState, useEffect } from 'react';
import {nanoid} from 'nanoid';
import Die from './components/Die';

import './App.css';

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isheld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won");
    }
  }, [dice])

  function generateNewDie(){
    return{
      value : Math.ceil(Math.random() * 6), 
      isheld : false,
      id : nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isheld ? 
          die: generateNewDie()
      }));
    }else{
      setDice(allNewDice())
      setTenzies(false)
    }
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
        {...die, isheld: !die.isheld} : 
        die
    }))
  }

  const diceElements = dice.map(die => 
    <Die key={die.id} value={die.value} isheld={die.isheld} holdDice={() => holdDice(die.id)} />
    )

  return (
    <main>
      <h1 className='title'>Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className='roll-dice' onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
