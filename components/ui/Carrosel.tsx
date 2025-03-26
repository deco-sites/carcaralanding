import { useSignal } from "@preact/signals";
import { ImageWidget } from "apps/admin/widgets.ts";
import { useEffect } from "preact/hooks";

  /**
   * @title {{{title}}}
   */
export interface CarouselItem {
  /**
   * @title Identificador do item
   */
  id: string;
  /**
   * @title URL da imagem
   */
  imageUrl: ImageWidget;
  /**
   * @title Título do item
   */
  title: string;
}

interface Props {
  items: CarouselItem[];
  /**
   * @title Tempo de troca automática
   * @description Tempo em segundos para troca automática de slides (0 para desativar)
   */
  autoplayInterval?: number;
  /**
   * @title Exibir HUD de debug
   */
  debugHud?: boolean;
}

export default function Carousel({ items, autoplayInterval = 5, debugHud = false }: Props) {
  const selectedItem = useSignal(0);
  const isPaused = useSignal(false);

  const handleItemChange = (index: number) => {
    selectedItem.value = index;
    // Alternar a cor de fundo do body quando trocar de slide
    if (index % 2 === 0) {
      document.body.classList.remove("bg-blue-500");
      document.body.classList.add("bg-purple-300");
    } else {
      document.body.classList.remove("bg-purple-300");
      document.body.classList.add("bg-blue-500");
    }
  };

  useEffect(() => {
    if (autoplayInterval <= 0) return;
    const interval = autoplayInterval * 1000;

    // Configura o intervalo para trocar slides automaticamente
    const intervalId = setInterval(() => {
      if (!isPaused.value) {
        // Avança para o próximo slide
        const nextIndex = (selectedItem.value + 1) % items.length;
        handleItemChange(nextIndex);
      }
    }, interval);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(intervalId);
  }, [items.length, autoplayInterval]);

  // Handlers para pausar/retomar o autoplay quando o mouse está sobre o carrossel
  const handleMouseEnter = () => {
    isPaused.value = true;
  };

  const handleMouseLeave = () => {
    isPaused.value = false;
  };

  if (!items || items.length === 0) {
    return <div className="text-red-500 p-4">Nenhuma imagem disponível para o carrossel</div>;
  }

  // Função para calcular a posição relativa de um slide
  const getItemPosition = (currentIndex: number, itemIndex: number, totalItems: number) => {
    // Calcular a diferença entre índices
    let diff = itemIndex - currentIndex;
    
    // Ajustar para navegação circular (para frente ou para trás)
    if (diff > totalItems / 2) diff -= totalItems;
    if (diff < -totalItems / 2) diff += totalItems;
    
    if (diff === 0) return "selected";
    if (diff === 1 || (diff === -totalItems + 1)) return "next";
    if (diff === -1 || (diff === totalItems - 1)) return "previous";
    return "hidden";
  };

  return (
    <div 
      className="w-full flex flex-col justify-center items-center overflow-visible" 
      style={{ perspective: "1000px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cards */}
      <div className="relative w-full max-w-[1540px] h-[220px] sm:h-[280px] md:h-[320px] lg:h-[360px] flex items-end justify-center overflow-visible">
        {items.map((item, index) => {
          const position = getItemPosition(selectedItem.value, index, items.length);
          
          let transform = "transform-none";
          let zIndex = "z-30";
          let scale = "scale-100";
          let translateY = "translate-y-0";
          let opacity = "opacity-100";
          let filterOpacity = "opacity-0";  // Opacidade do filtro preto (inicialmente transparente)
          
          if (position === "previous") {
            transform = "-translate-x-[40%] sm:-translate-x-[50%] md:-translate-x-[60%] lg:-translate-x-[76%]";
            scale = "scale-75";
            zIndex = "z-20";
            translateY = "translate-y-[0%]";
            filterOpacity = "opacity-80";  // Filtro visível para slides laterais
          } else if (position === "next") {
            transform = "translate-x-[40%] sm:translate-x-[50%] md:translate-x-[60%] lg:translate-x-[76%]";
            scale = "scale-75";
            zIndex = "z-20";
            translateY = "translate-y-[0%]";
            filterOpacity = "opacity-80";  // Filtro visível para slides laterais
          } else if (position === "hidden") {
            zIndex = "z-0";
            opacity = "opacity-0";
          }
          
          // Cálculo de tamanhos responsivos
          const widthClass = "w-[280px] sm:w-[380px] md:w-[520px] lg:w-[665px]";
          const heightImageClass = "h-[188px] sm:h-[248px] md:h-[288px] lg:h-[360px]";
          const heightContainerClass = "h-[220px] sm:h-[280px] md:h-[320px] lg:h-[392px]";
          
          return (
            <div 
              className={`cursor-pointer absolute transition-all duration-700 ease-in-out ${scale} ${transform} ${zIndex} ${translateY} ${opacity} ${widthClass} ${heightContainerClass}`}
              onClick={() => handleItemChange(index)}
            >              
              {/* Imagem com tamanho fixo */}
              <div className={`relative overflow-hidden ${widthClass} ${heightImageClass}`}>
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Header com 32px de altura */}
              <div className={`w-full md:h-[32px] h-[24px] bg-[#3E4042] flex items-center justify-center text-white`}>
                <span className="text-xs sm:text-sm font-medium truncate px-2">{item.title}</span>
              </div>
              
              {/* Filtro preto que cobre imagem e header - agora com transição suave */}
              <div className={`absolute inset-0 bg-black transition-opacity duration-700 ease-in-out pointer-events-none ${filterOpacity}`}></div>
            </div>
          );
        })}
      </div>
      
      { debugHud && (
        <div className="md:flex items-center space-x-4 mt-4">
          <button 
            onClick={() => isPaused.value = !isPaused.value}
            className="text-sm text-gray-700 hover:text-gray-900 flex items-center"
          >
            {isPaused.value ? (
              <span>▶ Continuar</span>
            ) : (
              <span>❚❚ Pausar</span>
            )}
          </button>
          
          <div className="flex items-center space-x-1">
            {items.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => handleItemChange(idx)}
                className={`w-2 h-2 rounded-full transition-all ${selectedItem.value === idx ? 'bg-gray-800 w-4' : 'bg-gray-400'}`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 