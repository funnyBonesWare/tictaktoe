import React, { useState, useEffect } from 'react';
import { X, Circle, RotateCcw } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = Player[];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

function App() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const checkWinner = (boardState: Board) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        setWinningLine(combo);
        return boardState[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine(null);
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
    } else if (!board.includes(null)) {
      setWinner('draw');
    }
  }, [board]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tic Tac Toe</h1>
          {!winner && (
            <p className="text-gray-600">
              Current Player: {currentPlayer === 'X' ? (
                <X className="inline w-5 h-5 text-blue-500" />
              ) : (
                <Circle className="inline w-5 h-5 text-red-500" />
              )}
            </p>
          )}
          {winner && (
            <p className="text-xl font-semibold text-gray-700">
              {winner === 'draw' ? "It's a draw!" : `Winner: ${winner}`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!cell || !!winner}
              className={`
                h-24 bg-gray-50 rounded-lg transition-all duration-200
                hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500
                flex items-center justify-center
                ${winningLine?.includes(index) ? 'bg-green-100' : ''}
                ${cell ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {cell === 'X' && <X className="w-12 h-12 text-blue-500" />}
              {cell === 'O' && <Circle className="w-12 h-12 text-red-500" />}
            </button>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full py-3 px-6 bg-indigo-500 text-white rounded-lg
            hover:bg-indigo-600 transition-colors duration-200
            flex items-center justify-center gap-2 font-semibold"
        >
          <RotateCcw className="w-5 h-5" />
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;