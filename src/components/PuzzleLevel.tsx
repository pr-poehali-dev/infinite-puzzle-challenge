
interface PuzzleLevelProps {
  level: number;
}

export const PuzzleLevel = ({ level }: PuzzleLevelProps) => {
  // Получаем заголовок и описание уровня в зависимости от уровня
  const getLevelInfo = (puzzleLevel: number) => {
    // Типы головоломок чередуются
    const puzzleType = puzzleLevel % 3;
    
    // Сложность увеличивается с ростом уровня
    const difficulty = Math.min(Math.floor(puzzleLevel / 5) + 1, 5);
    
    const titles = {
      0: "Числовая последовательность",
      1: "Логическая головоломка",
      2: "Визуальный паттерн"
    };
    
    const difficultyLabels = ["Лёгкий", "Средний", "Сложный", "Эксперт", "Гений"];
    
    return {
      title: titles[puzzleType as keyof typeof titles],
      difficulty: difficultyLabels[Math.min(difficulty - 1, 4)]
    };
  };
  
  const { title, difficulty } = getLevelInfo(level);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-[#9b87f5]">{title}</h2>
        <span className="px-3 py-1 bg-[#7E69AB]/30 rounded-full text-sm text-[#D6BCFA]">
          Сложность: {difficulty}
        </span>
      </div>
      <div className="h-1 w-full bg-[#7E69AB]/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#9b87f5] rounded-full" 
          style={{ width: `${Math.min((level % 5) / 5 * 100, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};
