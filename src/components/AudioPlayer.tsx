
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music, Play, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export const AudioPlayer = ({ autoPlay = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Создаем аудиоэлемент при монтировании
  useEffect(() => {
    audioRef.current = new Audio("/audio/happy-background.mp3");
    
    // Используем встроенное аудио как запасной вариант
    if (!audioRef.current.canPlayType("audio/mpeg")) {
      audioRef.current = new Audio("https://actions.google.com/sounds/v1/cartoon/slide_whistle_to_drum.ogg");
    }
    
    audioRef.current.loop = true;
    
    // Применяем начальную громкость
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    
    setAudioReady(true);
    
    // Очистка при размонтировании
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Эффект для управления проигрыванием
  useEffect(() => {
    if (!audioRef.current || !audioReady) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error("Failed to play:", err);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioReady]);
  
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
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
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
      
      <span className="text-sm text-[#8E9196]">
        {isPlaying ? "Играет" : "Пауза"}
      </span>
    </div>
  );
};
