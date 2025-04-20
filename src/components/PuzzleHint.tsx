
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface PuzzleHintProps {
  level: number;
}

export const PuzzleHint = ({ level }: PuzzleHintProps) => {
  const [showFullHint, setShowFullHint] = useState(false);
  
  // Получаем подсказку в зависимости от уровня
  const getHint = (puzzleLevel: number) => {
    // Различные типы подсказок в зависимости от типа головоломки
    const puzzleType = puzzleLevel % 3;
    
    const hints = {
      0: [ // Подсказки для числовых последовательностей
        "Обратите внимание на разницу между соседними числами.",
        "Есть ли постоянное изменение между каждым шагом?",
        "Попробуйте найти математический паттерн: сложение, умножение или более сложная формула."
      ],
      1: [ // Подсказки для логических головоломок
        "Попробуйте определить правило преобразования символов.",
        "Буквы могут представлять номера позиций в алфавите.",
        "Рассмотрите различные математические операции между элементами."
      ],
      2: [ // Подсказки для визуальных головоломок
        "Ищите симметрию или повторяющиеся шаблоны.",
        "Символы могут представлять значения или иметь другие скрытые свойства.",
        "Изучите отношения между предыдущими элементами для предсказания следующего."
      ]
    };
    
    return hints[puzzleType as keyof typeof hints];
  };
  
  const hints = getHint(level);
  
  return (
    <Card className="mb-6 p-4 bg-[#1A1F2C]/90 border-[#7E69AB]/30">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-medium text-[#9b87f5]">Подсказка</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => setShowFullHint(!showFullHint)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {showFullHint ? (
        <div className="mt-3 space-y-2">
          {hints.map((hint, index) => (
            <p key={index} className="text-[#D6BCFA]">{hint}</p>
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <p className="text-[#D6BCFA]">{hints[0]}</p>
          <Button 
            variant="link" 
            className="text-[#9b87f5] p-0 h-auto mt-2" 
            onClick={() => setShowFullHint(true)}
          >
            Больше подсказок...
          </Button>
        </div>
      )}
    </Card>
  );
};
