import { signal } from "@preact/signals";

interface BaseMessage {
  id: string;
  timestamp: string;
}

export interface ToolMessage extends BaseMessage {
  role: "tool";
  toolName: string;
  isLoading: boolean;
}

export interface TextMessage extends BaseMessage {
  role: "user" | "assistant";
  content: string;
  username?: string;
}

export type Message = TextMessage | ToolMessage;

// Create a global signal for chat messages that persists between renders
export const chatMessagesSignal = signal<Message[]>([]);

export function addToolMessage(
    message: Omit<ToolMessage, "id" | "timestamp" | "isLoading" | "role">,
  ) {
    const newMessage: ToolMessage = {
      ...message,
      role: "tool",
      id: crypto.randomUUID(),
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isLoading: true,
    };
  
    chatMessagesSignal.value = [...chatMessagesSignal.value, newMessage];
  
    return newMessage;
  }
  
  export function editToolMessage(id: string, isLoading: boolean) {
    chatMessagesSignal.value = chatMessagesSignal.value.map((message) => {
      if (message.id === id && message.role === "tool") {
        return { ...message, isLoading };
      }
  
      return message;
    });
  }
  
  export function addTextMessage(message: Omit<TextMessage, "id" | "timestamp">) {
    const newMessage: TextMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  
    chatMessagesSignal.value = [...chatMessagesSignal.value, newMessage];
  
    return newMessage;
  }
  
  export function editTextMessage(id: string, content: string) {
    chatMessagesSignal.value = chatMessagesSignal.value.map((message) => {
      if (message.id === id) {
        return { ...message, content };
      }
  
      return message;
    });
  }