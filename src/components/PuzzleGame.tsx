
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PuzzleGameProps {
  level: number;
  onComplete: () => void;
}

export const PuzzleGame = ({ level, onComplete }: PuzzleGameProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Генерируем данные головоломки на основе уровня
  const generatePuzzleData = (puzzleLevel: number) => {
    // Различные типы головоломок в зависимости от уровня
    const puzzleType = puzzleLevel % 3;
    
    switch (puzzleType) {
      case 0: // Последовательности чисел
        return generateSequencePuzzle(puzzleLevel);
      case 1: // Логические головоломки
        return generateLogicPuzzle(puzzleLevel);
      case 2: // Визуальные головоломки
        return generatePatternPuzzle(puzzleLevel);
      default:
        return generateSequencePuzzle(puzzleLevel);
    }
  };
  
  const { puzzleContent, correctAnswer } = generatePuzzleData(level);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userAnswer.trim() === "") {
      setErrorMessage("Введите ответ");
      return;
    }
    
    // Проверяем ответ
    if (userAnswer.trim().toLowerCase() === correctAnswer.toString().toLowerCase()) {
      onComplete();
      setUserAnswer("");
      setErrorMessage("");
    } else {
      setErrorMessage("Неверный ответ. Попробуйте еще раз.");
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="puzzle-content text-center p-4 font-mono">
        {puzzleContent}
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <Input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Введите ваш ответ"
          className="bg-[#1A1F2C] border-[#7E69AB] text-white placeholder:text-[#8E9196]"
        />
        
        {errorMessage && (
          <p className="text-red-400 text-sm">{errorMessage}</p>
        )}
        
        <Button 
          type="submit" 
          className="bg-[#7E69AB] hover:bg-[#6E59A5] w-full"
        >
          Подтвердить
        </Button>
      </form>
    </div>
  );
};

// Функции для генерации головоломок различных типов
function generateSequencePuzzle(level: number) {
  // Уровень влияет на сложность последовательности
  const complexity = Math.min(Math.floor(level / 3) + 1, 5);
  
  // Генерация последовательности чисел с паттерном
  let sequence: number[] = [];
  let rule: string;
  let answer: number;
  
  if (complexity === 1) {
    // Простые арифметические последовательности
    const start = Math.floor(Math.random() * 5) + 1;
    const step = Math.floor(Math.random() * 3) + 1;
    
    sequence = Array(5).fill(0).map((_, i) => start + step * i);
    answer = start + step * 5;
    rule = `+${step}`;
  } else if (complexity === 2) {
    // Геометрические прогрессии
    const start = Math.floor(Math.random() * 3) + 1;
    const multiplier = Math.floor(Math.random() * 2) + 2;
    
    sequence = Array(5).fill(0).map((_, i) => start * Math.pow(multiplier, i));
    answer = start * Math.pow(multiplier, 5);
    rule = `×${multiplier}`;
  } else {
    // Сложные последовательности
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    
    sequence = Array(5).fill(0).map((_, i) => a * (i + 1) * (i + 1) + b);
    answer = a * 6 * 6 + b;
    rule = `${a}n² + ${b}`;
  }
  
  return {
    puzzleContent: (
      <div>
        <p className="text-xl mb-4">Найдите следующее число в последовательности:</p>
        <div className="flex justify-center items-center space-x-3 text-2xl font-bold">
          {sequence.map((num, i) => (
            <span key={i} className="bg-[#7E69AB]/20 p-2 rounded">{num}</span>
          ))}
          <span className="bg-[#7E69AB]/40 p-2 rounded">?</span>
        </div>
      </div>
    ),
    correctAnswer: answer.toString(),
  };
}

function generateLogicPuzzle(level: number) {
  // Логические головоломки разной сложности
  const puzzles = [
    {
      content: "Если в слове КОДИРОВАНИЕ зашифровано как 11-16-5-10-18-16-3-1-15-10-6, как будет зашифровано слово ПРОГРАММА?",
      answer: "17-18-16-4-18-1-14-14-1"
    },
    {
      content: "Какое число должно стоять вместо X?\n8 → 4\n6 → 3\n12 → 6\n18 → 9\n16 → X",
      answer: "8"
    },
    {
      content: "Если ABCD * 4 = DCBA, и все буквы представляют разные цифры, то A + B + C + D = ?",
      answer: "18"
    }
  ];
  
  // Выбираем головоломку на основе уровня
  const index = (level % puzzles.length);
  
  return {
    puzzleContent: (
      <div className="text-left">
        <p className="text-xl mb-4">Решите логическую задачу:</p>
        <p className="whitespace-pre-line text-lg">{puzzles[index].content}</p>
      </div>
    ),
    correctAnswer: puzzles[index].answer,
  };
}

function generatePatternPuzzle(level: number) {
  // Визуальные головоломки с шаблонами
  const patterns = [
    {
      content: "OOO\nXOX\n???\nЕсли X + O = ?, то какой символ должен быть на месте ???",
      answer: "X"
    },
    {
      content: "Если ◯ + △ = ⬡, ◯ × △ = ⬢, то ◯ - △ = ?",
      answer: "⬠"
    },
    {
      content: "РАДАР → 13131, ТОПОТ → 26262, ШАЛАШ → ?",
      answer: "83738"
    }
  ];
  
  // Выбираем шаблон на основе уровня
  const index = (level % patterns.length);
  
  return {
    puzzleContent: (
      <div className="text-center">
        <p className="text-xl mb-4">Найдите закономерность:</p>
        <pre className="font-mono text-lg whitespace-pre-line">{patterns[index].content}</pre>
      </div>
    ),
    correctAnswer: patterns[index].answer,
  };
}
