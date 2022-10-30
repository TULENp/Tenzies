import React, { useState } from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid';

export function App() {

	const [dice, setDice] = useState(GetRandomDice());
	function GetRandomDice() {
		let randomArray = Array.from({ length: 10 }, () => {
			return {
				id: nanoid(),
				num: Math.ceil(Math.random() * 6),
				isHeld: true
			}
		});
		return randomArray.map(die => <Die id={die.id} num={die.num} isHeld={die.isHeld} />)
	}

	function Roll() {
		setDice(GetRandomDice());
	}

	return (
		<main className="App">
			<section>
				<div className="block">
					<div className="info">
						<h1>Tenzies</h1>
						<h2>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h2>
					</div>
					<div className='dice'>
						{dice}
					</div>
					<button className='rollButton' onClick={Roll}>Roll</button>
				</div>
			</section>
		</main>
	)
}

