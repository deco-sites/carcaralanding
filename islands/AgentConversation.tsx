/** @jsxImportSource preact */
import { useEffect, useRef, useState } from "preact/hooks";
import { animate, stagger } from "npm:@motionone/dom@10.18.0";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Head } from "$fresh/runtime.ts";

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

export interface AgentConversationProps {
  /**
   * Chat title
   * @default AI Agent
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
   * Chat icon image
   * @default https://placehold.co/200x200/B13431/FFFFFF?text=AI
   */
  chatIcon?: ImageWidget;
}

export default function AgentConversation({
  chatTitle = "AI Agent",
  chatSubtitle = "Sempre disponível",
  chatPlaceholder = "Digite sua mensagem...",
  chatMessages = [],
  chatIcon = "https://placehold.co/200x200/B13431/FFFFFF?text=AI",
}: AgentConversationProps) {
  const chatRef = useRef<HTMLDivElement>(null);
  const [typedMessages, setTypedMessages] = useState<string[]>([]);

  // Function to simulate typing effect for a message
  const simulateTyping = (message: string, messageIndex: number) => {
    let currentText = "";
    const messageLength = message.length;
    let charIndex = 0;
    let typingSpeed = 50; // Slightly slower for smoother appearance

    const typingInterval = setInterval(() => {
      if (charIndex < messageLength) {
        currentText += message.charAt(charIndex);
        setTypedMessages((prev) => {
          const newMessages = [...prev];
          newMessages[messageIndex] = currentText;
          return newMessages;
        });
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  };

  // Initialize typed messages array
  useEffect(() => {
    setTypedMessages(chatMessages.map(() => ""));
  }, [chatMessages]);

  useEffect(() => {
    if (!chatRef.current) return;

    const timer = setTimeout(() => {
      try {
        const chatMessageElements = chatRef.current?.querySelectorAll(
          ".chat-message",
        );

        if (chatMessageElements && chatMessageElements.length > 0) {
          chatMessageElements.forEach((msg) => {
            if (msg instanceof HTMLElement) {
              msg.style.opacity = "0";
              msg.style.display = "none";
            }
          });

          let delay = 400; // Shorter initial delay
          chatMessageElements.forEach((msg, index) => {
            if (
              msg instanceof HTMLElement &&
              index < chatMessageElements.length - 1
            ) {
              setTimeout(() => {
                try {
                  if (!chatRef.current) return;

                  msg.style.display = "flex";

                  // Smoother animation with longer duration and custom easing
                  animate(
                    msg,
                    {
                      opacity: [0, 1],
                      transform: ["translateY(20px)", "translateY(0)"],
                    },
                    {
                      easing: [0.16, 1, 0.3, 1], // Custom easing function for smoother animation
                      duration: 0.8, // Longer duration
                    },
                  );

                  if (
                    msg.classList.contains("ai-typing") && chatMessages[index]
                  ) {
                    const originalMessage = chatMessages[index].message || "";
                    setTimeout(() => {
                      simulateTyping(originalMessage, index);
                    }, 300); // Slight delay before typing starts
                  }

                  if (
                    index < chatMessageElements.length - 2 &&
                    !msg.classList.contains("ai-typing")
                  ) {
                    const typingIndicator = chatRef.current?.querySelector(
                      ".typing-indicator-container",
                    );
                    if (typingIndicator instanceof HTMLElement) {
                      setTimeout(() => {
                        if (!chatRef.current) return;
                        typingIndicator.style.display = "flex";
                        animate(
                          typingIndicator,
                          { opacity: [0, 1] },
                          { duration: 0.3 },
                        );

                        setTimeout(() => {
                          if (!chatRef.current) return;
                          animate(
                            typingIndicator,
                            { opacity: [1, 0] },
                            { duration: 0.3 },
                          );
                          setTimeout(() => {
                            if (!chatRef.current) return;
                            typingIndicator.style.display = "none";
                          }, 300);
                        }, 1500);
                      }, 400);
                    }
                  }
                } catch (error) {
                  console.error("Error animating chat message:", error);
                }
              }, delay);

              // Smoother timing between messages
              delay += (index % 2 === 0) ? 2800 : 2000;
            }
          });
        }

        // Smoother typing indicator animation
        const typingDots = chatRef.current?.querySelectorAll(
          ".typing-indicator span",
        );
        if (typingDots && typingDots.length > 0) {
          animate(
            typingDots,
            {
              transform: ["translateY(0)", "translateY(-6px)", "translateY(0)"],
            },
            {
              delay: stagger(0.2),
              easing: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
              duration: 0.8,
              repeat: Infinity,
            },
          );
        }
      } catch (error) {
        console.error("Error in animation effect:", error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [chatMessages]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
        />
      </Head>

      <div
        ref={chatRef}
        className="flex flex-col h-full"
      >
        {/* Chat Header */}
        <div className="flex items-center pb-3 border-b border-ca-700/80">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-vermelho flex items-center justify-center">
            <Image
              src={chatIcon}
              alt={chatTitle}
              width={32}
              height={32}
              class="w-full h-full object-cover"
            />
          </div>
          <div className="ml-2 sm:ml-3">
            <h3 className="text-ca-50 font-medium text-sm sm:text-base">
              {chatTitle}
            </h3>
            <p className="text-ca-300 text-xs">{chatSubtitle}</p>
          </div>
        </div>

        {/* Chat Messages - Responsive height and spacing */}
        <div className="py-3 sm:py-4 space-y-3 sm:space-y-4 min-h-[240px] sm:min-h-[300px] md:min-h-[400px] flex-grow flex flex-col justify-start overflow-y-auto">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.fromAI ? "ai-typing" : ""
              } flex ${!message.fromAI ? "justify-end" : ""}`}
              style={{ opacity: 0, display: "none" }}
            >
              <div
                className={`
                  ${
                  message.fromAI
                    ? "bg-ca-700 rounded-lg rounded-tl-none"
                    : "bg-vermelho/80 rounded-lg rounded-br-none"
                } px-3 py-2 sm:p-4 max-w-[95%] sm:max-w-[90%] transition-all duration-300
                `}
              >
                <p className="text-ca-100 text-sm sm:text-base">
                  {message.fromAI
                    ? (typedMessages[index] || "")
                    : message.message}
                </p>

                {message.hasList && message.listItems &&
                  message.listItems.length > 0 && (
                  <>
                    <p className="text-ca-100 mt-2 text-sm sm:text-base transition-opacity duration-300">
                      {message.fromAI &&
                          typedMessages[index]?.length >= message.message.length
                        ? "3 produtos estão com menos de 20% do estoque:"
                        : (message.fromAI
                          ? ""
                          : "3 produtos estão com menos de 20% do estoque:")}
                    </p>
                    <ul
                      className="text-ca-100 list-disc pl-5 mt-1 text-sm sm:text-base"
                      style={{
                        opacity: message.fromAI
                          ? (typedMessages[index]?.length >=
                              message.message.length
                            ? 1
                            : 0)
                          : 1,
                        transition: "opacity 0.5s ease",
                      }}
                    >
                      {message.listItems.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="transition-all duration-300"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    {message.afterListMessage && (
                      <p
                        className="text-ca-100 mt-2 text-sm sm:text-base"
                        style={{
                          opacity: message.fromAI
                            ? (typedMessages[index]?.length >=
                                message.message.length
                              ? 1
                              : 0)
                            : 1,
                          transition: "opacity 0.5s ease",
                        }}
                      >
                        {message.afterListMessage}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator Container */}
          <div
            className="chat-message typing-indicator-container flex items-center"
            style={{ opacity: 0, display: "none" }}
          >
            <div className="bg-ca-700 rounded-lg rounded-tl-none px-3 py-2 sm:px-4 sm:py-3 max-w-xs">
              <div className="typing-indicator flex space-x-1">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-ca-400 rounded-full">
                </span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-ca-400 rounded-full">
                </span>
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-ca-400 rounded-full">
                </span>
              </div>
            </div>
          </div>

          {/* Empty state message */}
          {chatMessages.length === 0 && (
            <div className="flex items-center justify-center h-full opacity-50 text-ca-400 text-center p-3 sm:p-6 text-sm sm:text-base">
              <p>Conversa com o AI Agent será exibida aqui</p>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="pt-3 border-t border-ca-700/80 mt-auto">
          <div className="flex items-stretch">
            <input
              type="text"
              placeholder={chatPlaceholder}
              className="flex-grow bg-ca-900 border border-ca-700 border-r-0  px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-ca-100 focus:outline-none focus:ring-1 focus:ring-vermelho"
              readOnly
            />
            <button className="bg-vermelho hover:bg-opacity-90 text-ca-50 px-3 sm:px-4 flex items-center justify-center transition-colors duration-200">
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
