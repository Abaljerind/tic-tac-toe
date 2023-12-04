import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // memeriksa apakah squares sudah punya isi X atau O
    if (squares[i]) {
      return;
    }

    // membuat array baru dgn method slice()
    const nextSquares = squares.slice();

    // memeriksa apakah xIsNet bernilai true, jika iya maka isi nextSquares X, dan jika tidak isinya O
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");

    // set data squares dengan isinya dari nextSquares, array baru yang dibuat dengan method slice()
    setSquares(nextSquares);

    // set data xIsNext bernilai false
    setXIsNext(!xIsNext);
  }

  return (
    <>
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
