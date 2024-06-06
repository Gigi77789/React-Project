import { useState } from "react";

// 1. Component here
// 2. Define a function component named Square
// 3. Represents each individual square
function Square({ value, onSquareClick }) {
  // Pass value and function from Board
  return (
    // Use the function "onSquareClick" when clicking
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Use components to create many squares on the board
// The component Board is fully controlled by the props passed to it by the Game component
function Board({ xIsNext, squares, onPlay }) {
  // Keep track of this by adding another piece of state to the Board component

  // const [squares, setSquares] = useState(Array(9).fill(null)); // setSquares is a function to modify the value of squares
  // ['O', null, 'X', 'X', 'X', 'O', 'O', null, null]

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      // if squares[i] is null, then it's false; null = false, won't return
      return;
    }
    const nextSquares = squares.slice(); // .slice() copies the array squares
    if (xIsNext) {
      // if true
      nextSquares[i] = "😠";
    } else {
      nextSquares[i] = "😄";
    }
    onPlay(nextSquares); // setSquares() is a function to output new values
    // setXIsNext(!xIsNext); // flip xIsNext's true or false
  }

  // Display which player’s turn is next
  const winner = calculateWinner(squares); // Only true if there is a winner
  let status; // Store the variable in status
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "😠" : "😄"); // (xIsNext ? "X" : "O") will immediately calculate and output a result
  }

  return (
    <>
      <div className="status"> {status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Top-level component
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "A New Game !";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  // Show when the game is won and there are no more turns to make
  // Checks for a winner and returns 'X', 'O', or null
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
