import { GameStateProvider, useGameState } from './GameStateContext';

function Board() {
  const { state, dispatch } = useGameState();
  const { squares } = state;
  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[square] = nextValue;
    dispatch({ type: 'UPDATE_SQUARES', payload: newSquares });
  }

  function restart() {
    dispatch({ type: 'RESET' });
  }

  function renderSquare(i) {
    return (
      <button className="square w-16 h-16 hover:shadow-lg hover:bg-blue-600 bg-blue-500 text-white font-bold py-2 px-4 m-7 rounded" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div className="flex-auto text-center py-5 bg-slate-200 md:rounded-lg md:w-1/2 lg:w-1/4 mx-auto my-auto font-semibold text-4xl md:text-xl">
      <div className="my-5">{status}</div>
      <div >
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div >
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div >
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="my-5" onClick={restart}>
        Restart the Game
      </button>
    </div>
  );
}

function Game() {
  return (
    <GameStateProvider>
      <div className="min-h-screen bg-slate-200 md:bg-black">
        <Board />
      </div>
    </GameStateProvider>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

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

function App() {
  return <Game />;
}

export default App;
