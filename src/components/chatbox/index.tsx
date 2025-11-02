"use client";
import { Messages } from "./messages";
import { InputArea } from "./input-area";
import { cn } from "@/lib/utils";

import { useCopilotChatHeadless_c } from "@copilotkit/react-core";

export const Chatbox = () => {
  const { messages, sendMessage, isLoading } = useCopilotChatHeadless_c();

  return (
    <div
      className={cn(
        "flex flex-col w-full border rounded-xl overflow-hidden h-full max-w-md"
      )}
    >
      <div className="flex-1 min-h-0">
        <Messages messages={messages} />
      </div>
      <div className="border-t p-4">
        <InputArea sendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};
