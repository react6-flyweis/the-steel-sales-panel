import { useState } from "react";
import CommunicationSidebar from "@/components/communication/communication-sidebar";
import ChatArea from "@/components/communication/chat-area";
import DepartmentInfoSidebar from "@/components/communication/department-info-sidebar";

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface SelectedChat {
  id: string;
  name: string;
  avatar?: string;
  type: "department" | "contact";
  icon?: string;
  iconBgColor?: string;
  subtitle?: string;
}

export default function Communication() {
  const [activeTab, setActiveTab] = useState<"Departments" | "Direct">(
    "Departments"
  );
  const [showChat, setShowChat] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [selectedChat, setSelectedChat] = useState<SelectedChat | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);

  // Mock data - as shown in the image
  const user = {
    name: "Sarah Johnson",
    role: "Project Lead",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  };

  const departments = [
    {
      id: "dept-1",
      name: "Project Team",
      icon: "PT",
      iconBgColor: "bg-blue-500",
      unreadCount: 3,
    },
    {
      id: "dept-2",
      name: "Finance Team",
      icon: "FT",
      iconBgColor: "bg-green-500",
    },
    {
      id: "dept-3",
      name: "Construction Team",
      icon: "CT",
      iconBgColor: "bg-orange-500",
      unreadCount: 1,
    },
  ];

  const contacts = [
    {
      id: "contact-1",
      name: "Michael Chen",
      role: "Project Lead",
      avatar: "https://i.pravatar.cc/150?u=michael",
      isOnline: true,
    },
    {
      id: "contact-2",
      name: "Emily Davis",
      role: "Finance Manager",
      avatar: "https://i.pravatar.cc/150?u=emily",
      isOnline: false,
    },
    {
      id: "contact-3",
      name: "James Wilson",
      role: "Construction Lead",
      avatar: "https://i.pravatar.cc/150?u=james",
      isOnline: true,
    },
  ];

  // Mock members for department
  const departmentMembers = [
    {
      id: "1",
      name: "John Doe",
      role: "Marketing",
      avatar: "https://i.pravatar.cc/150?u=john",
      isAdmin: true,
    },
    {
      id: "2",
      name: "James Wilson",
      role: "Marketing",
      avatar: "https://i.pravatar.cc/150?u=james",
      isAdmin: false,
    },
  ];

  const handleItemSelect = (id: string, type: "department" | "contact") => {
    let selectedItem;
    if (type === "department") {
      selectedItem = departments.find((d) => d.id === id);
      if (selectedItem) {
        setSelectedChat({
          id: selectedItem.id,
          name: selectedItem.name,
          type: "department",
          icon: selectedItem.icon,
          iconBgColor: selectedItem.iconBgColor,
          subtitle: "2 members · Marketing",
        });
      }
    } else {
      selectedItem = contacts.find((c) => c.id === id);
      if (selectedItem) {
        setSelectedChat({
          id: selectedItem.id,
          name: selectedItem.name,
          avatar: selectedItem.avatar,
          type: "contact",
          subtitle: selectedItem.role,
        });
      }
    }

    // Load mock messages for the selected chat
    if (id === "contact-1") {
      setMessages([
        {
          id: "1",
          sender: "Michael Chen",
          text: "Hi, I need a quote for a 40*60 workshop in Texas.",
          time: "2024-10-10 09:30 pm",
          isMe: false,
        },
      ]);
    } else {
      setMessages([]);
    }

    setShowChat(true);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: user.name,
      text: messageInput,
      time: new Date().toLocaleString(),
      isMe: true,
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const handleNewChat = () => {
    // Handle new chat creation
    console.log("Create new chat");
  };

  const handleInfoClick = () => {
    setShowInfoSidebar(true);
  };

  const handleMute = () => {
    console.log("Mute notifications");
  };

  const handleAddMember = () => {
    console.log("Add member");
  };

  return (
    <div className="p-5 h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative h-full">
        <div className={showChat ? "hidden md:block md:w-64" : "block md:w-64"}>
          <CommunicationSidebar
            user={user}
            departments={departments}
            contacts={contacts}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedItemId={selectedChat?.id}
            onItemSelect={handleItemSelect}
            onNewChat={handleNewChat}
            showSidebar={!showChat}
          />
        </div>

        <div
          className={
            showChat
              ? "block absolute inset-0 md:relative md:flex-1 h-full w-full"
              : "hidden md:block md:flex-1 h-full w-full"
          }
        >
          <ChatArea
            selectedChat={selectedChat}
            messages={messages}
            messageInput={messageInput}
            onMessageInputChange={setMessageInput}
            onSendMessage={handleSendMessage}
            onBackClick={() => setShowChat(false)}
            onInfoClick={handleInfoClick}
          />
        </div>

        {/* Department Info Sidebar (render only when open; overlay instead of reserving space) */}
        {selectedChat?.type === "department" && showInfoSidebar && (
          <div className="absolute inset-y-0 right-0 w-full z-50 md:relative md:inset-auto md:block md:w-72">
            <DepartmentInfoSidebar
              isOpen={showInfoSidebar}
              onClose={() => setShowInfoSidebar(false)}
              department={{
                name: selectedChat.name,
                icon: selectedChat.icon || "PT",
                iconBgColor: selectedChat.iconBgColor || "bg-blue-500",
                description: "Marketing department discussions and campaigns",
                memberCount: 2,
                category: "Marketing",
              }}
              members={departmentMembers}
              onMute={handleMute}
              onAddMember={handleAddMember}
            />
          </div>
        )}
      </div>
    </div>
  );
}
