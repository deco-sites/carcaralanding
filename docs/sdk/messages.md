### SDK: messages

Signals-based message store for chat UIs.

#### Import
```ts
import {
  chatMessagesSignal,
  addToolMessage,
  editToolMessage,
  addTextMessage,
  editTextMessage,
  type Message,
  type TextMessage,
  type ToolMessage,
} from "../../sdk/messages.ts";
```

#### Types
- Message = TextMessage | ToolMessage
- TextMessage: { role: "user" | "assistant"; content: string; username? }
- ToolMessage: { role: "tool"; toolName: string; isLoading: boolean }

#### API
- chatMessagesSignal: Signal<Message[]>
- addToolMessage(input): ToolMessage
- editToolMessage(id, isLoading): void
- addTextMessage(input): TextMessage
- editTextMessage(id, content): void

#### Usage
```ts
const tool = addToolMessage({ toolName: "search" });
// do work...
editToolMessage(tool.id, false);

const user = addTextMessage({ role: "user", content: "Hi" });
editTextMessage(user.id, "Hello there!" );
```