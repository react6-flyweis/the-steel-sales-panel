interface DepartmentItemProps {
  id: string;
  name: string;
  icon: string;
  iconBgColor: string;
  unreadCount?: number;
  isActive?: boolean;
  onClick: () => void;
}

export default function DepartmentItem({
  name,
  icon,
  iconBgColor,
  unreadCount,
  isActive = false,
  onClick,
}: DepartmentItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
        isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg ${iconBgColor} flex items-center justify-center text-white font-semibold text-sm`}
        >
          {icon}
        </div>
        <h4 className="text-sm font-medium text-gray-800">{name}</h4>
      </div>
      {unreadCount && unreadCount > 0 && (
        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
}
