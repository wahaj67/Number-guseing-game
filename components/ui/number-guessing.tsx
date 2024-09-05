"use client"
import { useState, useEffect, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

export default function NumberGuessing(): JSX.Element {
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [paused, setPaused] = useState<boolean>(false)
  const [targetNumber, setTargetNumber] = useState<number>(0)
  const [userGuess, setUserGuess] = useState<number | string>("")
  const [attempts, setAttempts] = useState<number>(0)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber = Math.floor(Math.random() * 10) + 1
      setTargetNumber(randomNumber)
    }
  }, [gameStarted, paused])

  function handleStartGame(): void {
    setGameStarted(true)
    setGameOver(false)
    setAttempts(0)
    setPaused(false)
    setShowConfetti(false)
  }

  const handlePausedGame = (): void => {
    setPaused(true)
  }

  const handleResumeGame = (): void => {
    setPaused(false)
  }

  const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true)
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
    } else {
      setAttempts(attempts + 1)
    }
  }

  const handleTryAgain = (): void => {
    setGameStarted(false)
    setGameOver(false)
    setUserGuess("")
    setAttempts(0)
  }

  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value))
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-2 text-black'>
          Number Guessing Game
        </h1>
        <p className='text-center text-black mb-4'>Try to guess the number between 1 and 10!</p>

        {!gameStarted && (
          <div className='flex justify-center mb-4'>
            <Button
              onClick={handleStartGame}
              className='bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded'
            >
              Start Game
            </Button>
          </div>
        )}

        {gameStarted && !gameOver && (
          <div>
            <div className='flex justify-center mb-4'>
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded'
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={handlePausedGame}
                  className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded'
                >
                  Pause
                </Button>
              )}
            </div>
            <div className='flex justify-center mb-4'>
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className='bg-gray-100 border border-gray-300 text-black rounded-lg py-2 px-4 w-full max-w-xs'
                placeholder='Enter your guess'
              />
              <Button
                onClick={handleGuess}
                className='bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4'
              >
                Guess
              </Button>
            </div>
            <div className='text-center text-black'>
              <p>Attempts: {attempts}</p>
            </div>
          </div>
        )}

        {gameOver && (
          <div>
            <div className='text-center mb-4 text-black'>
              <h2 className='text-2xl font-bold'>Game Over!</h2>
              <p>You guessed the number in {attempts} attempts.</p>
            </div>

            {showConfetti && (
              <div>
                <Confetti width={width} height={height} />
                <p className='text-center font-bold p-4 text-black'>
                  Hope you enjoyed the game! Hit Try Again and break your record! ;
                </p>
              </div>
            )}

            <div className='flex justify-center'>
              <Button
                onClick={handleTryAgain}
                className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
