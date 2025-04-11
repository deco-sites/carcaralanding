/** @jsxImportSource preact */
import { useEffect, useRef, useState } from "preact/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Message {
  content: string;
  fromAI: boolean;
  hasList?: boolean;
  listItems?: string[];
  afterListMessage?: string;
}

interface WppConversationProps {
  chatTitle: string;
  chatSubtitle: string;
  chatIcon: ImageWidget;
}

const DEFAULT_MESSAGES: Message[] = [
  {
    content: "Olá! Gostaria de saber mais sobre os planos de assinatura.",
    fromAI: false,
  },
  {
    content: "Claro! Temos três planos disponíveis:",
    fromAI: true,
    hasList: true,
    listItems: [
      "Básico: Até 1000 mensagens/mês",
      "Pro: Até 5000 mensagens/mês",
      "Enterprise: Mensagens ilimitadas",
    ],
    afterListMessage: "Qual plano melhor atende suas necessidades?",
  },
];

export default function WppConversation({
  chatTitle,
  chatSubtitle,
  chatIcon,
}: WppConversationProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animate messages appearing one by one - only once
  useEffect(() => {
    if (hasAnimated) return;

    const showMessages = async () => {
      setHasAnimated(true);
      for (let i = 0; i < DEFAULT_MESSAGES.length; i++) {
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsTyping(false);
        setVisibleMessages((prev) => [...prev, DEFAULT_MESSAGES[i]]);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    };

    showMessages();
  }, [hasAnimated]);

  // Scroll to bottom when new messages appear
  useEffect(() => {
    if (messagesEndRef.current) {
      const scrollOptions = {
        behavior: "smooth" as ScrollBehavior,
        block: "end" as ScrollLogicalPosition,
      };
      messagesEndRef.current.scrollIntoView(scrollOptions);
    }
  }, [visibleMessages]);

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-[#111B21] rounded-lg overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 bg-[#202C33]">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={chatIcon}
            alt={chatTitle}
            width={40}
            height={40}
            class="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-[#E9EDF0] font-medium">{chatTitle}</h3>
          <p className="text-[#8696A0] text-sm">{chatSubtitle}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
        <div className="flex flex-col gap-4">
          {visibleMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.fromAI ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] p-2 rounded-lg ${
                  msg.fromAI
                    ? "bg-[#202C33] rounded-tl-none"
                    : "bg-[#005C4B] rounded-tr-none"
                }`}
              >
                <p className="text-[#E9EDF0] text-sm">{msg.content}</p>
                {msg.hasList && msg.listItems && (
                  <ul className="mt-2 ml-4 text-[#E9EDF0] text-sm list-disc">
                    {msg.listItems.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                )}
                {msg.afterListMessage && (
                  <p className="mt-2 text-[#E9EDF0] text-sm">
                    {msg.afterListMessage}
                  </p>
                )}
                <span className="text-[#8696A0] text-[0.65rem] text-right block mt-1">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#202C33] rounded-lg rounded-tl-none px-4 py-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#8696A0] rounded-full animate-bounce">
                  </span>
                  <span className="w-2 h-2 bg-[#8696A0] rounded-full animate-bounce [animation-delay:0.2s]">
                  </span>
                  <span className="w-2 h-2 bg-[#8696A0] rounded-full animate-bounce [animation-delay:0.4s]">
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-3 bg-[#202C33] flex items-center gap-4">
        <button className="text-[#8696A0] hover:text-[#E9EDF0] transition-colors">
          <span className="material-symbols-rounded">
            mood
          </span>
        </button>
        <button className="text-[#8696A0] hover:text-[#E9EDF0] transition-colors">
          <span className="material-symbols-rounded">
            attach_file
          </span>
        </button>
        <div className="flex-1 bg-[#2A3942] rounded-lg px-4 py-2 text-[#E9EDF0] text-sm">
          Digite uma mensagem
        </div>
        <button className="text-[#8696A0] hover:text-[#E9EDF0] transition-colors">
          <span className="material-symbols-rounded">
            mic
          </span>
        </button>
      </div>
    </div>
  );
}
