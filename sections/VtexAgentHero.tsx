/** @jsxImportSource preact */
import { useEffect, useRef } from "preact/hooks";
import { animate, stagger } from "npm:@motionone/dom@10.18.0";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Body, Eyebrow, HeroTitle } from "../components/ui/Typography.tsx";
import Button from "../components/ui/Button.tsx";
import Badge from "../components/ui/Badge.tsx";
import { ContentContainer } from "../components/Layout.tsx";

export interface BackgroundElement {
  /**
   * Background image
   */
  image: ImageWidget;

  /**
   * Opacity of the background element (0-100)
   * @default 25 for first element, 100 for second element
   */
  opacity: number;

  /**
   * Rotation angle in degrees
   * @default 167.02 for first element, -4.51 for second element
   */
  rotation: number;

  /**
   * Position from top (percentage or px)
   * @default "33%" for first element, "12px" for second element
   */
  top: string;

  /**
   * Position from left or right (percentage or px)
   * @default { right: "0" } for first element, { left: "-25%" } for second element
   */
  position: {
    left?: string;
    right?: string;
  };

  /**
   * z-index value
   * @default -10 for first element, -20 for second element
   */
  zIndex: number;

  /**
   * Width of the background element (percentage or px)
   * @default "100%" by default, "66%" for large screens for first element, "100%" for second element
   */
  width: string;
}

interface ChatMessage {
  /**
   * The content of the message
   */
  message: string;

  /**
   * Whether the message is from the AI (true) or user (false)
   */
  fromAI: boolean;

  /**
   * Whether the message has a list of items
   */
  hasList?: boolean;

  /**
   * List items if hasList is true
   */
  listItems?: string[];

  /**
   * Additional message to show after list items
   */
  afterListMessage?: string;
}

export interface VtexAgentHeroProps {
  /**
   * @format rich-text
   * @default Gerencie sua Loja VTEX por <span class='text-vermelho'>Conversa</span>
   */
  title?: string;

  /**
   * @default O AI Agent VTEX integra todas as operações do seu e-commerce em um assistente virtual inteligente que funciona nas plataformas que você já utiliza.
   */
  description?: string;

  /**
   * @default AI Agent VTEX
   */
  badge?: string;

  /**
   * Primary CTA text
   * @default Agende uma Demo
   */
  primaryCtaText?: string;

  /**
   * Primary CTA URL
   * @default #cta-final
   */
  primaryCtaHref?: string;

  /**
   * Secondary CTA text
   * @default Saiba Mais
   */
  secondaryCtaText?: string;

  /**
   * Secondary CTA URL
   * @default #features
   */
  secondaryCtaHref?: string;

  /**
   * First background decorative element (upper right)
   */
  backgroundElement1?: Partial<BackgroundElement>;

  /**
   * Second background decorative element (lower left)
   */
  backgroundElement2?: Partial<BackgroundElement>;

  /**
   * Whether to show background elements
   * @default true
   */
  showBackgroundElements?: boolean;

  /**
   * Chat title
   * @default AI Agent VTEX
   */
  chatTitle?: string;

  /**
   * Chat subtitle
   * @default Sempre disponível
   */
  chatSubtitle?: string;

  /**
   * Chat placeholder text
   * @default Digite sua mensagem...
   */
  chatPlaceholder?: string;

  /**
   * Chat messages to display in the interface
   */
  chatMessages?: ChatMessage[];

  /**
   * Whether to show particles animation
   * @default true
   */
  showParticles?: boolean;
}

export default function VtexAgentHero({
  title =
    "Gerencie sua Loja VTEX por <span class='text-vermelho'>Conversa</span>",
  description =
    "O AI Agent VTEX integra todas as operações do seu e-commerce em um assistente virtual inteligente que funciona nas plataformas que você já utiliza.",
  badge = "AI Agent VTEX",
  primaryCtaText = "Agende uma Demo",
  primaryCtaHref = "#cta-final",
  secondaryCtaText = "Saiba Mais",
  secondaryCtaHref = "#features",
  backgroundElement1 = {
    image: "https://placehold.co/1953x1265/282B2E/282B2E",
    opacity: 25,
    rotation: 167.02,
    top: "33%",
    position: { right: "0" },
    zIndex: -10,
    width: "100%",
  },
  backgroundElement2 = {
    image: "https://placehold.co/3505x2270/B13431/B13431",
    opacity: 100,
    rotation: -4.51,
    top: "12px",
    position: { left: "-25%" },
    zIndex: -20,
    width: "100%",
  },
  showBackgroundElements = true,
  chatTitle = "AI Agent VTEX",
  chatSubtitle = "Sempre disponível",
  chatPlaceholder = "Digite sua mensagem...",
  chatMessages = [
    {
      message: "Olá! Como posso ajudar com a sua loja VTEX hoje?",
      fromAI: true,
    },
    {
      message: "Qual o status do estoque dos produtos em promoção?",
      fromAI: false,
    },
    {
      message: "Verificando estoque dos 12 produtos em promoção...",
      fromAI: true,
      hasList: true,
      listItems: [
        "Camiseta Verão (5 unidades)",
        "Tênis Runner (8 unidades)",
        "Boné Urban (12 unidades)",
      ],
      afterListMessage:
        "Gostaria que eu criasse um pedido de reposição para esses itens?",
    },
  ],
  showParticles = true,
}: VtexAgentHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Slight delay to ensure DOM is ready
    setTimeout(() => {
      // Animate chat messages - ensure they're visible
      const chatMessages = sectionRef.current?.querySelectorAll(
        ".chat-message",
      );
      if (chatMessages && chatMessages.length > 0) {
        // First make all messages visible
        chatMessages.forEach((msg) => {
          if (msg instanceof HTMLElement) {
            msg.style.opacity = "1";
          }
        });

        // Then animate them
        animate(
          chatMessages,
          {
            opacity: [0, 1],
            transform: ["translateY(10px)", "translateY(0)"],
          },
          {
            delay: stagger(600, { start: 100 }),
            easing: [0.25, 0.1, 0.25, 1],
            duration: 0.8,
          },
        );
      }

      // Animate typing indicator dots
      const typingDots = sectionRef.current?.querySelectorAll(
        ".typing-indicator span",
      );
      if (typingDots && typingDots.length > 0) {
        animate(
          typingDots,
          { transform: ["translateY(0)", "translateY(-5px)", "translateY(0)"] },
          {
            delay: stagger(0.15),
            easing: [0.42, 0, 0.58, 1],
            duration: 0.5,
            repeat: Infinity,
          },
        );
      }

      // Hero content animations
      const heroContent = sectionRef.current?.querySelectorAll(
        ".hero-content > *",
      );
      if (heroContent && heroContent.length > 0) {
        animate(
          heroContent,
          {
            opacity: [0, 1],
            transform: ["translateY(20px)", "translateY(0)"],
          },
          {
            delay: stagger(200, { start: 300 }),
            easing: [0.25, 0.1, 0.25, 1],
            duration: 0.8,
          },
        );
      }
    }, 100);

    // Initialize particles
    if (showParticles && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Particles array
      const particles: {
        x: number;
        y: number;
        radius: number;
        color: string;
        speed: number;
        direction: number;
      }[] = [];

      // Colors from Carcará theme
      const colors = ["#B13431", "#CC8B43", "#557247", "#4C7780"];

      // Resize handler
      const resizeCanvas = () => {
        if (!canvas || !sectionRef.current) return;
        canvas.width = sectionRef.current.offsetWidth;
        canvas.height = sectionRef.current.offsetHeight;
        initParticles();
      };

      // Initialize particles
      const initParticles = () => {
        particles.length = 0;
        const particleCount = Math.floor(
          (canvas.width * canvas.height) / 15000,
        );

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 0.5 + 0.1,
            direction: Math.random() * Math.PI * 2,
          });
        }
      };

      // Animate particles
      const animateParticles = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          ctx.globalAlpha = 0.2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Move particle
          p.x += Math.cos(p.direction) * p.speed;
          p.y += Math.sin(p.direction) * p.speed;

          // Handle collisions with edges
          if (p.x < 0 || p.x > canvas.width) {
            p.direction = Math.PI - p.direction;
          }
          if (p.y < 0 || p.y > canvas.height) p.direction = -p.direction;
        });

        requestAnimationFrame(animateParticles);
      };

      // Add resize listener
      window.addEventListener("resize", resizeCanvas);

      // Initialize
      resizeCanvas();
      animateParticles();

      // Cleanup
      return () => {
        window.removeEventListener("resize", resizeCanvas);
      };
    }
  }, [showParticles]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-ca-900 overflow-hidden"
    >
      {/* Particle canvas */}
      {showParticles && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 opacity-30"
          aria-hidden="true"
        >
        </canvas>
      )}

      {/* Decorative background elements - positioned with proper z-index */}
      {showBackgroundElements && (
        <>
          <div
            className="absolute w-[100rem] sm:w-[200rem] -rotate-[8deg] top-80 sm:top-0 -right-96 md:-right-[60rem] z-0"
            style={{
              left: backgroundElement1?.position?.left,
            }}
          >
            {backgroundElement1?.image && (
              <Image
                src={backgroundElement1.image}
                alt="Background decoration"
                width={1953}
                height={1265}
                class="w-full h-auto"
              />
            )}
          </div>
          <div
            className="absolute -top-[50rem] sm:-top-[90rem] sm:w-[200rem] w-[100rem] -rotate-[8deg] -left-96 sm:-left-[44rem] z-0"
            style={{
              right: backgroundElement2?.position?.right,
            }}
          >
            {backgroundElement2?.image && (
              <Image
                src={backgroundElement2.image}
                alt="Background decoration"
                width={3505}
                height={2270}
                class="w-full h-auto"
              />
            )}
          </div>
        </>
      )}

      {/* Content container with two columns layout */}
      <ContentContainer className="relative z-10 py-16 sm:py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12 px-4 md:px-8">
          {/* Left column - Stacked text content */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="hero-content flex flex-col items-start gap-6">
              {/* Badge */}
              <Badge
                variant="outline"
                color="secondary"
                size="md"
                withDot={true}
                dotColor="primary"
              >
                {badge}
              </Badge>

              {/* Title */}
              <h1
                className="hero-title font-serif text-5xl md:text-6xl lg:text-[5.25rem] text-ca-50 tracking-[-0.01em] text-left w-full"
                dangerouslySetInnerHTML={{
                  __html:
                    `<div class="space-y-0 leading-[1] md:leading-[1]">${title}</div>`,
                }}
              />

              {/* Description */}
              <Body class="text-left text-ca-300 max-w-md">
                {description}
              </Body>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-3 mt-4">
                <Button
                  href={primaryCtaHref}
                  variant="primary"
                  size="md"
                >
                  {primaryCtaText}
                </Button>

                <Button
                  href={secondaryCtaHref}
                  variant="outline"
                  size="md"
                >
                  {secondaryCtaText}
                </Button>
              </div>
            </div>
          </div>

          {/* Right column - Chat Interface */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="bg-ca-800 rounded-lg border border-ca-700 shadow-lg p-4 max-w-md mx-auto">
              {/* Chat Header */}
              <div className="flex items-center pb-4 border-b border-ca-700">
                <div className="w-8 h-8 rounded-full bg-vermelho flex items-center justify-center text-ca-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8a1 1 0 01-1 1H9a1 1 0 010-2h2a1 1 0 011 1zm-.25 6a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-ca-50 font-medium">{chatTitle}</h3>
                  <p className="text-ca-300 text-xs">{chatSubtitle}</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="py-4 space-y-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`chat-message flex ${
                      !message.fromAI ? "justify-end" : ""
                    }`}
                    style={{ opacity: 0 }}
                  >
                    <div
                      className={`
                        ${
                        message.fromAI
                          ? "bg-ca-700 rounded-lg rounded-tl-none"
                          : "bg-vermelho bg-opacity-20 rounded-lg rounded-tr-none"
                      } px-4 py-2 max-w-xs
                      `}
                    >
                      <p className="text-ca-100">{message.message}</p>

                      {message.hasList && message.listItems &&
                        message.listItems.length > 0 && (
                        <>
                          <p className="text-ca-100 mt-2">
                            3 produtos estão com menos de 20% do estoque:
                          </p>
                          <ul className="text-ca-100 list-disc pl-5 mt-1">
                            {message.listItems.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                          {message.afterListMessage && (
                            <p className="text-ca-100 mt-2">
                              {message.afterListMessage}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                <div
                  className="chat-message flex items-center"
                  style={{ opacity: 0 }}
                >
                  <div className="bg-ca-700 rounded-lg rounded-tl-none px-4 py-3 max-w-xs">
                    <div className="typing-indicator flex space-x-1">
                      <span className="w-2 h-2 bg-ca-400 rounded-full"></span>
                      <span className="w-2 h-2 bg-ca-400 rounded-full"></span>
                      <span className="w-2 h-2 bg-ca-400 rounded-full"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="pt-3 border-t border-ca-700">
                <div className="flex">
                  <input
                    type="text"
                    placeholder={chatPlaceholder}
                    className="flex-grow bg-ca-900 border border-ca-700 rounded-l-md px-4 py-2 text-ca-100 focus:outline-none focus:ring-1 focus:ring-vermelho"
                    readOnly
                  />
                  <button className="bg-vermelho hover:bg-opacity-90 text-ca-50 rounded-r-md px-4 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </section>
  );
}
