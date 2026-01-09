import { useState } from "react";
import DepartmentItem from "./department-item";
import ContactItem from "./contact-item";

interface Department {
  id: string;
  name: string;
  icon: string;
  iconBgColor: string;
  unreadCount?: number;
}

interface Contact {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  isOnline?: boolean;
}

interface UserProfile {
  name: string;
  role: string;
  avatar: string;
}

interface CommunicationSidebarProps {
  user: UserProfile;
  departments: Department[];
  contacts: Contact[];
  activeTab: "Departments" | "Direct";
  onTabChange: (tab: "Departments" | "Direct") => void;
  selectedItemId?: string;
  onItemSelect: (id: string, type: "department" | "contact") => void;
  onNewChat: () => void;
  showSidebar?: boolean;
}

export default function CommunicationSidebar({
  user,
  departments,
  contacts,
  activeTab,
  onTabChange,
  selectedItemId,
  onItemSelect,
  onNewChat,
  showSidebar = true,
}: CommunicationSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`w-full border-r border-gray-200 flex-col bg-white ${
        showSidebar ? "flex" : "hidden md:flex"
      }`}
    >
      {/* User Profile */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{user.name}</h3>
          <p className="text-xs text-gray-500">{user.role}</p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 pb-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 mt-2">
        <button
          className={`flex-1 pb-3 text-sm font-medium ${
            activeTab === "Departments"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => onTabChange("Departments")}
        >
          Departments
        </button>
        <button
          className={`flex-1 pb-3 text-sm font-medium ${
            activeTab === "Direct"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => onTabChange("Direct")}
        >
          Direct
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "Departments" && (
          <div>
            {filteredDepartments.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-400">
                No departments found
              </div>
            ) : (
              filteredDepartments.map((dept) => (
                <DepartmentItem
                  key={dept.id}
                  {...dept}
                  isActive={selectedItemId === dept.id}
                  onClick={() => onItemSelect(dept.id, "department")}
                />
              ))
            )}
          </div>
        )}
        {activeTab === "Direct" && (
          <div>
            {filteredContacts.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-400">
                No contacts found
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  {...contact}
                  isActive={selectedItemId === contact.id}
                  onClick={() => onItemSelect(contact.id, "contact")}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          <span>+</span> New Chat
        </button>
      </div>

      {/* Team Online Status */}
      <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        Team Online
      </div>
    </div>
  );
}
