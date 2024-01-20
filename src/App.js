import { useState } from "react";

const initialBoard = [
  null, null, null,
  null, null, null,
  null, null, null,
];

const turnScheme = {
  'X': 'O',
  'O': 'X'
}

const winCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
]

const Cell = ({ cellContent, onClick }) => (
  <div className="border flex justify-center items-center text-[30px]" onClick={onClick}>
    <p className="h-10">{cellContent}</p>
  </div>
)


const App = () =>  {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [board, setBoard] = useState(initialBoard);
  const [currentSymbol, setCurrentSymbol] = useState('X');

  const passTurn = () => setCurrentSymbol(prevState => turnScheme[prevState]);
  const finishGame = () =>  setIsGameFinished(true);

  const calculateIsWinner = (board) =>
    winCases
      .some((winCase) => winCase
        .every((winIndex) => board[winIndex] === currentSymbol));

  const makeMove = (updatedIndex, cellContent) => {
    if(!!cellContent || isGameFinished) return;
    const newBoard = board.map((cellSymbol, index) => updatedIndex === index ? currentSymbol : cellSymbol);
    setBoard([...newBoard]);

    const isWinner= calculateIsWinner(newBoard);
    if(isWinner) {
      finishGame()
      return;
    }

    passTurn();
  }

  return (
    <div className="h-screen w-screen bg-green-100 flex flex-col justify-center items-center">
       <p className="mb-10 text-[20px] h-10">{isGameFinished && `Winner - ${currentSymbol}`}</p>
      <div className="h-[500px] w-[500px] bg-white grid grid-cols-3">
        {board.map((cellContent, index) => (
          <Cell key={index} cellContent={cellContent} onClick={() => makeMove(index, cellContent)} />
        ))}
      </div>
    </div>
  );
}

export default App;
