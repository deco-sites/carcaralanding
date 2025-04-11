/** @jsxImportSource preact */
import { useEffect, useRef, useState } from "preact/hooks";
import { animate, stagger } from "npm:@motionone/dom@10.18.0";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Head } from "$fresh/runtime.ts";
import Button from "../components/ui/Button.tsx";

export interface TicketResponse {
  /**
   * The suggested response content
   */
  content: string;
}

export interface CustomerTicket {
  /**
   * Ticket ID or number
   */
  ticketId: string;

  /**
   * Ticket subject
   */
  subject: string;

  /**
   * Customer message content
   */
  message: string;

  /**
   * AI suggested response
   */
  aiResponse: TicketResponse;
}

export interface SACAgentTicketProps {
  /**
   * Customer ticket data to display
   */
  ticket?: CustomerTicket;

  /**
   * Icon for the message bubble
   */
  messageIcon?: ImageWidget;

  /**
   * Edit response button text
   * @default "Editar"
   */
  editBtnText?: string;

  /**
   * Send response button text
   * @default "Enviar Resposta"
   */
  sendBtnText?: string;

  /**
   * Additional CSS classes for the container
   */
  class?: string;
}

export default function SACAgentTicket({
  ticket = {
    ticketId: "#24601",
    subject: "Solicitação de Rastreamento de Pedido",
    message:
      "Olá, fiz um pedido (#ORD-9283) na semana passada e não recebi nenhuma atualização. Você poderia me informar onde está meu pacote? Obrigado.",
    aiResponse: {
      content:
        "Olá! Acabei de verificar seu pedido (#ORD-9283) e posso ver que ele foi enviado ontem via Expresso. Seu número de rastreamento é TRK-82931, e atualmente está em trânsito saindo do nosso centro de distribuição. A entrega estimada é amanhã antes das 20h. Você pode acompanhar em tempo real no [link de rastreamento]. Me avise se precisar de mais alguma coisa!",
    },
  },
  messageIcon = "https://placehold.co/200x200/B13431/FFFFFF?text=AI",
  editBtnText = "Editar",
  sendBtnText = "Enviar Resposta",
  class: className = "",
}: SACAgentTicketProps) {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [words, setWords] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [visibleWords, setVisibleWords] = useState<number>(0);

  // Split AI response into words and animate them
  useEffect(() => {
    if (!ticket.aiResponse.content) return;

    // Split the response into words
    const allWords = ticket.aiResponse.content.split(/\s+/).filter(Boolean);
    setWords(allWords);
    setIsTyping(true);
    setVisibleWords(0);

    // Animate words appearance
    let currentWord = 0;
    const wordInterval = setInterval(() => {
      if (currentWord < allWords.length) {
        setVisibleWords(currentWord + 1);
        currentWord++;
      } else {
        clearInterval(wordInterval);
        setIsTyping(false);
      }
    }, 100); // Adjust timing for word appearance

    return () => {
      clearInterval(wordInterval);
      setWords([]);
      setVisibleWords(0);
      setIsTyping(false);
    };
  }, [ticket.aiResponse.content]);

  // Animate messages appearance
  useEffect(() => {
    if (!ticketRef.current) return;

    const messageElements = ticketRef.current.querySelectorAll(".chat-message");
    messageElements.forEach((msg) => {
      if (msg instanceof HTMLElement) {
        msg.style.opacity = "0";
        msg.style.transform = "translateY(10px)";
      }
    });

    // Animate customer message first
    setTimeout(() => {
      const customerMessage = messageElements[0];
      if (customerMessage instanceof HTMLElement) {
        animate(
          customerMessage,
          {
            opacity: [0, 1],
            transform: ["translateY(10px)", "translateY(0)"],
          },
          {
            duration: 0.5,
            easing: "ease-out",
          },
        );
      }
    }, 300);

    // Then animate AI message container
    setTimeout(() => {
      const aiMessage = messageElements[1];
      if (aiMessage instanceof HTMLElement) {
        animate(
          aiMessage,
          {
            opacity: [0, 1],
            transform: ["translateY(10px)", "translateY(0)"],
          },
          {
            duration: 0.5,
            easing: "ease-out",
          },
        );
      }
    }, 800);
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
        />
        <style>
          {`
            .word-appear {
              opacity: 0;
              transform: translateY(5px);
              transition: opacity 0.2s ease-out, transform 0.2s ease-out;
              display: inline-block;
            }
            .word-appear.visible {
              opacity: 1;
              transform: translateY(0);
            }
            .chat-bubble {
              word-break: break-word;
              white-space: normal;
            }
          `}
        </style>
      </Head>

      <div ref={ticketRef} className={`flex flex-col h-full ${className}`}>
        {/* Chat Header */}
        <div className="flex items-center pb-3 border-b border-ca-700/80">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-vermelho flex items-center justify-center">
            <Image
              src={messageIcon}
              alt="AI Agent SAC"
              width={32}
              height={32}
              class="w-full h-full object-cover"
            />
          </div>
          <div className="ml-2 sm:ml-3">
            <h3 className="text-ca-50 font-medium text-sm sm:text-base">
              AI Agent SAC
            </h3>
            <p className="text-ca-300 text-xs">Sempre disponível</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="py-3 sm:py-4 space-y-3 sm:space-y-4 min-h-[240px] sm:min-h-[300px] md:min-h-[400px] flex-grow flex flex-col justify-start overflow-y-auto">
          {/* Customer Message */}
          <div className="chat-message flex justify-end">
            <div className="bg-vermelho/80 rounded-lg rounded-br-none px-3 py-2 sm:p-4 max-w-[95%] sm:max-w-[90%]">
              <p className="text-ca-100 text-sm sm:text-base bg-transparent chat-bubble">
                {ticket.message}
              </p>
            </div>
          </div>

          {/* AI Response */}
          <div className="chat-message flex">
            <div className="bg-ca-700 rounded-lg rounded-tl-none px-3 py-2 sm:p-4 max-w-[95%] sm:max-w-[90%]">
              <p className="text-ca-100 text-sm sm:text-base bg-transparent chat-bubble relative">
                <span className="inline-flex flex-wrap">
                  {words.map((word, index) => (
                    <span
                      key={index}
                      className={`word-appear ${
                        index < visibleWords ? "visible" : ""
                      } ${index > 0 ? "ml-[0.25em]" : ""}`}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="pt-3 border-t border-ca-700/80 mt-auto">
          <div className="flex items-stretch">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="flex-grow bg-ca-900 border border-ca-700 border-r-0 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-ca-100 focus:outline-none focus:ring-1 focus:ring-vermelho"
              readOnly
            />
            <button className="bg-vermelho hover:bg-opacity-90 text-ca-50 px-3 sm:px-4 flex items-center justify-center">
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize: "18px",
                  fontVariationSettings:
                    "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                send
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
