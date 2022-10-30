import React, { useState } from 'react'
import './App.css'
import Die from './components/Die'

export function App() {

	const [dice, setDice] = useState(GetRandomArray().map(die => <Die num={die} />));

	function GetRandomArray() {
		return Array.from({ length: 10 }, () => Math.ceil(Math.random() * 6));
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

