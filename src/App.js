import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// function untuk menentukan pemenangnya
function calculateWinner(squares) {
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

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // memeriksa apakah squares sudah punya isi X atau O dan juga memeriksa apakah pemain telah menang
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // membuat array baru dgn method slice()
    const nextSquares = squares.slice();

    // memeriksa apakah xIsNet bernilai true, jika iya maka isi nextSquares X, dan jika tidak isinya O
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");

    // set data squares dengan isinya dari nextSquares, array baru yang dibuat dengan method slice()
    onPlay(nextSquares);
  }

  // untuk hasil pemenang dari function calculateWinner
  const winner = calculateWinner(squares);
  let status;
  // mengecek siapa pemenangnya, jika belum ada pemenang maka akan tampil status giliran pemain siapa saat ini.
  winner
    ? (status = "Pemenang: " + winner)
    : (status = "Pemain selanjutnya: " + (xIsNext ? "X" : "O"));

  return (
    <>
      {/* untuk menampilkan variable status */}
      <div className="status">{status}</div>

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

export default function Game() {
  // tambah useState untuk melacak giliran pemain dan riwayat gerakannya
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // membuat variable untuk membaca array kotak terakhir dari history
  const currentSquares = history[currentMove];

  // function dibawah akan dipanggil oleh komponen Board untuk memperbaharui permainan
  function handlePlay(nextSquares) {
    // membuat variable nextHistory yang berisi data history yg di slice dari indeks 0 sampai currentMove + 1, dan ada nilai nextSquares
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // mengeset history dengan isi dari nextHistory
    setHistory(nextHistory);

    // mengeset currentMove dengan panjang nextHistory - 1
    setCurrentMove(nextHistory.length - 1);

    // mengeset xIsNext dengan value kebalikannya saat ini, yaitu false karna diambil dari nilai default di useState
    setXIsNext(!xIsNext);
  }

  // membuat function jumpTo()
  function jumpTo(nextMove) {
    // mengeset currentMove dengan value nextMove yang diisi dengan move dari hasil method map
    setCurrentMove(nextMove);

    // mengeset nilai xIsNext jika sisa bagi nextMove 0 jadi true, jika sisa bagi 1 maka xIsNext bernilai false
    setXIsNext(nextMove % 2 === 0);
  }

  // membuat array baru dengan method map yang berisi arrow function dengan 2 parameter
  const moves = history.map((squares, move) => {
    let description;

    // jika move lebih dari 0 maka pergi ke langkah sekian, jika tidak pergi ke awal permainan
    move > 0
      ? (description = "Pergi ke langkah #" + move)
      : (description = "Pergi ke awal permainan");

    // mengembalikan tag li yg didalamnya ada tag button dengan variable description
    return (
      // perlu menggunakan key yang berisi move untuk memberitahu react tentang identitas setiap komponen agar react mempertahankan state diantara render ulang.
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
