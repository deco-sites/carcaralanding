import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export interface FutureCard {
  /**
   * @title Card Title
   */
  title: string;
  /**
   * @title Card Description
   * @format textarea
   */
  description: string;
  /**
   * @title Card Color
   * @default vermelho
   */
  color?: "vermelho" | "amarelo" | "azul" | "verde";
  /**
   * @title Material Icon Name
   * @description Name of the Material Icon to display
   * @default robot
   */
  icon: string;
}

export interface Props {
  /**
   * @title Future Cards
   * @description List of cards to display in the grid
   */
  cards?: FutureCard[];
}

// Initialize with first card active (0)
const activeItem = signal<number>(0);

export default function FutureCards({
  cards = [
    {
      title: "Times de IA",
      description:
        "Empresas terão equipes dedicadas de Agentes de IA trabalhando junto com humanos, revolucionando a produtividade e inovação.",
      color: "azul",
      icon: "robot",
    },
    {
      title: "IA como Commodity",
      description:
        "Modelos de IA se tornarão commodities padronizadas, tornando capacidades avançadas acessíveis a todas as empresas.",
      color: "verde",
      icon: "deployed_code",
    },
    {
      title: "Programação Natural",
      description:
        "A programação evoluirá para interações em linguagem natural, tornando o desenvolvimento de software mais intuitivo e acessível.",
      color: "amarelo",
      icon: "code_blocks",
    },
    {
      title: "Interface Dinâmica",
      description:
        "Interfaces de usuário serão geradas em tempo real, adaptando-se perfeitamente às necessidades e contexto de cada usuário.",
      color: "vermelho",
      icon: "magic_exchange",
    },
  ],
}: Props) {

  const handleMouseEnter = (index: number) => {
    // Only change active item if hovering a different card
    if (activeItem.value !== index) {
      activeItem.value = index;
    }
  };

  // Function to render decorative squares row
  const renderSquaresRow = () => (
    <div className="relative w-full aspect-[4/1] mb-0">
      {/* Grid squares */}
      <div className="grid grid-cols-4 gap-0 w-full h-full">
        {[...Array(4)].map((_, i) => (
          <div
            key={`square-${i}`}
            className="w-full h-full bg-ca-800 opacity-30"
          />
        ))}
      </div>

      {/* Grid lines overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Vertical lines */}
        <div className="grid grid-cols-4 h-[120%] -top-[10%] relative">
          {[...Array(5)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-gradient-to-b from-transparent from-0% via-ca-400/30 via-[10%] to-ca-400/30 to-[90%]"
              style={{
                left: `${(i / 4) * 100}%`,
                maskImage:
                  "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
              }}
            />
          ))}
        </div>
        {/* Horizontal lines */}
        <div className="grid grid-rows-1 w-[120%] -left-[10%] relative">
          {[...Array(2)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-gradient-to-r from-transparent from-0% via-ca-400/30 via-[10%] to-ca-400/30 to-[90%]"
              style={{
                top: `${i * 100}%`,
                maskImage:
                  "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Layout */}
      <div className="relative hidden lg:grid grid-cols-10 grid-rows-5 gap-0 aspect-[2/1]">
        {cards.map((item, index) => {
          const gridPositions = [
            "col-[3/5] row-[1/3]", // AI Teams
            "col-[8/10] row-[1/3]", // AI as Commodity
            "col-[2/4] row-[4/6]", // Natural Programming
            "col-[7/9] row-[4/6]", // Dynamic UI
          ];

          const colorClasses = {
            vermelho: "bg-vermelho",
            amarelo: "bg-amarelo",
            azul: "bg-azul",
            verde: "bg-verde",
          };

          const textColorClasses = {
            vermelho: "text-vermelho",
            amarelo: "text-amarelo",
            azul: "text-azul",
            verde: "text-verde",
          };

          const isActive = activeItem.value === index;

          return (
            <button
              key={item.title}
              onMouseEnter={() => handleMouseEnter(index)}
              className={`relative ${gridPositions[index]} ${
                isActive ? colorClasses[item.color || "vermelho"] : "bg-ca-800"
              } cursor-pointer overflow-hidden z-10 transition-all duration-500 border-0 p-0 m-0 outline-none focus:outline-none text-left`}
            >
              <div className="absolute inset-0 p-6 flex flex-col items-start bg-center bg-no-repeat bg-cover">
                <span
                  className={`material-symbols-rounded text-2xl transition-colors duration-300 ${
                    isActive
                      ? item.color === "amarelo" ? "text-ca-900" : "text-white"
                      : textColorClasses[item.color || "vermelho"]
                  }`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {item.icon}
                </span>
                <h3
                  className={`font-normal mt-2 transition-all duration-500 ${
                    isActive
                      ? `text-xl ${
                        item.color === "amarelo" ? "text-ca-900" : "text-white"
                      }`
                      : "text-2xl text-ca-50"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm mt-2 max-w-[90%] transition-all duration-500 ${
                    isActive
                      ? item.color === "amarelo"
                        ? "opacity-100 transform translate-y-0 text-ca-900"
                        : "opacity-100 transform translate-y-0 text-white/90"
                      : "opacity-0 transform translate-y-4 text-ca-300"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}

        {/* Grid lines overlay - Desktop only */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical lines */}
          <div className="grid grid-cols-10 h-full">
            {[...Array(11)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-[120%] w-px bg-gradient-to-b from-transparent from-0% via-ca-400/30 via-[10%] to-ca-400/30 to-[90%]"
                style={{
                  left: `${(i / 10) * 100}%`,
                  top: "-10%",
                  maskImage:
                    "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                }}
              />
            ))}
          </div>
          {/* Horizontal lines */}
          <div className="grid grid-rows-5 w-full h-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-[120%] h-px bg-gradient-to-r from-transparent from-0% via-ca-400/30 via-[10%] to-ca-400/30 to-[90%]"
                style={{
                  top: `${(i / 5) * 100}%`,
                  left: "-10%",
                  maskImage:
                    "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col w-full lg:hidden space-y-0">
        {/* Initial horizontal line */}
        <div className="relative w-full h-px">
          <div
            className="absolute w-[120%] h-px bg-gradient-to-r from-transparent from-0% via-ca-400/30 via-[10%] to-ca-400/30 to-[90%]"
            style={{
              left: "-10%",
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          />
        </div>

        {cards.map((item, index) => {
          const colorClasses = {
            vermelho: "bg-vermelho",
            amarelo: "bg-amarelo",
            azul: "bg-azul",
            verde: "bg-verde",
          };

          return (
            <div key={item.title} className="mb-0">
              {/* Decorative squares row before each card */}
              {renderSquaresRow()}

              {/* Card - Always active in mobile */}
              <div
                className={`relative w-full ${
                  colorClasses[item.color || "vermelho"]
                } overflow-hidden z-10`}
              >
                <div className="p-4 flex flex-row items-start">
                  <div className="flex flex-col flex-1">
                    <h3
                      className={`font-normal text-lg ${
                        item.color === "amarelo" ? "text-ca-900" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm mt-1 ${
                        item.color === "amarelo"
                          ? "text-ca-900"
                          : "text-white/90"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <span
                    className={`material-symbols-rounded text-2xl ml-4 ${
                      item.color === "amarelo" ? "text-ca-900" : "text-white"
                    }`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Final row of squares */}
        {renderSquaresRow()}
      </div>
    </>
  );
}
