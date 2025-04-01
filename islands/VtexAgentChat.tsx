/** @jsxImportSource preact */
import { useEffect, useRef, useState } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Head } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import { Message } from "site/sdk/messages.ts";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

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

  /**
   * Timestamp of the message
   */
  timestamp: number;
}

interface VtexAgentChatProps {
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
   * Initial chat messages to display in the interface
   */
  chatMessages?: Message[];

  /**
   * Chat icon image
   * @default https://placehold.co/200x200/B13431/FFFFFF?text=AI
   */
  chatIcon?: ImageWidget;

  /**
   * Optional callback for when a message is sent
   */
  onMessageSent?: (message: string) => Promise<void>;

  /**
   * Optional callback for when the AI response is received
   */
  onAIResponse?: (response: Message) => void;
}

// Create a global signal for chat messages that persists between renders
const chatMessagesSignal = signal<Message[]>([]);
const isTypingSignal = signal<boolean>(false);

export default function VtexAgentChat({
  chatTitle = "AI Agent VTEX",
  chatSubtitle = "Sempre disponível",
  chatPlaceholder = "Digite sua mensagem...",
  chatMessages = [],
  chatIcon = "https://placehold.co/200x200/B13431/FFFFFF?text=AI",
  onMessageSent,
  onAIResponse,
}: VtexAgentChatProps) {
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessagesSignal.value]);

  // Initialize chat messages if provided
  useEffect(() => {
    if (chatMessages.length > 0 && chatMessagesSignal.value.length === 0) {
      chatMessagesSignal.value = chatMessages;
    }
  }, [chatMessages]);

  // Handle message submission
  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      content: inputValue.trim(),
      role: "user",
      timestamp: Date.now().toString(),
      id: crypto.randomUUID(),
    };

    chatMessagesSignal.value = [...chatMessagesSignal.value, userMessage];
    setInputValue("");
    setIsLoading(true);
    isTypingSignal.value = true;

    try {
      // Call the onMessageSent callback if provided
      if (onMessageSent) {
        await onMessageSent(userMessage.content);
      }

      // Placeholder for API integration
      // This is where you would make the API call to get the AI response
      // For now, we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(
        "https://vtex-agent.deco.site/live/invoke/site/actions/chat/ai-response.ts",
        {
          method: "POST",
          body: JSON.stringify({
            message: userMessage.content,
            assistantUrl: "/catalog-specialist",
            threadId: crypto.randomUUID(),
            threadMessages: chatMessagesSignal.value.slice(-8),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      // Simulate AI response (replace this with actual API integration)
      const aiResponse: Message = {
        content: result.message,
        role: "assistant",
        timestamp: Date.now().toString(),
        id: crypto.randomUUID(),
      };

      chatMessagesSignal.value = [...chatMessagesSignal.value, aiResponse];

      // Call the onAIResponse callback if provided
      if (onAIResponse) {
        onAIResponse(aiResponse);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message to chat
      chatMessagesSignal.value = [...chatMessagesSignal.value, {
        content:
          "Sorry, there was an error processing your message. Please try again.",
        role: "assistant",
        timestamp: Date.now().toString(),
        id: crypto.randomUUID(),
      }];
    } finally {
      setIsLoading(false);
      isTypingSignal.value = false;
    }
  };

  // Handle input changes
  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  // Handle enter key press
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
        />
      </Head>

      <div
        class="bg-ca-900 border border-ca-700/80 shadow-xl p-3 sm:p-4 md:p-5 w-full mx-auto flex flex-col h-full"
      >
        {/* Chat Header */}
        <div class="flex items-center pb-3 border-b border-ca-700/80">
          <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-vermelho flex items-center justify-center">
            <Image
              src={chatIcon}
              alt={chatTitle}
              width={32}
              height={32}
              class="w-full h-full object-cover"
            />
          </div>
          <div class="ml-2 sm:ml-3">
            <h3 class="text-ca-50 font-medium text-sm sm:text-base">
              {chatTitle}
            </h3>
            <p class="text-ca-300 text-xs">{chatSubtitle}</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div ref={chatRef} class="py-3 sm:py-4 space-y-3 sm:space-y-4 min-h-[240px] sm:min-h-[300px] md:min-h-[400px] max-h-[400px] flex-grow flex flex-col justify-start overflow-y-auto">
          {chatMessagesSignal.value.map((message, index) => (
            <div
              key={message.timestamp}
              class={`chat-message flex ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              <div
                class={`
                  ${
                  message.role !== "user"
                    ? "bg-ca-700 rounded-lg rounded-tl-none"
                    : "bg-vermelho/80 rounded-lg rounded-br-none"
                } px-3 py-2 sm:p-4 max-w-[95%] sm:max-w-[90%]
                `}
              >
                {message.role !== "tool" && (
                  <p
                    class="text-ca-100 text-sm sm:text-base"
                    dangerouslySetInnerHTML={{
                      __html: marked(message.content, {}),
                    }}
                  />
                )}
                {message.role === "tool" && (
                  <p class="text-ca-100 text-sm sm:text-base">
                    {message.toolName}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTypingSignal.value && (
            <div class="chat-message typing-indicator-container flex items-center">
              <div class="bg-ca-700 rounded-lg rounded-tl-none px-3 py-2 sm:px-4 sm:py-3 max-w-xs">
                <div class="typing-indicator flex space-x-1">
                  <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-ca-400 rounded-full">
                  </span>
                  <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-ca-400 rounded-full">
                  </span>
                  <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-ca-400 rounded-full">
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Empty state message */}
          {chatMessagesSignal.value.length === 0 && (
            <div class="flex items-center justify-center h-full opacity-50 text-ca-400 text-center p-3 sm:p-6 text-sm sm:text-base">
              <p>Conversa com o AI Agent será exibida aqui</p>
            </div>
          )}

          {/* Invisible div for scrolling to bottom */}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div class="pt-3 border-t border-ca-700/80 mt-auto">
          <form onSubmit={handleSubmit} class="flex items-stretch">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={chatPlaceholder}
              disabled={isLoading}
              class="flex-grow bg-ca-900 border border-ca-700 border-r-0 px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-ca-100 focus:outline-none focus:ring-1 focus:ring-vermelho disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              class="bg-vermelho hover:bg-opacity-90 text-ca-50 px-3 sm:px-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span
                class="material-symbols-rounded"
                style={{
                  fontSize: "18px",
                  fontVariationSettings:
                    "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                send
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
