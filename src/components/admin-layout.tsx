import { Outlet } from "react-router";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { useState } from "react";

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col ml-0 lg:ml-70 overflow-auto">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 bg-[#E8EFF9] pb-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
