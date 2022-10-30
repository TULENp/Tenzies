import React, { useState } from 'react'
import './App.css'
import Die from './components/Die'

export function App() {

	const [dice, setDice] = useState(GetRandomDice());

	function GetRandomDice() {
		let randomArray = Array.from({ length: 10 }, () => Math.ceil(Math.random() * 6));
		return randomArray.map(die => <Die num={die} />)
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
					<button className='rollButton'>Roll</button>
				</div>
			</section>
		</main>
	)
}

