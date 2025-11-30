type BoardProps = {
  boardValues: string[];
};

export const Board = ({ boardValues }: BoardProps) => {
  const onClick = (index: number) => {};
  return (
    <div className="grid grid-cols-3 gap-2 w-48">
      {boardValues.map((cell, i) => (
        <div
          key={i}
          onClick={() => onClick(i)}
          className="flex items-center justify-center 
                 h-16 w-16 bg-white rounded-lg shadow
                 text-3xl font-bold cursor-pointer
                 hover:bg-gray-100 active:scale-95 transition"
        >
          {cell}
        </div>
      ))}
    </div>
  );
};
