import React, { useState, useEffect, useRef, Fragment } from 'react'
import Confetti from 'react-confetti' // for congrats confetti
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'; // to generate random ids


//todo maybe add timer
//todo Save best time to localStorage
//todo add difficulty mods (5, 10, 15 dice eg / ?timer or limited rolls?)

export function App(): JSX.Element {

	type TDice = {
		id: string,
		num: number,
		isHeld: boolean
	}
	const diffNames = { insane: "insane :)", normal: "normal", hard: "hard" };
	const diffs = { normal: 10, hard: 15, insane: 5 };

	const [isWon, setIsWon] = useState<boolean>(false);
	const [counter, setCounter] = useState<number>(0)
	const [winText, setWinText] = useState<string>("")
	const [diffName, setDiffName] = useState<string>(diffNames.normal)

	let difficulty = diffs.normal;
	const [dice, setDice] = useState<TDice[]>(getRandomDice(difficulty));

	const shake = useRef<HTMLDivElement>(HTMLDivElement.prototype);

	// array of <Die/> components 
	const diceArray: JSX.Element[] = dice.map(die =>
		<Die key={die.id} num={die.num} isHeld={die.isHeld} hold={() => holdDice(die.id)} />)

	// check all dice isHeld and all have the same num. If true - player won
	useEffect(() => {
		const allHeld: boolean = dice.every(die => die.isHeld)
		const allSameNum: boolean = dice.every(die => die.num === dice[0].num)

		if (allHeld && allSameNum) {
			setIsWon(true);
			setWinText((counter > 0) ? "You Won!" : "Lucky one!")
		}
	}, [dice]);

	// return array of objects(dice) with random id and number
	function getRandomDice(diff: number): TDice[] {
		return Array.from({ length: difficulty }, () => {
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
			setDice(getRandomDice(difficulty));
			setCounter(-1);
		}
		setCounter(prev => prev + 1);

		shake.current.className = 'dice shake';
		setTimeout(() => {
			shake.current.className = 'dice';
		}, 200);
	}

	// change number of dice (5 | 10 | 15) and restart game
	function changeDifficulty() {
		if (!isWon) {
			switch (diffName) {
				case diffNames.insane:
					difficulty = diffs.normal;
					setDiffName(diffNames.normal);
					break;
				case diffNames.normal:
					difficulty = diffs.hard;
					setDiffName(diffNames.hard);
					break;
				case diffNames.hard:
					difficulty = diffs.insane;
					setDiffName(diffNames.insane);
					break;
			}
			setDice(getRandomDice(difficulty));
		}
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
							? <Fragment>
								<h1>{winText}</h1>
								<h2><a href="https://github.com/TULENz" target="_blank">Check my GitHub for... something interesting</a></h2>
							</Fragment>
							: <Fragment>
								<h1>Tenzies</h1>
								<h2>Roll until all dice are the same.</h2>
								<h2>Click each die to freeze it at its current value between rolls.</h2>
							</Fragment>
						}
					</div>
					<div className='dice' ref={shake}>
						{diceArray}
					</div>
					<div className='tools'>
						<div className='counter'>
							<h2><b>Roll counter:</b></h2>
							<h2>{counter}</h2>
						</div>
						<button className='rollButton' onClick={roll}>{isWon ? "New Game" : "Roll"}</button>
						<div className='difficulty' onClick={changeDifficulty}>
							<h2><b>Difficulty:</b></h2>
							<h2>{diffName}</h2>
						</div>
					</div>
				</div>
			</section>
			<p>© Created by <a href="https://github.com/TULENz" target="_blank">Eugene Kononenko</a></p>
		</main>
	)
}

