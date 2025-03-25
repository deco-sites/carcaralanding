import { H1 } from "../components/ui/Typography.tsx";
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";
import FutureCards from "../islands/FutureCards.tsx";

export interface Props {
  /**
   * @title Badge Text
   * @description Text displayed in the badge above the title
   * @default "O Futuro"
   */
  badgeText?: string;

  /**
   * @title Section Title
   * @description Main title of the section
   * @default "O Futuro da IA está Aqui"
   */
  title?: string;

  /**
   * @title Section Description
   * @description Text displayed below the title
   * @default "Descubra como a IA está transformando a forma como trabalhamos e criamos. Essas tendências não são apenas previsões - elas já estão se tornando realidade."
   */
  description?: string;

  /**
   * @title Card 1 - Times de IA
   * @description Content for the first card (blue)
   */
  card1: {
    /**
     * @default "Times de IA"
     */
    title: string;
    /**
     * @format textarea
     * @default "Empresas terão equipes dedicadas de Agentes de IA trabalhando junto com humanos, revolucionando a produtividade e inovação."
     */
    description: string;
  };

  /**
   * @title Card 2 - IA como Commodity
   * @description Content for the second card (green)
   */
  card2: {
    /**
     * @default "IA como Commodity"
     */
    title: string;
    /**
     * @format textarea
     * @default "Modelos de IA se tornarão commodities padronizadas, tornando capacidades avançadas acessíveis a todas as empresas."
     */
    description: string;
  };

  /**
   * @title Card 3 - Programação Natural
   * @description Content for the third card (yellow)
   */
  card3: {
    /**
     * @default "Programação Natural"
     */
    title: string;
    /**
     * @format textarea
     * @default "A programação evoluirá para interações em linguagem natural, tornando o desenvolvimento de software mais intuitivo e acessível."
     */
    description: string;
  };

  /**
   * @title Card 4 - Interface Dinâmica
   * @description Content for the fourth card (red)
   */
  card4: {
    /**
     * @default "Interface Dinâmica"
     */
    title: string;
    /**
     * @format textarea
     * @default "Interfaces de usuário serão geradas em tempo real, adaptando-se perfeitamente às necessidades e contexto de cada usuário."
     */
    description: string;
  };
}

export default function TheFuture({
  badgeText = "O Futuro",
  title = "O Futuro da IA está Aqui",
  description =
    "Descubra como a IA está transformando a forma como trabalhamos e criamos.",
  card1 = {
    title: "Times de IA",
    description:
      "Empresas terão equipes dedicadas de Agentes de IA trabalhando junto com humanos, revolucionando a produtividade e inovação.",
  },
  card2 = {
    title: "IA como Commodity",
    description:
      "Modelos de IA se tornarão commodities padronizadas, tornando capacidades avançadas acessíveis a todas as empresas.",
  },
  card3 = {
    title: "Programação Natural",
    description:
      "A programação evoluirá para interações em linguagem natural, tornando o desenvolvimento de software mais intuitivo e acessível.",
  },
  card4 = {
    title: "Interface Dinâmica",
    description:
      "Interfaces de usuário serão geradas em tempo real, adaptando-se perfeitamente às necessidades e contexto de cada usuário.",
  },
}: Props) {
  const cards = [
    {
      ...card1,
      color: "azul" as const,
      icon: "robot",
    },
    {
      ...card2,
      color: "verde" as const,
      icon: "deployed_code",
    },
    {
      ...card3,
      color: "amarelo" as const,
      icon: "code_blocks",
    },
    {
      ...card4,
      color: "vermelho" as const,
      icon: "magic_exchange",
    },
  ];

  return (
    <section className="relative w-full bg-ca-900 overflow-hidden">
      <ContentContainer className="py-24 px-4 md:px-16">
        <div className="flex flex-col justify-start items-center gap-16">
          <div className="w-full max-w-[883px] flex flex-col justify-start items-center gap-6">
            <Badge
              variant="outline"
              color="secondary"
              withDot
              dotColor="primary"
            >
              {badgeText}
            </Badge>
            <H1 className="text-center text-ca-50 text-4xl sm:text-5xl lg:text-6xl font-normal font-serif">
              {title}
            </H1>
            <p className="text-center max-w-[280px] sm:max-w-sm md:max-w-md text-ca-300 px-4 sm:px-0">
              {description}
            </p>
          </div>

          {/* Grid Layout */}
          <div className="relative w-full">
            {/* Interactive Cards */}
            <FutureCards cards={cards} />
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
