interface ContactItemProps {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  isActive?: boolean;
  isOnline?: boolean;
  lastMessage?: string;
  onClick: () => void;
}

export default function ContactItem({
  name,
  role,
  avatar,
  isActive = false,
  isOnline = false,
  onClick,
}: ContactItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-blue-50 transition-colors ${
        isActive ? "bg-blue-50 border-l-4 border-blue-600" : ""
      }`}
    >
      <div className="relative">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-800 truncate">{name}</h4>
        {role && <p className="text-xs text-gray-500 truncate">{role}</p>}
      </div>
    </div>
  );
}
