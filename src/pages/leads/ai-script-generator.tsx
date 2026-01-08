import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Menu, Sparkles, Mail, Phone, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AiScriptGeneratorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello John! I'd be happy to help you with that. Can you tell me more about the intended use and any specific requirements?",
      sender: "ai",
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "It will be used for automotive repair. I need overhead doors and good ventilation.",
      sender: "user",
      timestamp: new Date(),
    },
    {
      id: "3",
      text: "I just wanted to follow up regarding the quotation we shared for your warehouse project last week.\n\nHave you had a chance to go through the details?\n\nWe've customized the structure based on your initial design inputs — and I'd be happy to walk you through the material specifications or pricing options if you have any questions.\n\nAlso, our design team has a slot available this week if you'd like to discuss potential modifications before finalizing.\n\nWould you prefer a quick call tomorrow morning or later in the afternoon?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message. I'm processing your request...",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="bg-teal-400 text-white px-6 py-3 shadow-sm">
        <h1 className="text-lg font-medium">AI Follow-Up Script Generator</h1>
      </div>

      {/* Main Content */}
      <div className=" p-6">
        {/* Chat Header */}
        <Card className="bg-white shadow-sm mb-4 py-0">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-120 p-2 bg-white rounded-lg shadow-md">
                  <div className="space-y-2">
                    {[
                      {
                        id: "m1",
                        name: "Sarah Johnson",
                        type: "mail",
                        text: "Hi Sarah, Following up on our discussion about the implementation timeline...",
                        time: "1 hour ago",
                        tag: {
                          label: "professional",
                          color: "bg-blue-100 text-blue-700",
                        },
                      },
                      {
                        id: "m2",
                        name: "Michael Chen",
                        type: "phone",
                        text: "Hi Michael, I hope you had a chance to review the demo video...",
                        time: "3 hours ago",
                        tag: {
                          label: "friendly",
                          color: "bg-green-100 text-green-700",
                        },
                      },
                      {
                        id: "m3",
                        name: "Emily Davis",
                        type: "mail",
                        text: "Hi Emily, I wanted to reach out regarding the competitive analysis...",
                        time: "5 hours ago",
                        tag: {
                          label: "urgent",
                          color: "bg-red-100 text-red-700",
                        },
                      },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-lg p-3 bg-white"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex  gap-3">
                            <div className="flex  justify-center w-8 h-8 mt-1">
                              {item.type === "mail" ? (
                                <Mail className="w-4 h-4 text-gray-600" />
                              ) : (
                                <Phone className="w-4 h-4 text-gray-600" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </h4>
                                <span
                                  className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${item.tag.color}`}
                                >
                                  {item.tag.label}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 truncate max-w-100 whitespace-pre-wrap">
                                {item.text}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {item.time}
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 rounded hover:bg-gray-100">
                              <Copy className="w-4 h-4 text-gray-500" />
                            </button>
                            <button className="p-1 rounded hover:bg-gray-100">
                              <Send className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <h2 className="font-medium text-gray-900">
                AI Follow-Up Script Generator
              </h2>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
              <Sparkles className="h-4 w-4" />
              Use Script
            </Button>
          </div>

          {/* Messages Container */}
          <div className="p-6 space-y-4 min-h-[500px] max-h-[500px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "user" ? "justify-start" : "justify-end"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-3",
                    message.sender === "user"
                      ? "bg-gray-200 text-gray-900"
                      : "bg-blue-600 text-white"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="px-4 py-3 border-t bg-gray-50">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-white"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              >
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
