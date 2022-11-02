import React, { useState, useEffect, useRef } from 'react'
import Confetti from 'react-confetti' // for congrats confetti
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'; // to generate random ids

//todo Add rolls counter and timer
//todo Save best time to localStorage

export function App(): JSX.Element {

	type TDice = {
		id: string,
		num: number,
		isHeld: boolean
	}

	const [dice, setDice] = useState<TDice[]>(getRandomDice());
	const [isWon, setIsWon] = useState<boolean>(false);
	const shake = useRef<HTMLDivElement>(HTMLDivElement.prototype);

	// array of <Die> components 
	const diceArray: JSX.Element[] = dice.map(die =>
		<Die key={die.id} num={die.num} isHeld={die.isHeld} hold={() => holdDice(die.id)} />)

	// check all dice isHeld and all have the same num. If true - player won
	useEffect(() => {
		const allHeld: boolean = dice.every(die => die.isHeld)
		const allSameNum: boolean = dice.every(die => die.num === dice[0].num)

		if (allHeld && allSameNum) {
			setIsWon(true);
		}
	}, [dice]);

	// return array of objects(dice) with random id and number
	function getRandomDice(): TDice[] {
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
		
		shake.current.className = 'dice shake';
		setTimeout(() => {
			shake.current.className = 'dice';
		}, 200);
	}

	// flip isHeld prop of Die component
	function holdDice(id: string) {
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
					<div className='dice' ref={shake}>
						{diceArray}
					</div>
					<button className='rollButton' onClick={roll}>{isWon ? "New Game" : "Roll"}</button>
				</div>
			</section>
			<p>© Created by <a href="https://github.com/TULENz" target="_blank">Eugene Kononenko</a></p>
		</main>
	)
}

