import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageCircle,
  FileText,
  User,
  SparkleIcon,
  Copy,
  Send,
} from "lucide-react";

export default function AiScriptGenerator() {
  const items = [
    {
      name: "Sarah Johnson",
      tone: "professional",
      snippet:
        "Hi Sarah, Following up on our discussion about the implementation timeline...",
      time: "1 hour ago",
      icon: MessageCircle,
      bg: "bg-purple-50 text-purple-600",
    },
    {
      name: "Michael Chen",
      tone: "friendly",
      snippet:
        "Hi Michael, I hope you had a chance to review the demo video...",
      time: "3 hours ago",
      icon: FileText,
      bg: "bg-green-50 text-green-600",
    },
    {
      name: "Emily Davis",
      tone: "urgent",
      snippet:
        "Hi Emily, I wanted to reach out regarding the competitive analysis...",
      time: "5 hours ago",
      icon: User,
      bg: "bg-red-50 text-red-600",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex items-center justify-between border-b">
        <div>
          <CardTitle>✨ AI Script Generator</CardTitle>
          <CardDescription>Recent generated scripts</CardDescription>
        </div>

        <div className="flex items-center space-x-2" data-slot="card-action">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <SparkleIcon />
            Generate
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div
              key={it.name}
              className="flex items-center justify-between border rounded-md p-4"
            >
              <div className="flex items-start space-x-3">
                <Avatar className={`h-9 w-9 ${it.bg}`}>
                  <AvatarFallback className="text-sm">
                    <Icon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>

                <div>
                  <div className="font-medium text-foreground">{it.name}</div>
                  <div className="text-sm text-muted-foreground max-w-xl">
                    {it.snippet}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {it.time}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    it.tone === "professional"
                      ? "bg-blue-100 text-blue-700"
                      : it.tone === "friendly"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {it.tone}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    className="p-1 rounded hover:bg-muted/40"
                    aria-label="copy"
                    title="Copy"
                  >
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </button>

                  <button
                    className="p-1 rounded hover:bg-muted/40"
                    aria-label="send"
                    title="Send"
                  >
                    <Send className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>

      <CardFooter className="justify-center">
        <a className="text-primary hover:underline">View All Scripts →</a>
      </CardFooter>
    </Card>
  );
}
