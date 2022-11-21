import ReactXnft, { View, Button } from "react-xnft";
import { useState } from "react";
ReactXnft.events.on("connect", () => {
  // no-op
});

const initialState = ["", "", "", "", "", "", "", "", ""];

const Item = ({ content, index, handleClick }) => (
  <View
    tw={`flex items-center justify-center h-[112px] w-[112px] ${
      content === "❌"
        ? "text-red-900 text-4xl"
        : "text-green-600 font-bold text-6xl"
    } border border-purple-500`}
    onClick={() => handleClick(index)}
  >
    {content}
  </View>
);

export function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const handleClick = (index) => {
    const newBoard = [...board];
    newBoard[index] = "ᱛ";
    const availables = newBoard.reduce(
      (acc, item, index) => (item ? acc : [...acc, index]),
      [] as number[]
    );
    const randomItem =
      availables[Math.floor(Math.random() * availables.length)];
    newBoard[randomItem] = "❌";
    setBoard(newBoard);
  };
  
  const handleReset = () => {
    setBoard(initialState)
    setGameResult(null);
  }

  return (
    <View>
      <View tw="my-5 text-3xl text-purple-100 text-center font-bold">
        Tic Tac Toe
      </View>
      <View tw="grid grid-cols-3 grid-rows-3 p-5 my-5">
        {board.map((content, index) => (
          <Item
            content={content}
            key={index}
            index={index}
            handleClick={!board[index] && !gameResult && handleClick}
          />
        ))}
      </View>
      <View tw="p-5">
        <Button
          tw="bg-transparent hover:bg-purple-900 text-blue-100 font-bold hover:text-white py-2 w-full border border-2 border-purple-500 rounded"
          onClick={handleReset}
        >
          Reset!
        </Button>
      </View>
      {gameResult && (
        <View tw="absolute top-[160px] w-full p-5 h-[200px] bg-black">
          <View tw={`${gameResult === "Win" ? "text-green-600": "text-red-600"} w-full h-full border border-blue-600 flex items-center justify-center text-4xl`}>You {gameResult}!</View>
        </View>
      )}
    </View>
  );
}
