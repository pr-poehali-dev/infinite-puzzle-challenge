
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  autoPlay?: boolean;
}

export const AudioPlayer = ({ autoPlay = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [audioReady, setAudioReady] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Создаем аудиоэлемент при монтировании
  useEffect(() => {
    // Используем встроенный элемент аудио вместо создания через new Audio()
    const audio = document.createElement('audio');
    
    // Пробуем несколько источников, если один не работает
    const sources = [
      "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg",
      "https://actions.google.com/sounds/v1/cartoon/slide_whistle_to_drum.ogg",
      "https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg"
    ];
    
    // Настройка аудио
    audio.loop = true;
    audio.volume = volume / 100;
    audio.src = sources[0]; // Начальный источник
    
    // Обработчики событий
    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
      setAudioReady(true);
    });
    
    audio.addEventListener('error', () => {
      // Если не удается загрузить текущий источник, пробуем следующий
      const currentIndex = sources.indexOf(audio.src);
      if (currentIndex < sources.length - 1) {
        audio.src = sources[currentIndex + 1];
      } else {
        console.error("Не удалось загрузить ни один аудиофайл");
      }
    });
    
    audioRef.current = audio;
    
    // Очистка при размонтировании
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Эффект для управления проигрыванием
  useEffect(() => {
    if (!audioRef.current || !audioReady || !audioLoaded) return;
    
    if (isPlaying) {
      // Обработка воспроизведения с user gesture
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.error("Не удалось воспроизвести аудио:", err.message);
          setIsPlaying(false);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioReady, audioLoaded]);
  
  // Эффект для управления громкостью
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const togglePlayback = () => {
    if (!audioLoaded) {
      // Если аудио еще не загружено, пробуем загрузить при клике
      if (audioRef.current) {
        audioRef.current.load();
      }
    }
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
        {!audioLoaded ? "Загрузка..." : isPlaying ? "Играет" : "Пауза"}
      </span>
    </div>
  );
};
