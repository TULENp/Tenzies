import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti' // for congrats confetti
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'; // to generate random ids

//todo Add animation when Roll dice
export function App() {

	const [dice, setDice] = useState(getRandomDice());
	const [isWon, setIsWon] = useState(false);
	// array of <Die> components 
	const diceArray = dice.map(die =>
		<Die key={die.id} num={die.num} isHeld={die.isHeld} hold={() => holdDice(die.id)} />)

	// check all dice isHeld and all have the same num. If true - player won
	useEffect(() => {
		const allHeld = dice.every(die => die.isHeld)
		const allSameNum = dice.every(die => die.num === dice[0].num)

		if (allHeld && allSameNum) {
			setIsWon(true);
		}
	}, [dice]);

	// return array of objects(dice) with random id and number
	function getRandomDice() {
		return Array.from({ length: 10 }, () => {
			return {
				id: nanoid(),
				num: Math.ceil(Math.random() * 6),
				isHeld: false
			}
		});
	}

	// randomize dice numbers whose isHeld prop is false 
	function roll() {
		if (!isWon) {
			setDice(prev => prev.map((die) => {
				return die.isHeld
					? die
					: { ...die, num: Math.ceil(Math.random() * 6) }
			}))
		} else { // if isWon is true reset game
			setIsWon(false);
			setDice(getRandomDice());
		}
	}

	// flip isHeld prop of Die component
	function holdDice(id) {
		setDice(prev => prev.map((die) => {
			return die.id === id
				? { ...die, isHeld: !die.isHeld }
				: die
		}))
	}

	return (
		<main className="App">
			<section>
				{isWon && <Confetti />}
				<div className="block">
					<div className="info">
						{isWon
							? <h1>You Won!</h1>
							: <>
								<h1>Tenzies</h1>
								<h2>Roll until all dice are the same.</h2>
								<h2>Click each die to freeze it at its current value between rolls.</h2>
							</>
						}
					</div>
					<div className={'dice'}>
						{diceArray}
					</div>
					<button className='rollButton' onClick={roll}>{isWon ? "New Game" : "Roll"}</button>
				</div>
			</section>
		</main>
	)
}

