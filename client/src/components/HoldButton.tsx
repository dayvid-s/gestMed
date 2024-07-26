import { useState } from 'react';
import 'tailwindcss/tailwind.css';

function HoldButton() {
  const [isHolding, setIsHolding] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseDown = () => {
    setIsHolding(true);
    const id: NodeJS.Timeout = setTimeout(() => {
      console.log('Botão pressionado e segurado por 3 segundos');
      // Aqui você pode executar a função desejada
    }, 3000); // 3000 milissegundos = 3 segundos

    setTimerId(id);
  };

  const handleMouseUp = () => {
    setIsHolding(false);
    if (timerId) {
      clearTimeout(timerId);
      setTimerId(null);
    }
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Cancela o temporizador se o mouse sair do botão
      className={`transition-all duration-500 transform ease-in-out 
                  ${isHolding ? 'bg-red-500 scale-110 rotate-12 shadow-lg' : 'bg-blue-500 scale-100 rotate-0 shadow-none'} 
                  hover:bg-green-500 hover:scale-105 hover:rotate-6 hover:shadow-md 
                  text-white font-bold py-2 px-4 rounded-full`}
    >
      Pressione e segure
    </button>
  );
}

export default HoldButton;