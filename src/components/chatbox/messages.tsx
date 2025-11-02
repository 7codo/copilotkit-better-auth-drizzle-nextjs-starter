"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message as ConversationMessage,
  MessageAvatar,
  MessageContent,
} from "@/components/ai-elements/message";
import { MessageSquareIcon } from "lucide-react";
import type { Message } from "@copilotkit/shared";

interface MessagesProps {
  messages: Message[];
}

const AVATARS: Record<string, { name: string; src: string }> = {
  user: {
    name: "You",
    src: "https://github.com/haydenbleasel.png", // or your user's avatar
  },
  assistant: {
    name: "AI Assistant",
    src: "https://github.com/openai.png",
  },
};

export const Messages = ({ messages }: MessagesProps) => {
  return (
    <Conversation className="relative size-full">
      <ConversationContent>
        {messages.length === 0 ? (
          <ConversationEmptyState
            icon={<MessageSquareIcon className="size-6" />}
            title="Start a conversation"
            description="Messages will appear here as the conversation progresses."
          />
        ) : (
          messages.map((msg) => {
            const avatar = AVATARS[msg.role] || {
              name: msg.role,
              src: "",
            };
            return (
              <ConversationMessage from={msg.role} key={msg.id}>
                <MessageContent>{msg.content}</MessageContent>
                <MessageAvatar name={avatar.name} src={avatar.src} />
              </ConversationMessage>
            );
          })
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
};
