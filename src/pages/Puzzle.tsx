
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle, RefreshCw, VolumeX, Volume2 } from "lucide-react";
import { PuzzleGame } from "@/components/PuzzleGame";
import { PuzzleHint } from "@/components/PuzzleHint";
import { PuzzleLevel } from "@/components/PuzzleLevel";
import { AudioPlayer } from "@/components/AudioPlayer";

const Puzzle = () => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleLevelComplete = () => {
    setScore((prev) => prev + level * 10);
    setLevel((prev) => prev + 1);
    setTimeLeft(Math.max(60, timeLeft + 15)); // Добавляем немного времени за правильное решение
    setShowHint(false);
    
    // Звуковые эффекты без использования Audio API
    if (audioEnabled) {
      try {
        // Используем Web Audio API как альтернативу
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
        oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.3); // A4
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        console.log("Звуковой эффект не поддерживается в этом браузере");
      }
    }
  };

  const handleRetry = () => {
    setLevel(1);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setShowHint(false);
    
    // Звуковые эффекты без использования Audio API
    if (audioEnabled) {
      try {
        // Используем Web Audio API как альтернативу
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(110, audioContext.currentTime); // A2
        oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.5); // A4
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (error) {
        console.log("Звуковой эффект не поддерживается в этом браузере");
      }
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Верхняя панель */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-[#9b87f5]">
              <ArrowLeft className="mr-2 h-4 w-4" /> Назад
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#9b87f5]">ИнфиниУм</h1>
            <p className="text-[#8E9196]">Головоломка для пытливых умов</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              className="text-[#9b87f5]"
              onClick={toggleAudio}
            >
              {audioEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              className="text-[#9b87f5]"
              onClick={() => setShowHint(!showHint)}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Аудиоплеер - только показываем при включенном звуке */}
        {audioEnabled && (
          <div className="mb-4">
            <AudioPlayer />
          </div>
        )}

        {/* Статистика */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1A1F2C]/60 p-3 rounded-lg border border-[#7E69AB]/30 text-center">
            <p className="text-[#8E9196]">Уровень</p>
            <p className="text-2xl font-bold text-[#9b87f5]">{level}</p>
          </div>
          <div className="bg-[#1A1F2C]/60 p-3 rounded-lg border border-[#7E69AB]/30 text-center">
            <p className="text-[#8E9196]">Счёт</p>
            <p className="text-2xl font-bold text-[#9b87f5]">{score}</p>
          </div>
          <div className="bg-[#1A1F2C]/60 p-3 rounded-lg border border-[#7E69AB]/30 text-center">
            <p className="text-[#8E9196]">Время</p>
            <p className={`text-2xl font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-[#9b87f5]'}`}>{timeLeft}с</p>
          </div>
        </div>

        {isPlaying ? (
          <>
            {/* Подсказка */}
            {showHint && <PuzzleHint level={level} />}
            
            {/* Основная игра */}
            <div className="bg-[#1A1F2C]/80 p-6 rounded-lg border border-[#7E69AB]/50 mb-6">
              <PuzzleLevel level={level} />
              <PuzzleGame level={level} onComplete={handleLevelComplete} />
            </div>
          </>
        ) : (
          /* Экран окончания игры */
          <div className="bg-[#1A1F2C]/80 p-8 rounded-lg border border-[#7E69AB]/50 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#9b87f5]">Игра окончена!</h2>
            <p className="text-xl mb-2">Ваш финальный счёт: <span className="font-bold">{score}</span></p>
            <p className="text-lg mb-6">Максимальный уровень: <span className="font-bold">{level}</span></p>
            
            <Button 
              onClick={handleRetry}
              className="bg-[#7E69AB] hover:bg-[#6E59A5] text-white px-8 py-4 text-lg hover-scale"
            >
              <RefreshCw className="mr-2 h-5 w-5" /> Начать заново
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Puzzle;
