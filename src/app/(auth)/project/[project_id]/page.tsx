import { Chatbox } from "@/components/chatbox";
import { Preview } from "@/components/preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProjectPage() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between h-9">
        <p>Actovator Logo</p>
        <Button>Share</Button>
      </div>
      <section
        className={cn("flex items-center gap-3", "screen-h-minus-header")}
      >
        <Chatbox />
      </section>
    </div>
  );
}
