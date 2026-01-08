interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
}

export default function MessageInput({
  value,
  onChange,
  onSend,
  placeholder = "Type your message...",
}: MessageInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white border-t border-gray-100">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full pl-5 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
        </div>
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className="bg-[#2563EB] text-white px-4 md:px-6 py-3 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="hidden md:inline">Send</span>
        </button>
      </div>
      <div className="text-right mt-2 text-xs text-gray-400">
        Last sync: just now
      </div>
    </div>
  );
}
