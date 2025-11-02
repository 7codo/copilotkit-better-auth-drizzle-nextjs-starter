"use client";

import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { AppendMessageOptions } from "@/lib/types/copilotkit";
// import { type Message } from "@copilotkit/runtime-client-gql";
import { GlobeIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Message } from "@copilotkit/shared";

const models = [
  { id: "gpt-4", name: "GPT-4" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "claude-2", name: "Claude 2" },
  { id: "claude-instant", name: "Claude Instant" },
  { id: "palm-2", name: "PaLM 2" },
  { id: "llama-2-70b", name: "Llama 2 70B" },
  { id: "llama-2-13b", name: "Llama 2 13B" },
  { id: "cohere-command", name: "Command" },
  { id: "mistral-7b", name: "Mistral 7B" },
];

interface InputAreaProps {
  sendMessage: (
    message: Message,
    options?: AppendMessageOptions
  ) => Promise<void>;
  isLoading?: boolean;
}

export const InputArea = ({ sendMessage, isLoading }: InputAreaProps) => {
  const [text, setText] = useState<string>("");
  const [model, setModel] = useState<string>(models[0].id);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    // For this example, only send the text (and model), ignoring files/attachments for now.
    // You can extend Message structure to support attachments if needed.
    // const userMessage = {
    //   id: Math.random().toString(36).substr(2, 9),
    //   role: "user",
    //   content: message.text || "",
    //   // Optionally add model, attachments, etc.
    // };

    // Fill required Message properties to match Message type
    // const userMessageFull: TextMessage = {
    //   id: Date.now().toString(),
    //   role: MessageRole.User,
    //   content: "hi",
    //   createdAt: new Date().toISOString(),
    // };

    await sendMessage({
      id: Date.now().toString(),
      role: "user",
      content: "hi",
    });

    setText(""); // Reset text input after sending
  };

  return (
    <div>
      <PromptInput globalDrop multiple onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputAttachments>
            {(attachment) => <PromptInputAttachment data={attachment} />}
          </PromptInputAttachments>
          <PromptInputTextarea
            onChange={(e) => setText(e.target.value)}
            ref={textareaRef}
            value={text}
          />
        </PromptInputBody>
        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger />
              <PromptInputActionMenuContent>
                <PromptInputActionAddAttachments />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>
            <PromptInputSpeechButton
              onTranscriptionChange={setText}
              textareaRef={textareaRef}
            />
            <PromptInputButton>
              <GlobeIcon size={16} />
              <span>Search</span>
            </PromptInputButton>
            <PromptInputModelSelect onValueChange={setModel} value={model}>
              <PromptInputModelSelectTrigger>
                <PromptInputModelSelectValue />
              </PromptInputModelSelectTrigger>
              <PromptInputModelSelectContent>
                {models.map((modelOption) => (
                  <PromptInputModelSelectItem
                    key={modelOption.id}
                    value={modelOption.id}
                  >
                    {modelOption.name}
                  </PromptInputModelSelectItem>
                ))}
              </PromptInputModelSelectContent>
            </PromptInputModelSelect>
          </PromptInputTools>
          <PromptInputSubmit />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  );
};
