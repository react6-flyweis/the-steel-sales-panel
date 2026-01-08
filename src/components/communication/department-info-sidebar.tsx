import { useState } from "react";

interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isAdmin?: boolean;
}

interface FileItem {
  id: string;
  name: string;
  uploadedBy: string;
  icon?: string;
  size?: string;
}

interface DepartmentInfoSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  department: {
    name: string;
    icon: string;
    iconBgColor: string;
    description: string;
    memberCount: number;
    category: string;
  };
  members: Member[];
  onMute: () => void;
  onAddMember: () => void;
  files?: FileItem[];
  onDownload?: (fileId: string) => void;
}

export default function DepartmentInfoSidebar({
  isOpen,
  onClose,
  department,
  members,
  onMute,
  onAddMember,
  files,
  onDownload,
}: DepartmentInfoSidebarProps) {
  const [activeTab, setActiveTab] = useState<"Members" | "Files">("Members");

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed md:relative right-0 top-0 h-full w-full md:w-96 bg-white border-l border-gray-200 z-50 flex flex-col shadow-xl md:shadow-none">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-16 h-16 rounded-xl ${department.iconBgColor} flex items-center justify-center text-white text-xl font-semibold`}
              >
                {department.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {department.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {department.memberCount} members · {department.category}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4">{department.description}</p>

          {/* Mute Button */}
          <button
            onClick={onMute}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            Mute
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "Members"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("Members")}
          >
            Members
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "Files"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("Files")}
          >
            Files
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "Members" && (
            <div className="p-4 space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {member.name}
                      </h4>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  {member.isAdmin && (
                    <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
              ))}

              {/* Add Member Button */}
              <button
                onClick={onAddMember}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-600 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
                Add member
              </button>
            </div>
          )}

          {activeTab === "Files" && (
            <div className="p-4 space-y-3">
              {files && files.length > 0 ? (
                files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        {file.icon ?? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12h6m2 0a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2h14z"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {file.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {file.uploadedBy}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onDownload?.(file.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 rounded-full"
                      aria-label={`Download ${file.name}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 10.5L12 15l4.5-4.5M12 15V3"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">No files shared yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
