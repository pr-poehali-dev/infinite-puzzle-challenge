
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export const AudioPlayer = ({ autoPlay = true }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Создаем аудиоэлемент при монтировании
  useEffect(() => {
    audioRef.current = new Audio("https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg");
    audioRef.current.loop = true;
    
    // Применяем начальную громкость
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    
    // Автоматическое проигрывание может быть заблокировано браузером,
    // поэтому оборачиваем в try-catch
    if (autoPlay) {
      try {
        audioRef.current.play().catch(() => {
          console.log("Autoplay prevented by browser, user interaction required");
          setIsPlaying(false);
        });
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    }
    
    // Очистка при размонтировании
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [autoPlay]);
  
  // Эффект для управления проигрыванием
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error("Failed to play:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  // Эффект для управления громкостью
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };
  
  return (
    <div className="flex items-center space-x-2 bg-[#1A1F2C]/60 p-2 rounded-lg border border-[#7E69AB]/30">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={togglePlayback}
        className="text-[#9b87f5] hover:bg-[#7E69AB]/20"
      >
        {isPlaying ? <Music className="h-5 w-5 animate-pulse" /> : <Music className="h-5 w-5" />}
      </Button>
      
      <div className="flex-1 flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-[#9b87f5] hover:bg-[#7E69AB]/20"
          onClick={() => setVolume(volume === 0 ? 80 : 0)}
        >
          {volume === 0 ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        
        <Slider
          value={[volume]}
          min={0}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24"
        />
      </div>
    </div>
  );
};
