"use client";

import { CopilotKit } from "@copilotkit/react-core";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      agent="sample_agent"
      publicApiKey="ck_pub_295a512a5d04a3ffed0c6d3dd0189f54"
      showDevConsole={true}
    >
      {children}
    </CopilotKit>
  );
}
