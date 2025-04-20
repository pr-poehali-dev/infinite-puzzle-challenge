
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1A1F2C] text-white">
      <div className="text-center space-y-6 max-w-2xl px-4">
        <h1 className="text-6xl font-bold mb-2 text-[#9b87f5] animate-fade-in">ИнфиниУм</h1>
        <p className="text-xl text-[#D6BCFA] mb-8">
          Бесконечные головоломки для нестандартного мышления
        </p>
        
        <div className="grid gap-4 max-w-md mx-auto">
          <Link to="/puzzle">
            <Button 
              className="w-full bg-[#7E69AB] hover:bg-[#6E59A5] text-white text-lg py-6 hover-scale"
            >
              Начать игру
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            className="w-full border-[#7E69AB] text-[#9b87f5] hover:bg-[#1A1F2C]/30 text-lg py-6"
          >
            Как играть
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-[#8E9196] hover:text-[#D6BCFA] hover:bg-[#1A1F2C]/30 text-lg py-6"
          >
            Рейтинг игроков
          </Button>
        </div>

        <div className="mt-12 text-[#8E9196]">
          <p>Для тех, кто любит испытывать свой интеллект</p>
          <p className="text-sm mt-2">Сложность растет с каждым уровнем</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
